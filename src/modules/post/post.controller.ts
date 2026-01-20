import { Request, Response } from "express";
import { Post } from "../../../generated/prisma/client";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) =>{
try{
    const result = await postService.createPost(req.body)

    res.status(201).json(result)
} catch(error: any){
    res.status(400).json({
        error: "post creation faild",
        details: error
    })
}

}

export const PostController = {
    createPost
}