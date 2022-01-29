import { Schema, model } from 'mongoose';

const paymentSchema = Schema({
  type: {
    type: String,
    require: [true, 'tipe pembayaran harus diisi'],
  },
  status: {
    type: String,
    enum: ['active', 'non active'],
    default: 'active',
  },
  banks: [{
    type: Schema.Types.ObjectId,
    ref: 'Bank',
  }],
}, { timestamps: true });

const Payment = model('Payment', paymentSchema);

export default Payment;
