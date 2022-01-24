import Bank from '../models/bank';
import Payment from '../models/payment';
import PaymentService from '../services/payment-service';

class PaymentController {
  static createPayment = async (req, res) => {
    try {
      const { type, banks } = req.body;

      await PaymentService.create({ type, banks });

      req.flash('alertMessage', 'Add data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  };

  static formCreatePayment = async (req, res) => {
    try {
      const banks = await PaymentService.getBanks();

      res.render('admin/payment/create', { banks });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  };

  static viewPayment = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const payment = await PaymentService.getPayment();

      res.render('admin/payment', { alert, payment });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/payment');
    }
  };

  static formUpdatePayment = async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await PaymentService.getPaymentById({ id });
      const banks = await Bank.find();

      res.render('admin/payment/edit', { payment, banks });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/payment');
    }
  };

  static updatePayment = async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await PaymentService.update({ id, type, banks });

      req.flash('alertMessage', 'Edit data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/payment');
    }
  };

  static updateStatusPayment = async (req, res) => {
    try {
      const { id } = req.params;

      let payment = await PaymentService.getPaymentById({ id });
      const status = payment.status === 'active' ? 'non active' : 'active';
      payment = await PaymentService.updateStatusPayment({ id, status });
      // payment = await Payment.findByIdAndUpdate({ _id: id }, { status });

      req.flash('alertMessage', 'Edit status successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/payment');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/payment');
    }
  };
}

export default PaymentController;
