import express, { Router } from "express";
import { CommentController } from "./comment.controller";
import auth, { userRole } from "../../middleware/auth";


const router = express.Router();

router.get(
    "/author/:authorId",
    CommentController.getCommentsByAuthor
)

router.get(
    "/:commentId",
    CommentController.getCommentsByAuthor
)

router.delete("/:commentId", auth(userRole.USER, userRole.ADMIN), CommentController.deleteComment)

router.post("/", auth(userRole.USER, userRole.ADMIN), CommentController.createComment);

router.patch(
    "/:commentId",
    auth(userRole.USER, userRole.ADMIN),
    CommentController.updateComment
)

router.patch(
    "/:commentId/moderate",
    auth(userRole.ADMIN),
    CommentController.moderateComment
)


export const commentRouter: Router = router;