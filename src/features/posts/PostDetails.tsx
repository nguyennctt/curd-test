import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { postDeleted, selectPostById, updateViewCount } from "./postsSlice";
import { useEffect, useRef } from "react";

export const PostDetails = () => {
    const { postId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const postView = useRef(false);

    useEffect(() => {
        if (!postView.current && postId) {
            dispatch(updateViewCount({ id: postId }));
            postView.current = false;
        }
        return () => { postView.current = true; };
    }, [postView, postId, dispatch]);

    const post = useAppSelector((state) => selectPostById(state, postId!));

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        );
    }

    const deletePost = () => {
        dispatch(postDeleted(post));
        navigate("/");
    }

    return (
        <section className="posts-wrapper">
            <h2>Post Detail:</h2>
            {
                <article className="post">
                    <p><span>Post Number: </span>{post.number}</p>
                    <p>
                        <span> Post Title: </span>{post.title}
                    </p>
                    <p className="post-content">
                        <span>Post Content: </span>{post.content}
                    </p>
                    <p><span>View count: </span>{post.viewCount}</p>
                    <div className="btn-action">
                        <button onClick={deletePost} className="button">Delete Post</button>
                        <button onClick={() => { navigate(`/posts/${post.id}/edit`) }} className="button">
                            Edit Post
                        </button>
                        <button onClick={() => navigate("/")} className="button">Posts List</button>
                    </div>
                </article>
            }
        </section>
    )
}   