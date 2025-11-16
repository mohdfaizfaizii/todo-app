import express from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todos';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/').get(getTodos).post(createTodo);

router.route('/:id').put(updateTodo).delete(deleteTodo);

export default router;
