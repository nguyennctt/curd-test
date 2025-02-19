import { useAppDispatch, useAppSelector } from "../../app/hook";
import { postAdded, selectAllPosts } from "./postsSlice";
import { useNavigate } from "react-router-dom";

interface AddPostFormFields extends HTMLFormControlsCollection {
    postTitle: HTMLInputElement;
    postContent: HTMLTextAreaElement;
}
interface AddPostFormElements extends HTMLFormElement {
    readonly elements: AddPostFormFields;
}

export const AddPostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const posts = useAppSelector(selectAllPosts);

    const handleSubmit = async (e: React.FormEvent<AddPostFormElements>) => {
        e.preventDefault();
        const { elements } = e.currentTarget;
        const title = elements.postTitle.value;
        const content = elements.postContent.value;
        const number = posts[posts.length - 1].number + 1;
        await dispatch(postAdded(number, title, content));
        navigate(`/`);
    }

    return (
        <section className="posts-wrapper">
            <h2><label>Add a new post:</label> </h2>
            <form onSubmit={handleSubmit}>
                <div className="form-content">
                    <div>
                        <label htmlFor="postTitle">Post title:</label>
                        <div>
                            <input type="text" id="postTitle" defaultValue="" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="postContent">Post content:</label>
                        <div>
                            <textarea id="postContent" name="postContent" rows={16} defaultValue="" required />
                        </div>
                    </div>
                </div>
                <div className="btn-action">
                    <button className="button ">Save Post</button>
                </div>
            </form>
        </section>
    )
}