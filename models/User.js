import mongoose from 'mongoose';

const pictureSchema = new mongoose.Schema({
  insect_id: { type: String, required: true }, 
  photo_url: { type: String, required: true },
  uploaded_at: { type: Date, default: Date.now },
  in_collection: { type: Boolean, default: false }, // nieuw veld
  date_found: { type: Date, default: null }         // nieuw veld
});

const userSchema = new mongoose.Schema({

  username:  { type: String, required: true },
  name:      { type: String, required: true },
  email:     { type: String, required: true },
  password:  { type: String, required: true }, // normally, passwords should be hashed!
  createdAt: { type: Date, default: Date.now },
  pictures: [pictureSchema],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
