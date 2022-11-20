const Packer = require("./src/Packer");
const packages = Packer.pack();
console.log(Packer.toResultString(packages))
