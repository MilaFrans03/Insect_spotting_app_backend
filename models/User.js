import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
  insect_id: { type: String, ref: 'Insect', required: true },
  photo_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
  in_collection: { type: Boolean, default: false }, // nieuw veld
  date_found: { type: Date, default: null }         // nieuw veld
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  pictures: [pictureSchema],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
