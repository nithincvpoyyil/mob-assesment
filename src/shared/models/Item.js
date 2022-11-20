class Item {
  constructor(index, weight, cost) {
    this.index = index;
    this.weight = weight;
    this.cost = cost;
    let costNumerical = parseFloat(cost.replace("€", ""));
    this.numericalCost = isNaN(costNumerical) ? 0 : costNumerical;
  }

  toString() {
    return JSON.stringify({
      index: this.index,
      weight: this.weight,
      cost: this.cost,
    });
  }
}
module.exports = Item;
