const Package = require("./Package");

/**
 * This class is to implement `Decreasing BestFit BinPack` algorithm on items
 *
 * @class BestFitBinPack
 */
class BestFitBinPack {
  /**
   * Creates an instance of BestFitBinPack.
   * @param {Item[]} items
   * @param {number} limit
   * @memberof BestFitBinPack
   */
  constructor(items, limit) {
    this.packages = [];
    this.items = items;
    this.maxLimit = limit;
  }
  /**
   * function to pack the items based on the bestfit algorithm
   *
   * @returns {Package[]}
   * @memberof BestFitBinPack
   */
  pack() {
    this.items.forEach((item) => {
      // find the bin with the most space left in it.
      const bestFitPackage = this.getPackgeWithLeastSpaceLeft(item);
      if (bestFitPackage === null) {
        let newPackage = new Package(this.maxLimit);
        newPackage.addItem(item);
        this.packages.push(newPackage);
      } else {
        bestFitPackage.package.addItem(item);
      }
    });

    return this.packages;
  }

  /**
   * function returns `Package` with least sapce left or return `null` value if it couldn't find one with criteria
   *
   * @param {Item} newItem
   * @returns {{package:Package, index: number, remainingCapacity: number}|null}
   * @memberof BestFitBinPack
   */
  getPackgeWithLeastSpaceLeft(newItem) {
    let selectedPackage = null;
    for (let i = 0; i < this.packages.length; i++) {
      let packageItem = this.packages[i];
      let remainingCapacityOfPackage = packageItem.getRemainingCapacity();

      // package has room left && is this with minimal remianing capacity? if yes this the best package
      if (remainingCapacityOfPackage >= 0 && packageItem.willItemFit(newItem)) {
        if (selectedPackage === null) {
          selectedPackage = {
            package: packageItem,
            index: i,
            remainingCapacity: remainingCapacityOfPackage,
          };
        }
        // select package with less remaining capacity
        if (selectedPackage.remainingCapacity > remainingCapacityOfPackage) {
          selectedPackage = {
            package: packageItem,
            index: i,
            remainingCapacity: remainingCapacityOfPackage,
          };
        }

        // if 2 packages have same capacity remaining, then select package with `higher cost$$`
        if (selectedPackage.remainingCapacity === remainingCapacityOfPackage) {
          if (
            packageItem.getPackageCost() >
            selectedPackage.package.getPackageCost()
          ) {
            selectedPackage = {
              package: packageItem,
              index: i,
              remainingCapacity: remainingCapacityOfPackage,
            };
          }
        }
      }
    }

    return selectedPackage;
  }
}

module.exports = BestFitBinPack;
