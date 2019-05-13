const express = require("express");
const router = express.Router();
const Itinerary = require("../../models/Itinerary");
const auth = require("../../middleware/auth");

// GET /api/itineraries/:cityId
router.get("/:cityId", (req, res) => {
  Itinerary.find({ cityName: req.params.cityId }, (err, data) => {
    if (err) res.send(err);
    res.send(data);
  });
});

// POST /api/itineraries/:cityId
router.post("/:cityId", (req, res) => {
  const newItinerary = new Itinerary({
    title: req.body.title,
    user: req.body.user,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    hashtag: req.body.hashtag,
    cityName: req.body.cityName
  });
  newItinerary.save().then(itinerary => res.send(itinerary));
});

// UPDATE /api/itineraries/:itineraryId
router.put("/:itineraryId", auth, (req, res) => {
  const updatedItinerary = {
    title: req.body.title,
    user: req.body.user,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    hashtag: req.body.hashtag,
    cityName: req.body.cityName
  };
  Itinerary.findOneAndUpdate({ _id: req.params.itineraryId }, updatedItinerary)
    .then(itinerary => res.json({ success: true }))
    .catch(() => res.status(404).json({ success: false }));
});

// DELETE /api/itineraries/:itineraryId
router.delete("/:itineraryId", auth, (req, res) => {
  Itinerary.deleteOne({ _id: req.params.itineraryId })
    .then(itinerary => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
