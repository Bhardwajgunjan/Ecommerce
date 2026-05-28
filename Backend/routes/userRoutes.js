import express from 'express';
import {verifyToken,isAdmin} from '../middleware/authMiddleware.js';
import {createUser,getUsers,getById,getByPhone,deleteUser,updateUser,loginUser} from '../controller/userController.js';
import { getProfile, updateProfile } from '../controller/profileController.js';
//import {verifyToken,isAdmin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/createUser', createUser);

router.post('/login',loginUser);

router.get('/getUsers',verifyToken,getUsers);

router.get('/getUserById/:id',verifyToken,getById);

router.get('/getUserByPhoneemail',verifyToken,getByPhone);

router.put('/updateUser/:id',verifyToken,updateUser);

router.delete('/deleteUser/:id',verifyToken,isAdmin,deleteUser);

router.get('/profile/:id', getProfile)

router.put('/updateprofile/:id', updateProfile)

export default router;