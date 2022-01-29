module.exports = {
  isLogin: (req, res, next) => {
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
  },
};
