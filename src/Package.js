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

  getPackageWeight() {
    return this.items.reduce((sum, item) => sum + item.weight, 0);
  }

  getPackageCost() {
    return this.items.reduce((sum, item) => sum + item.numericalCost, 0);
  }

  getRemainingCapacity() {
    return this.maxLimit - this.getPackageWeight();
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
    let items = [];
    this.items.forEach((item) => {
      items.push(item.toString());
    });

    let stringItem = `
    
    package: { 
      maxLimit:${this.maxLimit},  
      items: [ ${items.join(" ")} ]
    }`;
    return stringItem;
  }
}

module.exports = Package;
