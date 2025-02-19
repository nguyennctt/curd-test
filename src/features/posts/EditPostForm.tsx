import { Form, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { postUpdated, selectPostById } from "./postsSlice";

interface EditPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
}
interface EditPostFormElements extends HTMLFormElement {
    readonly elements: EditPostFormFields;
}

export const EditPostForm = () => {
    const { postId } = useParams();
    const post = useAppSelector((state) => selectPostById(state, postId!));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    if (!post) {
        return (
            <section>
                <h2>Post not Found!</h2>
            </section>
        );
    }

    const onSavePostClicked = async (e: React.FormEvent<EditPostFormElements>) => {
        e.preventDefault();
        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;

        if (title && content) {
            await dispatch(postUpdated({ id: post.id, title, content }));
            navigate(`/posts/${postId}`);
        }
    }

    return (
        <section className="posts-wrapper">
            <h2>Edit Post</h2>
            <Form onSubmit={onSavePostClicked}>
                <div className="form-content">
                    <div>
                        <label htmlFor="postTitle">Post Title:</label>
                        <div><input type="text" id="postTitle" name="postTitle" defaultValue={post.title} required /></div>
                    </div>
                    <div>
                        <label htmlFor="postContent">Content:</label>
                        <div><textarea id="postContent" name="postContent" defaultValue={post.content} required /></div>
                    </div>
                </div>
                <div className="btn-action">
                    <button className="button"> Update Post</button>
                </div>
            </Form>
        </section>
    );
}