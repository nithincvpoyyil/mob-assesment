/**
 * Class implmenting API exception by extedning `Error` Class
 *
 * @class APIException
 * @extends {Error}
 */
class APIException extends Error {
  /**
   *Creates an instance of APIException.
   * @param {string} message
   * @param {Error} orginalError
   * @memberof APIException
   */
  constructor(message, orginalError) {
    super(message);
    this.name = "APIExceptionError";
    this.originalError = orginalError;
  }
}

module.exports = APIException;
