import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  coinQuantity: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    required: [true, 'Nama koin harus diisi'],
  },
  price: {
    type: Number,
    default: 0,
  },
});

const Nominal = mongoose.model('Nominal', categorySchema);

export default Nominal;
