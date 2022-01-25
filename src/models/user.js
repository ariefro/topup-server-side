import { Schema, model } from 'mongoose';

const userSchema = Schema({
  email: {
    type: String,
    require: [true, 'email harus diisi'],
  },
  password: {
    type: String,
    require: [true, 'password harus diisi'],
  },
  nama: {
    type: String,
    require: [true, 'nama harus diisi'],
  },
  phoneNumber: {
    type: String,
    require: [true, 'nomor telepon harus diisi'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin',
  },
  status: {
    type: String,
    enum: ['active', 'non active'],
    default: 'active',
  },
});

const User = model('User', userSchema);

export default User;
