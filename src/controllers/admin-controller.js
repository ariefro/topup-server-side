class AdminController {
  static dashboardView = (req, res) => {
    res.render('index', {
      name: req.session.user.name,
      title: 'Dashboard',
    });
  };
}

export default AdminController;
