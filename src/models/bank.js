import { Schema, model } from 'mongoose';

const bankSchema = Schema({
  name: {
    type: String,
    require: [true, 'Nama pemilik harus diisi'],
  },
  bankName: {
    type: String,
    require: [true, 'Nama bank harus diisi'],
  },
  noRekening: {
    type: String,
    require: [true, 'Nomor rekening harus diisi'],
  },
});

const Bank = model('Bank', bankSchema);

export default Bank;
