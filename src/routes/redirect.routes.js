import { Router } from "express";
import { code } from "../controllers/redirect.controller.js";

const router = Router();

router.get("/:code", code);

export default router;