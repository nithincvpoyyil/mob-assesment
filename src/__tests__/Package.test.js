const Package = require("../Package");
const Item = require("../models/Item");

describe("Package",()=>{

    test("create package instance with maxLimit",()=>{
        let pkg = new Package(50);
        let item1 = new Item(1,10,'20');
        let item2 = new Item(2,10,'20');
        let item3 = new Item(3,10,'20');
        expect(pkg.maxLimit).toBe(50); 

    })
});