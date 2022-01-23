import CategoryService from '../services/category-service';
import Category from '../models/category';

class CategoryController {
  static categoryView = async (req, res) => {
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();
      res.render('admin/category/index', { category, alert });
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  };

  static formCreateCategoryView = (req, res) => {
    res.render('admin/category/create');
  };

  static getCategories = async (req, res) => {
    try {
      const result = await CategoryService.getCategories();

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  };

  static createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      await CategoryService.createCategory({ name });

      req.flash('alertMessage', 'Success add new category');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  };

  static getCategoryById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await CategoryService.getCategoryById({ id });

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  };

  static formUpdateCategoryView = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById({ id });

      res.render('admin/category/edit', { category });
    } catch (err) {
      console.log(err);
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await CategoryService.updateCategory({ id, name });

      req.flash('alertMessage', 'Edit successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory({ id });

      req.flash('alertMessage', 'Delete successfully');
      req.flash('alertStatus', 'success');

      res.redirect('/admin/category');
    } catch (err) {
      req.flash('alertMessage', `${err.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/category');
    }
  };
}

export default CategoryController;
