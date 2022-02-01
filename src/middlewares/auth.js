import config from '../config';
import Player from '../models/player';
import ERRORS from '../config/errors';
import Jwt from '../utils/jwt';

class Auth {
  static isLoginAdmin = (req, res, next) => {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = { message: alertMessage, status: alertStatus };

    if (req.session.user === null || req.session.user === undefined) {
      req.flash('alertMessage', 'Mohon maaf session anda telah habis silahkan login kembali');
      req.flash('alertStatus', 'danger');
      res.render('admin/user', { alert });
    } else {
      next();
    }
  };

  static isLoginPlayer = async (req, res, next) => {
    try {
      const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
      const data = Jwt.verify(token, config.jwtSecret);
      const player = await Player.findOne({ _id: data._id });

      if (!player) {
        throw new Error(ERRORS.BAD_REQUEST);
      }

      req.player = player;
      req.token = token;
      next();
    } catch (err) {
      console.log(err);
    }
  };
}

export default Auth;
