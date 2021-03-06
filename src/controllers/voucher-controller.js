import path from 'path';
import fs from 'fs';
import Category from '../models/category';
import Nominal from '../models/nominal';
import Voucher from '../models/voucher';
import config from '../config';
import VoucherService from '../services/voucher-service';

class VoucherController {
  static viewVoucher = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const voucher = await VoucherService.getAllVoucher();

      res.render('admin/voucher', {
        voucher,
        alert,
        name: req.session.user.name,
        title: 'Voucher',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/voucher');
    }
  };

  static getAllData = async (req, res) => {
    try {
      const voucher = await VoucherService.getAllVoucher();

      res.status(200).json(voucher);
    } catch (err) {
      console.log(err);
    }
  };

  static getDataById = async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await VoucherService.getVoucherById({ id });

      res.status(200).json(voucher);
    } catch (err) {
      console.log(err);
    }
  };

  static formCreateVoucher = async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render('admin/voucher/create', {
        category,
        nominal,
        name: req.session.user.name,
        title: 'Voucher',
      });
    } catch (err) {
      console.log(err);
    }
  };

  static createVoucher = async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

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
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            await voucher.save();

            req.flash('alertMessage', 'Add data successfully');
            req.flash('alertStatus', 'success');

            res.redirect('/admin/voucher');
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });
        await voucher.save();

        req.flash('alertMessage', 'Add data successfully');
        req.flash('alertStatus', 'success');

        res.redirect('/admin/voucher');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/voucher');
    }
  };

  static formEditVoucher = async (req, res) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findOne({ _id: id });
      const category = await Category.find();
      const nominal = await Nominal.find();

      res.render('admin/voucher/edit', {
        voucher,
        category,
        nominal,
        name: req.session.user.name,
        title: 'Voucher',
      });
    } catch (err) {
      console.log(err);
    }
  };

  static updateVoucher = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

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
            const voucher = await VoucherService.getVoucherById({ id });
            const currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Voucher.findOneAndUpdate({
              _id: id,
            }, {
              name,
              category,
              nominals,
              thumbnail: filename,
            });

            req.flash('alertMessage', 'Edit data successfully');
            req.flash('alertStatus', 'success');

            res.redirect('/admin/voucher');
          } catch (err) {
            req.flash('alertMessage', `${err.message}`);
            req.flash('alertStatus', 'danger');

            res.redirect('/admin/voucher');
          }
        });
      } else {
        await Voucher.findByIdAndUpdate({
          _id: id,
        }, {
          name,
          category,
          nominals,
        });

        req.flash('alertMessage', 'Edit data successfully');
        req.flash('alertStatus', 'success');

        res.redirect('/admin/voucher');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/voucher');
    }
  };

  static deleteVoucher = async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await VoucherService.deleteVoucher({ id });

      const currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }

      req.flash('alertMessage', 'Delete data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/voucher');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/voucher');
    }
  };

  static updateStatusVoucher = async (req, res) => {
    try {
      const { id } = req.params;

      let voucher = await VoucherService.getVoucherById({ id });
      const status = voucher.status === 'active' ? 'non active' : 'active';

      voucher = await Voucher.findByIdAndUpdate({ _id: id }, { status });

      req.flash('alertMessage', 'Update status successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/voucher');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/voucher');
    }
  };
}

export default VoucherController;
