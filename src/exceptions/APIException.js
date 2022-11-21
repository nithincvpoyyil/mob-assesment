/**
 * Class implmenting API exception by extedning `Error` Class
 *
 * @class APIException
 * @extends {Error}
 */
class APIException extends Error {
  constructor(message) {
    super(message);
    this.name = "APIExceptionError";
  }
}

module.exports = APIException;
