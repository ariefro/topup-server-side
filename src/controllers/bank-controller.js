import BankService from '../services/bank-service';

class BankController {
  static actionCreate = async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      await BankService.actionCreate({
        name, bankName, noRekening,
      });

      req.flash('alertMessage', 'Add data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/bank');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/bank');
    }
  };

  static formCreate = async (req, res) => {
    try {
      res.render('admin/bank/create', {
        name: req.session.user.name,
        title: 'Bank',
      });
    } catch (err) {
      console.log(err);
    }
  };

  static viewBank = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const bank = await BankService.getAll();

      res.render('admin/bank', {
        bank,
        alert,
        name: req.session.user.name,
        title: 'Bank',
      });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/bank');
    }
  };

  static actionUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, bankName, noRekening } = req.body;

      await BankService.actionUpdate({
        id,
        name,
        bankName,
        noRekening,
      });

      req.flash('alertMessage', 'Edit data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/bank');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/bank');
    }
  };

  static formUpdate = async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await BankService.getById({ id });

      res.render('admin/bank/edit', {
        bank,
        name: req.session.user.name,
        title: 'Bank',
      });
    } catch (err) {
      console.log(err);
    }
  };

  static actionDelete = async (req, res) => {
    try {
      const { id } = req.params;

      await BankService.actionDelete({ id });

      req.flash('alertMessage', 'Delete data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/bank');
    } catch (err) {
      console.log(err);
    }
  };
}

export default BankController;
