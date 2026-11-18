import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    recipientName: { type: String, default: 'Deepuuu' },
    siteTitle: { type: String, default: 'Dear Deepuuu ♡' },
    heroEyebrow: { type: String, default: 'A LITTLE WORLD MADE JUST FOR YOU' },
    heroTitle: { type: String, default: 'Dear Deepuuu ♡' },
    heroSubtitle: { type: String, default: 'A garden full of memories, smiles and little secrets.' },
    heroDescription: { type: String, default: 'Because some people make life bloom a little brighter.' },
    heroButtonText: { type: String, default: 'Explore your little world' },
    heroNote: { type: String, default: 'A tiny surprise, made with a little extra care.' },
    finalLetter: { type: String, default: '' },
    musicUrl: { type: String, default: '' },
    themeSettings: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', siteSettingsSchema);
