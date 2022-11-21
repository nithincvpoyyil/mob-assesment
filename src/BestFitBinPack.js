const Package = require("./Package");

class BestFitBinPack {
  constructor(items, limit) {
    this.packages = [];
    this.items = items;
    this.maxLimit = limit;
  }

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

  getPackgeWithLeastSpaceLeft(newItem) {
    let selectedPackage = null;
    for (let i = 0; i < this.packages.length; i++) {
      let package1 = this.packages[i];
      let remainingCapacityOfPackage = package1.getRemainingCapacity();
      // package has room left && is this with minimal remianing capacity
      if (remainingCapacityOfPackage >= 0 && package1.willItemFit(newItem)) {
        if (selectedPackage === null) {
            selectedPackage = {
            package: package1,
            index: i,
            remainingCapacity: remainingCapacityOfPackage,
          };
        }
        // select package with less remaning capacity
        if (selectedPackage.remainingCapacity > remainingCapacityOfPackage) {
          selectedPackage = {
            package: package1,
            index: i,
            remainingCapacity: remainingCapacityOfPackage,
          };
        }

        // if 2 bins capacity are equal select package with higher cost
        if (selectedPackage.remainingCapacity === remainingCapacityOfPackage) {
          if (
            package1.getPackageCost() > selectedPackage.package.getPackageCost()
          ) {
            selectedPackage = {
              package: package1,
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
