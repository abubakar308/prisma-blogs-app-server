import express, { Router } from "express";
import { PostController } from "./post.controller";
import auth, { userRole } from "../../middleware/auth";

const router = express.Router();


router.get("/", PostController.getALlPost);

router.get("/:id", PostController.getPostById)

router.post(
    "/", auth(userRole.USER), PostController.createPost
)

export const postRouter: Router = router;