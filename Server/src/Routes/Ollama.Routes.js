import { Router } from "express";
import { getCoverLetter } from "../Controllers/Ollama.Controllers.js";


const OllamaRouter = Router();


OllamaRouter.post("/cover-letter",getCoverLetter);

export default OllamaRouter;