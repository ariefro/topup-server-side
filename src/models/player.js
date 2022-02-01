import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const hashRound = 10;

const playerSchema = Schema({
  email: {
    type: String,
    require: [true, 'email harus diisi'],
  },

  name: {
    type: String,
    require: [true, 'nama harus diisi'],
    maxlength: [225, 'panjang nama harus diantara 9-225 karakter'],
    minlength: [9, 'panjang nama harus diantara 9-225 karakter'],
  },

  username: {
    type: String,
    require: [true, 'username harus diisi'],
    maxlength: [225, 'panjang nama harus diantara 3-225 karakter'],
    minlength: [3, 'panjang nama harus diantara 3-225 karakter'],
  },

  password: {
    type: String,
    require: [true, 'kata sandi harus diisi'],
    maxlength: [225, 'panjang password maksimal 225 karakter'],
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',

  },
  status: {
    type: String,
    enum: ['active', 'non active'],
    default: 'active',
  },

  avatar: { type: String },

  fileName: { type: String },

  phoneNumber: {
    type: String,
    require: [true, 'nomor telpon harus diisi'],
    maxlength: [13, 'panjang nomor telpon harus antara 9 - 13 karakter'],
    minlength: [9, 'panjang nomor telpon harus antara 9 - 13 karakter'],
  },

  favorite: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}, { timestamps: true });

playerSchema.path('email').validate(async function validate(value) {
  const count = await this.model('Player').countDocuments({ email: value });
  return !count;
}, (attr) => `${attr.value} registered`);

playerSchema.pre('save', function hashPassword(next) {
  this.password = bcrypt.hashSync(this.password, hashRound);
  next();
});

const Player = model('Player', playerSchema);

export default Player;
