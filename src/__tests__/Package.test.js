const Package = require("../Package");
const Item = require("../models/Item");

describe("Package", () => {
  test("create package instance with maxLimit", () => {
    let pkg = new Package(50);
    let item1 = new Item(1, 10, "20");
    let item2 = new Item(2, 10, "20");
    let item3 = new Item(3, 10, "20");
    expect(pkg.maxLimit).toBe(50);
  });

  test("is able to add items", () => {
    let pkg = new Package(50);
    let item1 = new Item(1, 10, "20");
    let item2 = new Item(2, 20, "20");
    let item3 = new Item(3, 15, "20");
    let done1 = pkg.addItem(item1);
    let done2 = pkg.addItem(item2);
    let done3 = pkg.addItem(item3);
    expect(done1 && done2 && done3).toBe(true);
    expect(pkg.maxLimit).toBe(50);
    expect(pkg.items.length).toBe(3);
    expect(pkg.getPackageCost()).toBe(60);
    expect(pkg.getPackageWeight()).toBe(45);
    expect(pkg.getRemainingCapacity()).toBe(5);
    expect(pkg.getResultIndexes()).toBe("1,2,3");
  });

  test("will not add items exceed max limit", () => {
    let pkg = new Package(40);
    let item1 = new Item(1, 10, "20");
    let item2 = new Item(2, 20, "20");
    let item3 = new Item(3, 15, "20");
    let done1 = pkg.addItem(item1);
    let done2 = pkg.addItem(item2);
    let done3 = pkg.addItem(item3);
    expect(done1 && done2).toBe(true);
    expect(done3).toBe(false);
    expect(pkg.maxLimit).toBe(40);
    expect(pkg.items.length).toBe(2);
  });

  test("cannot not add items, if item weight greater than the max limit", () => {
    let pkg = new Package(40);
    let item = new Item(1, 45, "€20");
    let done = pkg.addItem(item);
    expect(done).toBe(false);
    expect(pkg.maxLimit).toBe(40);
    expect(pkg.items.length).toBe(0);
  });

  test("cannot add items, if items count exceed max limit", () => {
    let pkg = new Package(40);
    let item = new Item(1, 45, "€20");
    let done = pkg.addItem(item);
    expect(done).toBe(false);
    expect(pkg.maxLimit).toBe(40);
    expect(pkg.items.length).toBe(0);
  });

  test("test wether item will fit in package?  check for max-limit of weight, cost and number of items", () => {
    let pkg = new Package(200);
    expect(pkg.addItem(new Item(1, 101, "€20"))).toBe(false);
    expect(pkg.addItem(new Item(2, 10, "€200"))).toBe(false);
    expect(pkg.addItem(new Item(3, 10, "€100"))).toBe(true);
    pkg = new Package(200);
    for (let i = 0; i < 20; i++) {
      pkg.addItem(new Item(i + 1, (i + 1) , "€5"));
    }
    expect(pkg.items.length).toBe(15);
  });

  test(" is able to converted to string", () => {
    let pkg = new Package(200);
    pkg.addItem(new Item(1, 10, "€20"));
    expect(pkg.toString()).toBe(`
    
    package: { 
      maxLimit:200,  
      items: [ {"index":1,"weight":10,"cost":"€20"} ]
    }`);
  });
});
