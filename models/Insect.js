import mongoose from 'mongoose';

const insectSchema = new mongoose.Schema({
  _id: { type: String, required: true },             // e.g. "002"
  name: { type: String, required: true },            // e.g. "Field Bumblebee"
  description: { type: String },                     // e.g. "The Field Bumblebee is a common bumblebee species..."
  rarity: { type: String, enum: ['common', 'uncommon', 'rare'], default: 'common' }, // e.g. "common"
  season: { type: String, default: 'all year' },     // e.g. "spring/summer"
  default_photo_url: { type: String, default: null },// optional
});

// Check if model already exists to avoid OverwriteModelError
const Insect = mongoose.models.Insect || mongoose.model('Insect', insectSchema);
export default Insect;
