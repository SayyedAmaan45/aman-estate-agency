import express from "express"
import { validate } from "../middleware/validation.middleware.js";
import { createEnquirySchema } from "../utils/validations/enquiry.validation.js";
import { createEnquiry } from "../controllers/enquiry.controller.js";


const router=express.Router();


router.post("/enquiry",validate(createEnquirySchema,"body"),createEnquiry)


export default router;