import bcrypt from 'bcrypt';
import User from '../models/user';

class UserController {
  static loginView = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user === null || req.session.user === undefined) {
        res.render('admin/user', { alert });
      } else {
        res.redirect('/dashboard');
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/admin/login');
    }
  };

  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email });

      if (check) {
        if (check.status === 'active') {
          const checkPassword = await bcrypt.compare(password, check.password);
          if (checkPassword) {
            req.session.user = {
              id: check._id,
              email: check.email,
              name: check.name,
              status: check.status,
            };
            res.redirect('/dashboard');
          } else {
            req.flash('alertMessage', 'Password yang anda inputkan salah');
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/login');
          }
        } else {
          req.flash('alertMessage', 'Mohon maaf status anda belum aktif');
          req.flash('alertStatus', 'danger');
          res.redirect('/admin/login');
        }
      } else {
        req.flash('alertMessage', 'Email yang anda inputkan salah');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/login');
      }
    } catch (err) {
      console.log(err);
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');

      res.redirect('/');
    }
  };
}

export default UserController;
