import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema(
  {
    trigger: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    emoji: { type: String, default: '🌸' },
    envelopeColor: { type: String, default: '#F6D9E4' },
    sealColor: { type: String, default: '#C7839D' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Letter || mongoose.model('Letter', letterSchema);
