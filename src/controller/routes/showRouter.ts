import express from "express"
import { ShowController } from "../ShowController"


export const showRouter = express.Router()

const showController = new ShowController()

showRouter.put("/create", showController.createShow)