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
      case ERRORS.EMAIL_NOT_EXIST: return {
        code: 400,
        message: 'Email is not exist',
      };
      case ERRORS.WRONG_PASSWORD: return {
        code: 400,
        message: 'Wrong password',
      };
      case ERRORS.VOUCHER_NOT_AVAIBLE: return {
        code: 400,
        message: 'Voucher is not avaible',
      };
      case ERRORS.NOMINAL_NOT_AVAIBLE: return {
        code: 400,
        message: 'Nominal is not avaible',
      };
      case ERRORS.PAYMENT_NOT_AVAIBLE: return {
        code: 400,
        message: 'Payment is not avaible',
      };
      case ERRORS.BANK_NOT_AVAIBLE: return {
        code: 400,
        message: 'Bank is not avaible',
      };
      case ERRORS.TRANSACTION_NOT_FOUND: return {
        code: 400,
        message: 'Transaction is not found',
      };
      default: return {
        code: 500,
        message: 'Internal server error',
      };
    }
  };
}

export default BaseController;
