import Nominal from '../models/nominal';
import ERRORS from '../config/errors';

class NominalService {
  static createNominal = async ({ coinName, coinQuantity, price }) => {
    if (!coinName || !coinQuantity || !price) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    const nominal = await Nominal.create({
      coinName,
      coinQuantity,
      price,
    });

    return nominal;
  };

  static getAllNominal = async () => {
    const nominal = await Nominal.find();

    if (!nominal) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return nominal;
  };

  static updateNominal = async ({
    id, coinName, coinQuantity, price,
  }) => {
    const nominal = Nominal.findOneAndUpdate({
      _id: id,
    }, { coinName, coinQuantity, price });

    return nominal;
  };

  static getById = async ({ id }) => {
    const nominal = await Nominal.findOne({ _id: id });
    if (!nominal) {
      throw new Error(ERRORS.NOT_FOUND);
    }

    return nominal;
  };

  static deleteNominal = async ({ id }) => {
    const nominal = await Nominal.findOneAndRemove({ _id: id });

    return nominal;
  };
}

export default NominalService;
