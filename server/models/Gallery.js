import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    caption: { type: String, required: true },
    category: { type: String, default: 'Golden Moments' },
    rotation: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model('Gallery', gallerySchema);
