import ERRORS from '../config/errors';
import Bank from '../models/bank';
import Category from '../models/category';
import Nominal from '../models/nominal';
import Payment from '../models/payment';
import Player from '../models/player';
import Transaction from '../models/transaction';
import Voucher from '../models/voucher';

class PlayerService {
  static getVouchers = async () => {
    const players = await Voucher.find().populate('category').select('_id name status category thumbnail');

    if (!players) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return players;
  };

  static detailPage = async ({ id }) => {
    const voucher = await Voucher.findOne({ _id: id })
      .populate('category')
      .populate('nominals')
      .populate('user', '_id name phoneNumber');

    if (!voucher) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return voucher;
  };

  static getCategories = async () => {
    const category = await Category.find();

    if (!category) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return category;
  };

  static getPlayerByEmail = async ({ email }) => {
    const player = await Player.findOne({ email });

    if (!player) {
      throw new Error(ERRORS.EMAIL_NOT_EXIST);
    }
    return player;
  };

  static getVoucherById = async ({ voucher }) => {
    const getVoucher = await Voucher.findOne({ _id: voucher })
      .populate('category')
      .populate('user')
      .select('name category _id thumbnail user');

    return getVoucher;
  };

  static getNominalById = async ({ nominal }) => {
    const getNominal = await Nominal.findOne({ _id: nominal });

    return getNominal;
  };

  static getPaymentById = async ({ payment }) => {
    const getPayment = await Payment.findOne({ _id: payment });

    return getPayment;
  };

  static getBankById = async ({ bank }) => {
    const getBank = await Bank.findOne({ _id: bank });

    return getBank;
  };

  static getTransaction = async () => {
    const transaction = await Transaction.find();

    return transaction;
  };
}

export default PlayerService;
