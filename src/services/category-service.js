import Category from '../models/category';
import ERRORS from '../config/errors';

class CategoryService {
  static getCategories = async () => {
    const categories = await Category.find();

    return categories;
  };

  static createCategory = async ({ name }) => {
    if (!name) {
      throw new Error(ERRORS.INCOMPLETE_INPUT);
    }

    const category = await Category.create({
      name,
    });

    return category;
  };

  static getCategoryById = async ({ id }) => {
    const category = await Category.findOne({ _id: id });

    if (!category) throw new Error(ERRORS.NOT_FOUND);

    return category;
  };

  static updateCategory = async ({ id, name }) => {
    const category = Category.findOneAndUpdate({
      _id: id,
    }, { name });

    if (!category) throw new Error(ERRORS.NOT_FOUND);

    return category;
  };

  static deleteCategory = async ({ id }) => {
    const category = Category.findByIdAndDelete({ _id: id });

    if (!category) throw new Error(ERRORS.NOT_FOUND);

    return category;
  };
}

export default CategoryService;
