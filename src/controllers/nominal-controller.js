import ERRORS from '../config/errors';
import NominalService from '../services/nominal-service';

class NominalController {
  static getAllData = async (req, res) => {
    const result = await NominalService.getAllNominal();
    if (!result) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    res.status(200).json(result);
  };

  static createNominal = async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      await NominalService.createNominal({ coinName, coinQuantity, price });

      res.redirect('/admin/nominal');
    } catch (err) {
      console.log(err);
    }
  };

  static formCreateNominalView = (req, res) => {
    res.render('admin/nominal/create');
  };

  static GetAllNominal = async (req, res) => {
    try {
      const nominal = await NominalService.getAllNominal();

      res.render('admin/nominal', { nominal });
    } catch (err) {
      console.log(err);
    }
  };

  static updateNominal = async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await NominalService.updateNominal({
        id, coinName, coinQuantity, price,
      });

      res.redirect('/admin/nominal');
    } catch (err) {
      console.log(err);
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

      res.redirect('/admin/nominal');
    } catch (err) {
      console.log(err);
    }
  };
}

export default NominalController;
