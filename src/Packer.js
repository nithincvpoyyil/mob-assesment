const fs = require("fs");
const { open } = fs.promises;
const BestFitBinPack = require("./BestFitBinPack");
const Item = require("./models/Item");
const APIException = require("./exceptions/APIException");
const ErrorMessages = require("./exceptions/ErrorMessages");
/**
 * Driver class for exporting packing functionality. This class manages parsing and validation
 * of input file and items for the packages.
 *
 * @class Packer
 */
class Packer {
  /**
   * Function to parse input file line and get max limit and items array object
   *
   * @static
   * @param {string} line input file line string corresponds to each line of input file
   * @returns {{maxLimit:number,items:Item[]}}
   * @memberof Packer
   */
  static getItemsFromInput(line) {
    const lineStringList = line.split(":");
    const maxLimitString = (lineStringList[0] || "").trim();
    const itemsString = (lineStringList[1] || "").trim();
    let maxLimit = parseFloat(maxLimitString);

    maxLimit = isNaN(maxLimit) ? 0 : maxLimit;

    // parsing item string and cob=nverting to `Item` instance
    const items = itemsString
      .trim("")
      .replaceAll("\n", "")
      .split(" ")
      .filter((i) => !!i)
      .map((i) => i.replaceAll(/[()]/g, ""))
      .map((item) => item.split(","))
      .map((item) => new Item(+item[0], +item[1], item[2])) // convert to item instances
      .filter((item) => item.weight <= maxLimit) // filter input values, if value greater than given limit
      .sort((a, b) => b.weight - a.weight); // sort in descending order for Best fit decreasing - bin pack algorithm

    return { maxLimit, items };
  }

  /**
   * Function to execute bin-pack algorithm on items based on max limit
   *
   * @static
   * @param {Item[]} items
   * @param {number} maxLimit
   * @returns {Package[]}
   * @memberof Packer
   */
  static bestFit(items, maxLimit) {
    let bestfitPackage = new BestFitBinPack(items, maxLimit);
    let packages = bestfitPackage.pack();
    return packages;
  }
  /**
   * Driver function to read input, create/select best package and write output file
   *
   * @static
   * @param {string} inputFilePath
   * @param {string} outputFilePath
   * @returns {Promise<Package[]>}
   * @throws {APIException}
   * @memberof Packer
   */
  static async pack(inputFilePath, outputFilePath) {
    let inputFile = null;
    const results = [];
    try {
      inputFile = await open(inputFilePath);
    } catch (error) {
      throw new APIException(ErrorMessages.INPUT_FILE_ERR, error);
    }

    try {
      for await (const line of inputFile.readLines()) {
        const { items, maxLimit } = Packer.getItemsFromInput(line);
        const packages = Packer.bestFit(items, maxLimit);
        const selectedPackage = Packer.getBestFromPackages(packages);
        results.push(selectedPackage);
      }
    } catch (error) {
      throw new APIException(ErrorMessages.UNKNOWN, error);
    }
    const resultArray = Packer.toResultArray(results);

    try {
      let promise = await new Promise((res, rej) => {
        const outputFileWS = fs.createWriteStream(outputFilePath);
        outputFileWS.once("open", () => {
          resultArray.forEach((result) => {
            outputFileWS.write(result);
            outputFileWS.write("\r\n");
          });
          outputFileWS.end();
          res(true);
        });
        outputFileWS.once("error", (err) => {
          rej(err);
        });
      });
      return results;
    } catch (error) {
      throw new APIException(ErrorMessages.OUTPUT_FILE_ERR, error);
    }
  }

  /**
   * Function to get max-valued package from bin-packed packages.
   * This is based on criteria based on package cost and weight limit. If there is apackage with same cost,
   * the less weighed package will get choosed
   *
   * @static
   * @param {Package[]} packages
   * @returns {Package}
   * @memberof Packer
   */
  static getBestFromPackages(packages) {
    const bestPackageMap = {};

    for (let i = 0; i < packages.length; i++) {
      const packagedItem = packages[i];
      const key = packagedItem.getPackageCost();

      const packagedItemWithCost = bestPackageMap[key];
      if (!packagedItemWithCost) {
        bestPackageMap[key] = packagedItem;
      } else if (
        packagedItemWithCost &&
        packagedItem.getPackageWeight() <
          packagedItemWithCost.getPackageWeight()
      ) {
        bestPackageMap[key] = packagedItem;
      }
    }

    let maxValue = Object.keys(bestPackageMap).sort((a, b) => b - a)[0];
    let selectedPackage = bestPackageMap[maxValue];
    return selectedPackage;
  }
  /**
   * Print Function for packages
   *
   * @static
   * @param {Package[]} packages
   * @memberof Packer
   */
  static printPackages(packages) {
    packages.map((packageItem) => {
      console.log(packageItem);
    });
  }

  /**
   * Convert list package to result array for saving to output file
   *
   * @static
   * @param {Package[]} packages
   * @returns {Array<string>}
   * @memberof Packer
   */
  static toResultArray(packages) {
    let resultArray = [];
    packages.map((packageItem) => {
      if (packageItem) {
        resultArray.push(packageItem.getResultIndexes());
      } else {
        resultArray.push("-");
      }
    });
    return resultArray;
  }
}

module.exports = Packer;
