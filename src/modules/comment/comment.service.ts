import { prisma } from "../../lib/prisma"

const createComment = async (payload: {
    content: string,
    authorId: string,
    postId: string,
    parrentId?: string
}) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    });

    if (payload.parrentId) {
        await prisma.comment.findFirstOrThrow({
            where: {
                id: payload.parrentId
            }
        })
    }
    return await prisma.comment.create({
        data: payload
    })
};

const getCommentById = async (id: string) => {
    return await prisma.comment.findUnique({
        where: {
            id
        },
        include: {
            post: {
                select: {
                    id: true,
                    title: true,
                    views: true
                }
            }
        }
    })
}

const getCommentsByAuthor = async (authorId: string) => {
    return await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: { createdAt: "desc" },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
}


// 1. nijar comment delete korta parbe
// login thakte hobe
// tar nijar comment kina ata check korta hobe
const deleteComment = async (commentId: string, authorId: string) => {

    console.log(commentId, authorId);
    const commentData = await prisma.comment.findFirst({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    if (!commentData) {
        throw new Error("Your provided input is invalid!")
    }

    return await prisma.comment.delete({
        where: {
            id: commentData.id
        }
    })
}



export const CommentService = {
    createComment,
    getCommentById,
    getCommentsByAuthor,
    deleteComment
}