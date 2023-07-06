import express from 'express';
import NodeController from "../controllers/node.controller";

const router = express.Router();

router.get('/get',
    NodeController.get);

router.put('/update/:id',
    NodeController.update);

router.post('/create',
    NodeController.create);

router.delete('/delete/:id',
    NodeController.delete);

export default router;