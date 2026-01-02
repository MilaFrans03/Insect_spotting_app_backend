import express from 'express';

import Insect from '../models/Insect.js'; // pas pad aan naar waar jouw model staat


const router = express.Router();

/** CREATE — nieuw insect toevoegen */
router.post('/', async (req, res) => {
  try {
    const insect = await Insect.create(req.body);
    res.status(201).json(insect);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/** READ ALL — alle insecten ophalen */
router.get('/', async (req, res) => {
  try {
    const insects = await Insect.find();
    res.status(200).json(insects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** READ ONE — specifiek insect ophalen */
router.get('/:id', async (req, res) => {
  try {
    const insect = await Insect.findById(req.params.id);
    if (!insect) return res.status(404).json({ error: 'Insect not found' });

    res.status(200).json(insect);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** UPDATE — insect wijzigen */
router.put('/:id', async (req, res) => {
  try {
    const updated = await Insect.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) return res.status(404).json({ error: 'Insect not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/** DELETE — insect verwijderen */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Insect.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: 'Insect not found' });

    res.status(200).json({ message: 'Insect removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
