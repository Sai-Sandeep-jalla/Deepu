import mongoose from 'mongoose';

const appreciationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    highlight: { type: String, default: '' },
    message: { type: String, required: true },
    icon: { type: String, default: 'Sparkles' },
    bgColor: { type: String, default: 'from-[#F6D9E4] to-[#FFF5E9]' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Appreciation || mongoose.model('Appreciation', appreciationSchema);
