import express from 'express';
import {TrailerLocation} from '../../models/TrailerLocation.js'; // Import TrailerLocation model

const trailerLocationRouter = express.Router();

// GET route handler
trailerLocationRouter.get('/trailer-location/:trailerId', async (req, res) => {
  try {
      const { trailerId } = req.params;
      // Find the trailer location by trailerId instead of _id
      const trailerLocation = await TrailerLocation.findOne({ trailerId: trailerId });
      res.json(trailerLocation);
  } catch (error) {
      console.error('Error fetching trailer location:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// POST route handler
trailerLocationRouter.post('/trailer-location', async (req, res) => { 
  try {
    // const categoryDoc = await Category.create({ name });
    // return NextResponse.json(categoryDoc);
    const { truckId, trailerId, latitude, longitude, status, gps } = req.body;
    const trailerLocation = await TrailerLocation.create({truckId, trailerId, latitude, longitude, status, gps});
    // await trailerLocation.save();
    res.json(trailerLocation);
  } catch (error) {
    console.error('Error adding trailer location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT route handler
// PUT route handler to update trailer location based on trailer ID
trailerLocationRouter.put('/trailer-location/:trailerId', async (req, res) => {
  try {
    const { trailerId } = req.params;
    const { truckId, latitude, longitude, status, gps } = req.body;

    // Find and update the trailer location by trailerId
    const updatedTrailerLocation = await TrailerLocation.findOneAndUpdate(
      { trailerId },
      { truckId, latitude, longitude, status, gps },
      { new: true }
    );

    if (!updatedTrailerLocation) {
      return res.status(404).json({ message: 'Trailer location not found' });
    }

    // Send the updated trailer location in the response
    res.json(updatedTrailerLocation);
  } catch (error) {
    console.error('Error updating trailer location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE route handler
trailerLocationRouter.delete('/trailer-location/:trailerId', async (req, res) => {
  try {
    const { trailerId } = req.params;

    // Find and delete the trailer location by trailerId
    const deletedTrailerLocation = await TrailerLocation.findOneAndDelete({ trailerId });

    if (!deletedTrailerLocation) {
      return res.status(404).json({ message: 'Trailer location not found' });
    }

    // Send a success message in the response
    res.json({ message: 'Trailer location deleted successfully' });
  } catch (error) {
    console.error('Error deleting trailer location:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default trailerLocationRouter;

