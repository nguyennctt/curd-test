import { createBrowserRouter } from "react-router-dom";
import { PostsList } from "./features/posts/PostsList";
import { PostDetails } from "./features/posts/PostDetails";
import { EditPostForm } from "./features/posts/EditPostForm";
import { AddPostForm } from "./features/posts/AddPostForm";
import { NotFoundPage } from "./components/home/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <PostsList /> },
            { path: '/posts/new', element: <AddPostForm /> },
            { path: '/posts/:postId', element: <PostDetails /> },
            { path: '/posts/:postId/edit', element: <EditPostForm /> },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
