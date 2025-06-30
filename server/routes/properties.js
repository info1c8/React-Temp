import express from 'express';
import Property from '../models/Property.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET /api/properties - получить все объекты недвижимости
router.get('/', async (req, res) => {
  try {
    const {
      type,
      propertyType,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      rooms,
      city,
      district,
      page = 1,
      limit = 12
    } = req.query;

    const filter = { status: 'active' };

    if (type) filter.type = type;
    if (propertyType) filter.propertyType = propertyType;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (minArea || maxArea) {
      filter.area = {};
      if (minArea) filter.area.$gte = Number(minArea);
      if (maxArea) filter.area.$lte = Number(maxArea);
    }
    if (rooms) filter.rooms = Number(rooms);
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (district) filter['address.district'] = new RegExp(district, 'i');

    const skip = (page - 1) * limit;
    
    const properties = await Property.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// GET /api/properties/:id - получить объект по ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Объект не найден' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

// POST /api/properties - создать новый объект
router.post('/', upload.array('images', 10), async (req, res) => {
  try {
    const propertyData = JSON.parse(req.body.data);
    
    if (req.files) {
      propertyData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const property = new Property(propertyData);
    await property.save();
    
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка создания объекта', error: error.message });
  }
});

// PUT /api/properties/:id - обновить объект
router.put('/:id', upload.array('images', 10), async (req, res) => {
  try {
    const propertyData = JSON.parse(req.body.data);
    
    if (req.files && req.files.length > 0) {
      propertyData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      propertyData,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({ message: 'Объект не найден' });
    }

    res.json(property);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка обновления объекта', error: error.message });
  }
});

// DELETE /api/properties/:id - удалить объект
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Объект не найден' });
    }
    res.json({ message: 'Объект успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления объекта', error: error.message });
  }
});

// GET /api/properties/featured - получить рекомендуемые объекты
router.get('/featured/list', async (req, res) => {
  try {
    const properties = await Property.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
});

export default router;