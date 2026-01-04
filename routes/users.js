import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// -------------------------------
// GET: Retrieve all users
// -------------------------------

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});

// -------------------------------
// POST: Retrieve a user ID by email (login)
// -------------------------------
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // normally, passwords should be hashed!

  if (!email) {
    return res.status(400).json({ message: 'Email body parameter is required' });
  }

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ id: user._id.toString() });
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
});

// -------------------------------
// GET: Retrieve one user by ID
// -------------------------------
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err.message });
  }
});

// -------------------------------
// POST: Add a new user
// -------------------------------
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ user: 'User added successfully!', userData: newUser });
  } catch (error) {
    res.status(500).json({ user: 'Error adding user', error: error.message });
  }
});

// -------------------------------
// PUT: Update an existing user
// -------------------------------
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user) {
      res.json({ user: 'User updated successfully!', userData: user });
    } else {
      res.status(404).json({ user: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ user: 'Error updating user', error: error.message });
  }
});

// -------------------------------
// DELETE: Remove a user by ID
// -------------------------------
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ user: 'User deleted successfully!' });
    } else {
      res.status(404).json({ user: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ user: 'Error deleting user', error: error.message });
  }
});

// -------------------------------
// PICTURES FUNCTIONALITY
// -------------------------------

// POST /users/:id/pictures -> voeg nieuwe afbeelding toe
router.post('/:id/pictures', async (req, res) => {
  try {
    const { insect_id, photo_url, in_collection, date_found } = req.body;
    if (!insect_id || !photo_url) {
      return res.status(400).json({ message: 'insect_id en photo_url zijn verplicht' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newPicture = {
      insect_id,
      photo_url,
      in_collection: in_collection ?? true,
      date_found: date_found ? new Date(date_found) : new Date(),
    };

    user.pictures.push(newPicture);
    await user.save();

    res.status(201).json(newPicture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /users/:id/pictures -> haal alle pictures van user
router.get('/:id/pictures', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.pictures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /users/:id/pictures/:pictureId -> verwijder een picture uit user
router.delete('/:id/pictures/:pictureId', async (req, res) => {
    try {
      const { id, pictureId } = req.params;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // picture verwijderen
      const picIndex = user.pictures.findIndex(pic => pic._id.toString() === pictureId);
      if (picIndex === -1) return res.status(404).json({ message: 'Picture not found' });
  
      const deletedPic = user.pictures.splice(picIndex, 1);
      await user.save();
  
      res.json({ message: 'Picture deleted', deletedPic: deletedPic[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

export default router;
