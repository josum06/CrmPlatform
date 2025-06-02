import Segment from '../models/Segment.js';
import Customer from '../models/Customer.js';
import { buildFilter } from '../services/queryBuild.js';

const previewSegment = async (req, res) => {
  try {
    const filter = buildFilter(req.body);
    const count = await Customer.countDocuments(filter);
    const sample = await Customer.find(filter).limit(10);
    res.json({ count, sample });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createSegment = async (req, res) => {
  try {
    const { name, ruleGroup } = req.body;
    const segment = await Segment.create({ name, ruleGroup });
    res.status(201).json(segment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const listSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort({ createdAt: -1 });
    res.json(segments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { previewSegment, createSegment, listSegments };
