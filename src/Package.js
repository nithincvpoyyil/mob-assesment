const Item = require("./models/Item");

const MAX_WEIGHT_LIMIT_OF_ITEM = process.env.MAX_WEIGHT_LIMIT_OF_ITEM || 100;
const MAX_COST_LIMIT_OF_ITEM = process.env.MAX_COST_LIMIT_OF_ITEM || 100;
const MAXIMUM_ITEMS = process.env.MAXIMUM_ITEMS || 15;

/**
 * Package class represents Package item
 *
 * @class Package
 */
class Package {
  /**
   * Creates an instance of Package.
   * @param {number} maxLimit
   * @memberof Package
   */
  constructor(maxLimit) {
    this.maxLimit = maxLimit;
    this.items = [];
  }
  /**
   * Add item to a package based on conditions
   *
   * @param {Item} item
   * @returns {boolean}
   * @memberof Package
   */
  addItem(item) {
    if (item instanceof Item && this.willItemFit(item)) {
      this.items.push(item);
      return true;
    }
    return false;
  }
  /**
   * get total weight of the package
   *
   * @returns {number}
   * @memberof Package
   */
  getPackageWeight() {
    return this.items.reduce((sum, item) => sum + item.weight, 0);
  }

  /**
   * get total cost of the package
   *
   * @returns {number}
   * @memberof Package
   */
  getPackageCost() {
    return this.items.reduce((sum, item) => sum + item.numericalCost, 0);
  }

  /**
   * Get remaining capacity of the package
   *
   * @returns {number}
   * @memberof Package
   */
  getRemainingCapacity() {
    return this.maxLimit - this.getPackageWeight();
  }
  /**
   * get ordered indices of the package items as string
   *
   * @returns {string}
   * @memberof Package
   */
  getResultIndexes() {
    return this.items
      .sort((a, b) => a.index - b.index)
      .map((i) => i.index)
      .join(",");
  }
  /**
   * function to check whather the item will fit in to package
   *
   * @param {Item} item
   * @returns {boolean}
   * @memberof Package
   */
  willItemFit(item) {
    const remainingCapacity = this.getRemainingCapacity();
    if (
      item.weight <= remainingCapacity &&
      item.weight <= MAX_WEIGHT_LIMIT_OF_ITEM &&
      item.numericalCost <= MAX_COST_LIMIT_OF_ITEM &&
      this.items.length < MAXIMUM_ITEMS
    ) {

      
      return true;
    }
    return false;
  }
  /**
   * Function to convert object to string
   *
   * @returns
   * @memberof Package
   */
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
