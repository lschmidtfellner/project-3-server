import express from 'express'
import salePostController from '../controllers/listings.js'



const router = express.Router();

// Sale post routes
router.post('/saleposts', salePostController.createSalePost);
router.get('/saleposts/:id', salePostController.getSalePostById);
router.get('/saleposts', salePostController.getAllSalePosts);
router.put('/saleposts/:id', salePostController.updateSalePost);
router.delete('/saleposts/:id', salePostController.deleteSalePost);

export default router 
