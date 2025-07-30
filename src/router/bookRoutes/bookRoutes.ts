import { createBook } from '../../controller/bookController/bookController';
import { Router } from "express";

const bookRoutes = Router();



bookRoutes.post("/create" , createBook)


export default bookRoutes