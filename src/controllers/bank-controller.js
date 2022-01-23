import BankService from '../services/bank-service';

class BankController {
  static actionCreate = async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;
      await BankService.actionCreate({
        name, nameBank, noRekening,
      });

      res.redirect('/admin/bank');
    } catch (err) {
      console.log(err);
    }
  };

  static formCreate = async (req, res) => {
    try {
      res.render('admin/bank/create');
    } catch (err) {
      console.log(err);
    }
  };

  static viewBank = async (req, res) => {
    try {
      res.render('admin/bank');
    } catch (err) {
      console.log(err);
    }
  };
}

export default BankController;
