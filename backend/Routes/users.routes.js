import express from "express";
import projectRoutes from "../middlewares/projectRoutes.js";
import { getUsersForSidebar } from "../controllers/users.controllers.js";

const router = express.Router();

router.get("/",projectRoutes,getUsersForSidebar)

export default router