import { Schema, model } from 'mongoose';

const voucherSchema = Schema({
  name: {
    type: String,
    require: [true, 'Nama game harus diisi'],
  },
  status: {
    type: String,
    enum: ['active', 'non active'],
    default: 'active',
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  nominal: [{
    type: Schema.Types.ObjectId,
    ref: 'Nominal',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Voucher = model('Voucher', voucherSchema);

export default Voucher;
