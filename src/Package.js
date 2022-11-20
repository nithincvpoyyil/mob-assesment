const Item = require("./shared/models/Item");
class Package {
  constructor(maxLimit) {
    this.maxLimit = maxLimit;
    this.items = [];
  }

  addItem(item) {
    if (item instanceof Item && this.willItemFit(item)) {
      this.items.push(item);
    }
  }

  getPackageCapacity() {
    return this.items.reduce((sum, item) => sum + item.weight, 0);
  }

  getPackageCost() {
    return this.items.reduce((sum, item) => sum + item.numericalCost, 0);
  }

  getRemainingCapacity() {
    return this.maxLimit - this.getPackageCapacity();
  }

  willItemFit(item) {
    const remainingCapacity = this.getRemainingCapacity();
    if (item.weight <= remainingCapacity) {
      return true;
    }
    return false;
  }

  get size() {
    return this.items.length;
  }

  toString() {
    console.group("Package");
    console.log("MaxLimit:", this.maxLimit);
    this.items.forEach((item) => {
      console.log(item.toString());
    });
    console.groupEnd("Package");
  }
}

module.exports = Package;
