import { Router } from "express";
import { urlShortener } from "../controllers/url.controller.js";

const router = Router();

router.post("/shorten", urlShortener);

export default router;