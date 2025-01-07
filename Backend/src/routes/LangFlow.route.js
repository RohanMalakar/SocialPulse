import express from "express";
import runLangflow from "../controllers/LangFlow.controller.js";

const langflowRoutes = express.Router();



langflowRoutes.post("/run-flow", runLangflow);

export default langflowRoutes;