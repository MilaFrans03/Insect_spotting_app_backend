import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/** CREATE — nieuwe gebruiker aanmaken */
router.post('/', async (req, res) => {
try {
const user = new User(req.body);
await user.save();
res.status(201).json(user);
} catch (err) {
console.error(err);
res.status(400).json({ error: err.message });
}
});

/** READ ALL — alle gebruikers ophalen */
router.get('/', async (req, res) => {
try {
const users = await User.find();
res.status(200).json(users);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});

/** READ ONE — specifieke gebruiker ophalen */
router.get('/:id', async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ error: 'User not found' });
res.status(200).json(user);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});

/** UPDATE — gebruiker wijzigen */
router.put('/:id', async (req, res) => {
try {
const updated = await User.findByIdAndUpdate(
req.params.id,
{ $set: req.body },
{ new: true, runValidators: true, context: 'query' }
);
if (!updated) return res.status(404).json({ error: 'User not found' });
res.status(200).json(updated);
} catch (err) {
console.error(err);
res.status(400).json({ error: err.message });
}
});

/** DELETE — gebruiker verwijderen */
router.delete('/:id', async (req, res) => {
try {
const deleted = await User.findByIdAndDelete(req.params.id);
if (!deleted) return res.status(404).json({ error: 'User not found' });
res.status(200).json({ message: 'User removed', id: deleted._id });
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});

/** ADD PICTURE — foto toevoegen aan pictures array */
router.post('/:id/pictures', async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ error: 'User not found' });

```
user.pictures.push(req.body); // body: { insect_id, photo_url, in_collection, date_found }
await user.save();

res.status(201).json(user);
```

} catch (err) {
console.error(err);
res.status(400).json({ error: err.message });
}
});

/** REMOVE PICTURE — foto verwijderen uit pictures array */
router.delete('/:id/pictures/:picId', async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ error: 'User not found' });

```
user.pictures.id(req.params.picId)?.remove();
await user.save();

res.status(200).json(user);
```

} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
});

export default router;
