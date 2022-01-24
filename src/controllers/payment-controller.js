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

      res.render('admin/payment', { alert });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/payment');
    }
  };
}

export default PaymentController;
