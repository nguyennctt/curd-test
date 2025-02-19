import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Post {
    id: string,
    number: number,
    title: string,
    content: string,
    viewCount: number,
}
export type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>;
export type PostView = Pick<Post, 'id'>;
export type NewPost = Pick<Post, 'number' | 'title' | 'content'>;
interface PostsState {
    posts: Post[];
    error: string | null;
}
const initialState: PostsState = {
    posts: [
        { id: '1', number: 1, title: 'first post', content: 'first content', viewCount: 0 },
        { id: '2', number: 2, title: 'second post', content: 'second content', viewCount: 0 },
    ],
    error: null
}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.posts.push(action.payload);
            },
            prepare(number: number, title: string, content: string) {
                return {
                    payload: {
                        id: nanoid(),
                        number,
                        title,
                        content,
                        viewCount: 0
                    },
                }
            },
        },
        postUpdated(state, action: PayloadAction<PostUpdate>) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);

            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
        postDeleted(state, action: PayloadAction<Post>) {
            state.posts = state.posts.filter(post => post.id != action.payload.id);
        },
        updateViewCount(state, action: PayloadAction<PostView>) {
            const { id } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);

            if (existingPost) {
                existingPost.viewCount = existingPost.viewCount + 1;
            }
        }
    }
});

export const { postAdded, postUpdated, postDeleted, updateViewCount } = postsSlice.actions;
export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;
export const selectPostById = (state: RootState, postId: string) =>
    state.posts.posts.find((post) => post.id === postId);