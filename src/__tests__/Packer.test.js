const Packer = require("../Packer");
const ErrorMessages = require("../exceptions/ErrorMessages");
const APIException = require("../exceptions/APIException");
const Item = require("../models/Item");

describe("Packer", () => {
  test("it throws error for invalid input file", async () => {
    expect(async () => {
      let a = await Packer.pack("", "./test.txt");
      return a;
    }).rejects.toThrow(ErrorMessages.INPUT_FILE_ERR);
  });

  test("it throws error invalid output file path", () => {
    expect(() =>
      Packer.pack(`${process.cwd()}/resources/example_input`, "K:/drive/test.txt")
    ).rejects.toThrow(ErrorMessages.OUTPUT_FILE_ERR);
  });

  test("it process input file and creates output file", async () => {
    await expect(
      Packer.pack(
        `${process.cwd()}/resources/example_input`,
        `${process.cwd()}/resources/output_new.txt`
      )
    ).toResolve();
  });

  test("it process items and create packages with bestfit", async () => {
    const item0 = new Item(0, 5, "€3");
    const item1 = new Item(1, 4, "€30");
    const item2 = new Item(2, 5, "€20");
    const item3 = new Item(3, 4, "€10");
    const packages = Packer.bestFit([item0, item1, item2, item3], 9);
    expect(packages.length).toBe(2);
  });

  test("it process string and returns items", async () => {
    const result = Packer.getItemsFromInput(
      `81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)`
    );
    expect(result.maxLimit).toBe(81);
    expect(result.items.length).toBe(5); // yes, its 5; second item is higher than maximum limit
  });
});
