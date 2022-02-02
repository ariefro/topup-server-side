import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from '../utils/jwt';
import Player from '../models/player';
import PlayerService from '../services/player-service';
import BaseController from './base-controller';
import config from '../config';
import ERRORS from '../config/errors';
import Transaction from '../models/transaction';

class PlayerController extends BaseController {
  static landingPage = async (req, res) => {
    try {
      const voucher = await PlayerService.getVouchers();

      return res.status(200).json(voucher);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static detailPage = async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await PlayerService.detailPage({ id });

      return res.status(200).json(voucher);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static register = async (req, res, next) => {
    try {
      const payload = req.body;

      if (req.file) {
        const tmpPath = req.file.path;
        const originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        const filename = `${req.file.filename}.${originalExt}`;
        const targetPath = path.resolve(config.rootPath, `public/uploads/${filename}`);

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);

        src.on('end', async () => {
          try {
            const player = new Player({ ...payload, avatar: filename });
            await player.save();
            delete player._doc.password;

            return res.status(201).json({ data: player });
          } catch (err) {
            if (err && err.name === 'ValidationError') {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors,
              });
            }
            return next(err);
          }
        });
      } else {
        const player = new Player(payload);
        await player.save();
        delete player._doc.password;

        return res.status(201).json(payload);
      }
    } catch (err) {
      if (err && err.name === 'ValidationError') {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors,
        });
      }

      return next(err);
    }
  };

  static getCategories = async (req, res) => {
    try {
      const category = await PlayerService.getCategories();

      return res.status(200).json(category);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const player = await PlayerService.getPlayerByEmail({ email });

      if (!player) {
        throw new Error(ERRORS.EMAIL_NOT_EXIST);
      }

      if (!bcrypt.compareSync(password, player.password)) {
        throw new Error(ERRORS.WRONG_PASSWORD);
      }

      const token = jwt.sign({ _id: player._id });

      return res.status(200).json({ data: player, token });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static checkout = async (req, res) => {
    try {
      const {
        accountUser,
        name, nominal,
        voucher,
        payment,
        bank,
      } = req.body;

      const resVoucher = await PlayerService.getVoucherById({ voucher });
      if (!resVoucher) {
        throw new Error(ERRORS.VOUCHER_NOT_AVAIBLE);
      }

      const resNominal = await PlayerService.getNominalById({ nominal });
      if (!resNominal) {
        throw new Error(ERRORS.NOMINAL_NOT_AVAIBLE);
      }

      const resPayment = await PlayerService.getPaymentById({ payment });
      if (!resPayment) {
        throw new Error(ERRORS.PAYMENT_NOT_AVAIBLE);
      }

      const resBank = await PlayerService.getBankById({ bank });
      if (!resBank) {
        throw new Error(ERRORS.BANK_NOT_AVAIBLE);
      }

      const tax = (10 / 100) * resNominal._doc.price;
      const value = resNominal._doc.price - tax;

      const payload = {
        historyVoucherTopup: {
          gameName: resVoucher._doc.name,
          category: resVoucher._doc.category ? resVoucher._doc.category.name : '',
          thumbnail: resVoucher._doc.thumbnail,
          coinName: resNominal._doc.coinName,
          coinQuantity: resNominal._doc.coinQuantity,
          price: resNominal._doc.price,
        },
        historyPayment: {
          name: resBank._doc.name,
          type: resPayment._doc.type,
          bankName: resBank._doc.bankName,
          noRekening: resBank._doc.noRekening,
        },

        name,
        accountUser,
        tax,
        value,
        player: req.player._id,
        historyUser: {
          name: resVoucher._doc.user?.name,
          phoneNumber: resVoucher._doc.user?.phoneNumber,
        },

        user: resVoucher._doc.user?._id,
        category: resVoucher._doc.category?._id,
      };

      const transaction = new Transaction(payload);

      await transaction.save();

      return res.status(200).json(transaction);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static history = async (req, res) => {
    try {
      const { status = '' } = req.query;

      let criteria = {};

      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: 'i' },
        };
      }

      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,
        };
      }

      const history = await PlayerService.getTransaction(criteria);

      const total = await Transaction.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
            value: { $sum: '$value' },
          },
        },
      ]);

      return res.status(200).json({ data: history, total: total.length ? total[0].value : 0 });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static historyDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const history = await PlayerService.getTransactionById({ id });

      if (!history) {
        throw new Error(ERRORS.TRANSACTION_NOT_FOUND);
      }

      return res.status(200).json(history);
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const count = await Transaction.aggregate([
        { $match: { player: req.player._id } },
        {
          $group: {
            _id: '$category',
            value: { $sum: '$value' },
          },
        },
      ]);

      const category = await PlayerService.getCategories();

      category.forEach((element) => {
        count.forEach((item) => {
          if (item._id.toString() === element._id.toString()) {
            item.name = element.name;
          }
        });
      });

      const history = await Transaction.find({ player: req.player._id })
        .populate('category')
        .sort({ updatedAt: 'desc' });

      return res.status(200).json({ data: history, count });
    } catch (err) {
      const error = this.getError(err);

      return res.status(error.code).json(error.message);
    }
  };
}

export default PlayerController;
