import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'commercial', 'land'],
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  },
  floor: {
    type: Number
  },
  totalFloors: {
    type: Number
  },
  address: {
    street: String,
    city: String,
    district: String,
    metro: String
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  features: [{
    type: String
  }],
  images: [{
    type: String
  }],
  contact: {
    name: String,
    phone: String,
    email: String
  },
  status: {
    type: String,
    enum: ['active', 'sold', 'rented', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Property', propertySchema);