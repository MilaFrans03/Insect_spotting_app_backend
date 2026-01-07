import mongoose from 'mongoose';

const insectSchema = new mongoose.Schema({
  _id: { type: String, required: true },             // e.g. "02"
  name: { type: String, required: true },            // e.g. "Field Bumblebee"
  description: { type: String },
  features: { type: String },                      // e.g. "The Field Bumblebee is a common bumblebee species..."
  rarity: { type: String, enum: ['common', 'uncommon', 'rare'], default: 'common' }, // e.g. "common"
  season: { type: String, default: 'all year' },     // e.g. "spring/summer"
});

//

// Check if model already exists to avoid OverwriteModelError
const Insect = mongoose.models.Insect || mongoose.model('Insect', insectSchema);
export default Insect;
