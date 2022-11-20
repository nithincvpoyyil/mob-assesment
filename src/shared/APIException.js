class APIException extends Error {
  constructor(message) {
    super(message);
    this.name = "APIExceptionError";
  }
}

module.export = APIException;
