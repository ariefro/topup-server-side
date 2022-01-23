import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama harus diisi'],
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
