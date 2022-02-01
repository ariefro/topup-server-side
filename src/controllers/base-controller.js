import ERRORS from '../config/errors';

class BaseController {
  static getError = (err) => {
    switch (err.message) {
      case ERRORS.INCOMPLETE_INPUT: return {
        code: 400,
        message: 'Incomplete input',
      };
      case ERRORS.NOT_FOUND: return {
        code: 404,
        message: 'Not found',
      };
      case ERRORS.BAD_REQUEST: return {
        code: 400,
        message: 'Bad request',
      };
      case ERRORS.EMAIL_OR_PASSWORD_DOESNT_MATCH: return {
        code: 400,
        message: 'Email or Password does not match',
      };
      case ERRORS.VALIDATION_ERROR: return {
        code: 422,
        message: 'Validation error',
      };
      default: return {
        code: 500,
        message: 'Internal server error',
      };
    }
  };
}

export default BaseController;
