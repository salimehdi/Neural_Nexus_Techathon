import express, { Router } from "express";
import { updateUser, checkUser } from "../controller/userController.js";

const router = Router();

router.put('/updateUser/:userId', updateUser);
router.post('/checkUser', checkUser);

// router
//     .route('/add-professional-details')
//     .post(verifyJWT,
//         upload.fields([
//             { name: 'dobProof', maxCount: 1 },
//             { name: 'addressProof', maxCount: 1 },
//             { name: 'qualificationProof', maxCount: 1 },
//             { name: 'certifications', maxCount: 10 }, // Multiple certifications
//         ]),
//         addProfessionalDetails
// );

export default router