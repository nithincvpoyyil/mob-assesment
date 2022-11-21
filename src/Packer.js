const fs = require("fs");
const { open } = fs.promises;
const BestFitBinPack = require("./BestFitBinPack");
const Item = require("./models/Item");
const APIException = require("./exceptions/APIException");

class Packer {
  static parseInputFile() {
    const newItems = [
      `81: (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)`,
      `8: (1,15.3,€34)`,
      `75: (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)`,
      `56: (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)`,
    ];
    const key = 81;
    const lineItem = newItems[key];
    const maxLimit = key;
    const items = lineItem
      .trim("")
      .replaceAll("\n", "")
      .split(" ")
      .filter((i) => !!i)
      .map((i) => i.replaceAll(/[()]/g, ""))
      .map((item) => {
        return item.split(",");
      })
      .map((item) => {
        return new Item(+item[0], +item[1], item[2]);
      })
      .filter((item) => item.weight <= maxLimit) // filter input values
      .sort((a, b) => b.weight - a.weight); // decreasing algorithm

    return { items, maxLimit };
  }

  static getItemsFromInput(line) {
    const lineStringList = line.split(":");
    const maxLimitString = (lineStringList[0] || "").trim();
    const itemsString = (lineStringList[1] || "").trim();
    let maxLimit = parseFloat(maxLimitString);

    maxLimit = isNaN(maxLimit) ? 0 : maxLimit;

    const items = itemsString
      .trim("")
      .replaceAll("\n", "")
      .split(" ")
      .filter((i) => !!i)
      .map((i) => i.replaceAll(/[()]/g, ""))
      .map((item) => {
        return item.split(",");
      })
      .map((item) => {
        return new Item(+item[0], +item[1], item[2]);
      })
      .filter((item) => item.weight <= maxLimit) // filter input values
      .sort((a, b) => b.weight - a.weight); // decreasing algorithm

    return { maxLimit, items };
  }

  static bestFit(items, maxLimit) {
    let bestfitPackage = new BestFitBinPack(items, maxLimit);
    let packages = bestfitPackage.pack();
    return packages;
  }

  static async pack(inputFilePath, outputFilePath) {
    let inputFile = null;
    const results = [];
    try {
      inputFile = await open(inputFilePath);
    } catch (error) {
      throw new APIException("input file path invalid");
    }

    for await (const line of inputFile.readLines()) {
      const { items, maxLimit } = Packer.getItemsFromInput(line);
      const packages = Packer.bestFit(items, maxLimit);
      const selectedPackage = Packer.getBestFromPackages(packages);
      results.push(selectedPackage);
    }
    const resultArray = Packer.toResultArray(results);
    try {
      const outputFileWS = fs.createWriteStream(outputFilePath);
      outputFileWS.once("open", () => {
        resultArray.forEach((result) => {
          outputFileWS.write(result);
          outputFileWS.write("\r\n");
        });
        outputFileWS.end();
      });
    } catch (err) {
      throw new APIException("unable to create output file");
    }
    return results;
  }

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

  static printPackages(packages) {
    packages.map((packageItem) => {
      console.log(packageItem);
    });
  }

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
