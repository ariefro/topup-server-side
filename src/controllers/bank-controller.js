import BankService from '../services/bank-service';

class BankController {
  static actionCreate = async (req, res) => {
    try {
      const { name, bankName, noRekening } = req.body;
      await BankService.actionCreate({
        name, bankName, noRekening,
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
      const bank = await BankService.getAll();

      res.render('admin/bank', { bank });
    } catch (err) {
      console.log(err);
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

      res.redirect('/admin/bank');
    } catch (err) {
      console.log(err);
    }
  };

  static formUpdate = async (req, res) => {
    try {
      const { id } = req.params;

      const bank = await BankService.getById({ id });

      res.render('admin/bank/edit', { bank });
    } catch (err) {
      console.log(err);
    }
  };
}

export default BankController;
