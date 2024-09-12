const express = require('express');
const Membership = require('../models/Membership');
const router = express.Router();

// Get all memberships
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching memberships' });
  }
});

// Add a new membership
router.post('/', async (req, res) => {
  const { type, price, duration, description } = req.body;

  try {
    const newMembership = new Membership({ type, price, duration, description });
    await newMembership.save();
    res.status(201).json(newMembership);
  } catch (err) {
    res.status(500).json({ message: 'Error adding membership' });
  }
});

// Edit an existing membership
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, price, duration, description } = req.body;

  try {
    const updatedMembership = await Membership.findByIdAndUpdate(
      id,
      { type, price, duration, description },
      { new: true }
    );
    res.json(updatedMembership);
  } catch (err) {
    res.status(500).json({ message: 'Error updating membership' });
  }
});

// Delete a membership
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Membership.findByIdAndDelete(id);
    res.json({ message: 'Membership deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting membership' });
  }
});

module.exports = router;
