import express, { Router } from "express";
import createUser from "../controller/userController.js";
const router = Router();

router.post('/createUser', createUser );

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