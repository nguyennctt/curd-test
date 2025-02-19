import { useSelector } from "react-redux"
import { selectAllPosts } from "./postsSlice";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PostsList = () => {
    const navigate = useNavigate();
    const posts = useSelector(selectAllPosts);

    const sortedPost = useMemo(() => {
        const sortedPost = posts.slice();
        sortedPost.sort((a, b) => b.number - a.number);
        return sortedPost;
    }, [posts]);

    const addPost = () => { navigate("posts/new"); }

    return (
        <>
            <section className="posts-wrapper">
                <h2>Posts:</h2>
                <button onClick={addPost} className="button">Add Post</button>
                <div className="posts-list">
                    {
                        sortedPost.map(post => (
                            <article className="post" key={post.id}>
                                <span className="post-number">{post.number}</span>
                                <h3>
                                    <Link to={`posts/${post.id}`} >{post.title}</Link>
                                </h3>
                                <p className="post-viewcount">
                                    <span>view count:</span> {post.viewCount}
                                </p>
                            </article>
                        ))
                    }
                </div>
            </section>
        </>
    )
}