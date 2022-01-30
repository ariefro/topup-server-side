import { Schema, model } from 'mongoose';

const transactionSchema = Schema({
  historyVoucherTopup: {
    gameName: { type: String, require: [true, 'nama game harus diisi'] },
    category: { type: String, require: [true, 'kategori game harus diisi'] },
    thumbnail: { type: String },
    coinName: { type: String, require: [true, 'nama koin harus diisi'] },
    coinQuantity: { type: String, require: [true, 'jumlah koin harus diisi'] },
    price: { type: Number },
  },

  historyPayment: {
    name: { type: String, require: [true, 'nama harus diisi'] },
    type: { type: String, require: [true, 'tipe pembayaran harus diisi'] },
    bankName: { type: String, require: [true, 'nama bank harus diisi'] },
    noRekening: { type: String, require: [true, 'nomor rekening harus diisi'] },
  },

  name: {
    type: String,
    require: [true, 'nama harus diisi'],
    maxlength: [225, 'panjang nama harus diantara 9-225 karakter'],
    minlength: [9, 'panjang nama harus diantara 9-225 karakter'],
  },

  accountUser: {
    type: String,
    require: [true, 'nama akun harus diisi'],
    maxlength: [225, 'panjang nama harus diantara 9-225 karakter'],
    minlength: [9, 'panjang nama harus diantara 9-225 karakter'],
  },

  tax: {
    type: Number,
    default: 0,
  },

  value: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'faiiled'],
    default: 'pending',
  },

  player: {
    type: Schema.Types.ObjectId,
    ref: 'player',
  },

  historyUser: {
    name: { type: String, require: [true, 'nama player harus diisi'] },
    phoneNumber: {
      type: Number,
      require: [true, 'nomor telepon harus diisi'],
      maxlength: [225, 'panjang nama harus diantara 9-225 karakter'],
      minlength: [9, 'panjang nama harus diantara 9-225 karakter'],
    },
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },

  User: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
