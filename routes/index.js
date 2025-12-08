import express from 'express';
import Insect from '../models/Insect.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Haal alles op
    const insects = await Insect.find();
    const users = await User.find();

    // Map insecten per _id voor snelle lookup
    
    const insectMap = {};
    insects.forEach(insect => {
      insectMap[insect._id] = insect;
    });

    // Voeg per user de insect info toe aan elke picture
    const usersWithInsectInfo = users.map(user => {
      return {
        _id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        pictures: user.pictures.map(pic => ({
          photo_url: pic.photo_url,
          uploaded_at: pic.uploaded_at,
          insect: insectMap[pic.insect_id] || null
        }))
      };
    });

    // Stuur een mooi overzicht terug
    res.json({
      users: usersWithInsectInfo,
      insects
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er ging iets mis' });
  }
});

export default router;
