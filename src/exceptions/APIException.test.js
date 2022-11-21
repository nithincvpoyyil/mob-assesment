const APIException = require("./APIException");
const ErrorMessages = require("./ErrorMessages");

const testThrowingError = () => {
  throw new APIException(ErrorMessages.UNKNOWN, new Error());
};

describe("APIException", () => {
  test("error function should Throw APIException Error", async () => {
    expect(() => testThrowingError()).toThrowError();
  });
});
