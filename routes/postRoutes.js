
import express from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

//Definindo rotas e associando ao método controlador
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;
