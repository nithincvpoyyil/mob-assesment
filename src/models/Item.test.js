const Item = require("./Item");


describe("Item", () => {
  test("able to create the item instace", async () => {
    let item = new Item(1, 10, "$10");
    expect(item.cost).toBe(`$10`);
    expect(item.weight).toBe(10);
    expect(item.index).toBe(1);
  });
  test("able to convert the item to string", async () => {
    let item = new Item(1, 10, "$10");
    expect(item.toString()).toBe('{"index":1,"weight":10,"cost":"$10"}');
  });
});
