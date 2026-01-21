import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";

const createPost = async (req: Request, res: Response) =>{
try{
    const user = req.user;
   if(!user){
      return res.status(400).json({
        error: "unauthorized",
    })
   }
    const result = await postService.createPost(req.body, user.id as string)

    res.status(201).json(result)
} catch(error: any){
    res.status(400).json({
        error: "post creation faild",
        details: error
    })
}

}


const getALlPost =  async (req: Request, res: Response) =>{
try{
    const {search } = req.query;
    const searchString = typeof search === 'string' ? search : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    // true false
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === 'true' ? true : req.query.isFeatured === 'false' ? false : undefined : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

const result = await postService.getAllPost({search: searchString, tags, isFeatured, status, authorId});

res.status(200).json(result)
} 
catch(error: any){
     res.status(400).json({
        error: "post creation faild",
        details: error
    })
}
}

export const PostController = {
    createPost,
    getALlPost
}