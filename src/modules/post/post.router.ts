import express, { Router } from "express";
import { PostController } from "./post.controller";
import auth, { userRole } from "../../middleware/auth";

const router = express.Router();


router.get("/", PostController.getALlPost);

router.get(
    "/stats",
    auth(userRole.ADMIN),
    PostController.getStats
)

router.get(
    "/my-posts",
    auth(userRole.USER, userRole.ADMIN),
    PostController.getMyPosts
)


router.get("/:postId", PostController.getPostById)

router.post(
    "/", auth(userRole.USER, userRole.ADMIN), PostController.createPost
)

router.patch(
    "/:postId",
    auth(userRole.USER, userRole.ADMIN),
    PostController.updatePost
)

router.delete(
    "/:postId",
    auth(userRole.USER, userRole.ADMIN),
    PostController.deletePost
)

export const postRouter: Router = router;