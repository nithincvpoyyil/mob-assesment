const BestFitBinPack = require("../BestFitBinPack");
const BestBinPack = require("../BestFitBinPack");
const Item = require("../models/Item");

describe("BestFitBinPack", () => {
  test("instance is created", () => {
    const item0 = new Item(1, 4, "€3");
    const item1 = new Item(1, 11, "€30");
    const item2 = new Item(2, 15, "€20");
    const item3 = new Item(3, 10, "€10");
    const bestfit = new BestFitBinPack([item0, item1, item2, item3], 20);
    bestfit.pack();
    expect(bestfit.packages.length).not.toBe(0);
  });

  test("check betfit algorithm properly creates minimal number of packages for items", () => {
    const item0 = new Item(0, 5, "€3");
    const item1 = new Item(1, 4, "€30");
    const item2 = new Item(2, 5, "€20");
    const item3 = new Item(3, 4, "€10");

    expect(
      new BestFitBinPack([item0, item1, item2, item3], 9).pack().length
    ).toBe(2);

    expect(
      new BestFitBinPack([item0, item1, item2, item3], 10).pack().length
    ).toBe(2);

    expect(
      new BestFitBinPack([item0, item1, item2, item3], 15).pack().length
    ).toBe(2);

    expect(
      new BestFitBinPack([item0, item1, item2, item3], 25).pack().length
    ).toBe(1);
  });
});
