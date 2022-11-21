const Packer = require("./index");

Packer.pack("./resources/example_input", "./resources/output.txt").then((packages) => {
  console.log(Packer.toResultArray(packages));
});
