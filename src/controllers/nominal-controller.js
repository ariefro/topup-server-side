import NominalService from '../services/nominal-service';

class NominalController {
  static createNominal = async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      await NominalService.createNominal({ coinName, coinQuantity, price });

      req.flash('alertMessage', 'Add data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/nominal');
    }
  };

  static formCreateNominalView = (req, res) => {
    res.render('admin/nominal/create');
  };

  static GetAllNominal = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const nominal = await NominalService.getAllNominal();

      res.render('admin/nominal', { nominal, alert });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/nominal');
    }
  };

  static updateNominal = async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      await NominalService.updateNominal({
        id, coinName, coinQuantity, price,
      });

      req.flash('alertMessage', 'Edit data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/nominal');
    }
  };

  static formUpdateNominal = async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await NominalService.getById({ id });

      res.render('admin/nominal/edit', { nominal });
    } catch (err) {
      console.log(err);
    }
  };

  static deleteNominal = async (req, res) => {
    try {
      const { id } = req.params;
      await NominalService.deleteNominal({ id });

      req.flash('alertMessage', 'Delete data successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/nominal');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/nominal');
    }
  };
}

export default NominalController;
