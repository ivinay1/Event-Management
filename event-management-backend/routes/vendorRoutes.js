const express = require('express');
const Vendor = require('../models/Vendor');
const router = express.Router();

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vendors' });
  }
});

// Add a new vendor
router.post('/', async (req, res) => {
  const { name, email, phone, category, address } = req.body;

  try {
    const newVendor = new Vendor({ name, email, phone, category, address });
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(500).json({ message: 'Error adding vendor' });
  }
});

// Edit an existing vendor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, category, address } = req.body;

  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { name, email, phone, category, address },
      { new: true }
    );
    res.json(updatedVendor);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vendor' });
  }
});

// Delete a vendor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Vendor.findByIdAndDelete(id);
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vendor' });
  }
});

module.exports = router;
