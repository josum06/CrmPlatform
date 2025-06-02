import express from 'express';
const router = express.Router();
import {previewSegment, createSegment, listSegments} from '../controllers/segmentController.js';

router.post('/preview', previewSegment);
router.post('/', createSegment);
router.get('/', listSegments);

export default router;
