const Event = require("../models/event.model");
const Category = require("../models/category.model");
const { successResponse, errorResponse } = require("../utils/formatResponse");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description = "",
      category,
      date,
      time,
      location,
      price = 0,
      image = "",
      totalSeats,
      availableSeats,
      isFree = false,
      status,
    } = req.body;

    if (!title || !description || !category || !date || !time || !location || totalSeats === undefined || totalSeats === "") {
      return errorResponse(res, "Missing required fields", 400);
    }

    const categoryDoc = await Category.findOne({ _id: category, isActive: true });
    if (!categoryDoc) {
      return errorResponse(res, "Category not found", 404);
    }

    const computedAvailableSeats = availableSeats === undefined || availableSeats === "" ? Number(totalSeats) : Number(availableSeats);

    const event = await Event.create({
      title: title.trim(),
      description,
      category: categoryDoc._id,
      date: new Date(date),
      time,
      location: location.trim(),
      price: Number(price) || 0,
      image,
      totalSeats: Number(totalSeats),
      availableSeats: Math.max(0, computedAvailableSeats),
      organizer: req.user._id,
      status: status || "upcoming",
      isFree: Boolean(isFree),
    });

    const savedEvent = await Event.findById(event._id)
      .populate("category", "name")
      .populate("organizer", "name email");
    return successResponse(res, "Event created successfully", savedEvent, 201);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const baseFilter = {
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    };
    const filter = { ...baseFilter };

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const events = await Event.find(filter)
      .populate("category", "name")
      .populate("organizer", "name email")
      .sort({ createdAt: -1 });

    return successResponse(res, "Events fetched", events, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    })
      .populate("category", "name")
      .populate("organizer", "name email");
    if (!event) {
      return errorResponse(res, "Event not found", 404);
    }
    return successResponse(res, "Event fetched", event, 200);
  } catch (error) {
    return errorResponse(res, error.message || "Internal server error", 500);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};
