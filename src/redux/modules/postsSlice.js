import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import shortid from 'shortid';
import { API_URL } from "../../shared/Request"

const initialState = {
    posts: [],
    post: {
        id: -1,
        password: "",
        author: "",
        category: "CATEGORY1",
        title: "",
        content: ""
    },
    isLoading: false,
    error: null
}

export const __getPosts = createAsyncThunk(
    "posts/getPosts",
    async ( payload, thunkAPI) => {
        try {
            const data = payload ? await axios.get(`${API_URL}/posts?_sort=postingTime&_order=desc&_page=${payload.page}&_limit=${payload.limit}`) : await axios.get(`${process.env.REACT_APP_APIADDRESS}/posts?_page`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __accruePostsByPage = createAsyncThunk(
    "posts/accruePostsByPage",
    async ( payload, thunkAPI) => {
        try {
            const data = await axios.get(`${API_URL}/posts?_sort=postingTime&_order=desc&_page=${payload.page}&_limit=${payload.limit}`)
            return thunkAPI.fulfillWithValue(data.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __getPost = createAsyncThunk(
    "posts/getPost",
    async ( payload, thunkAPI) => {
        try {
            const data = payload ? await axios.get(`${API_URL}/posts/${payload}`) : initialState.post;
            if(payload) return thunkAPI.fulfillWithValue(data.data)
            else return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __writePost = createAsyncThunk(
    "posts/writePost",
    async ( payload, thunkAPI ) => {
        try{
            const post = {
                id: shortid.generate(),
                ...payload,
                hits: 0,
                postingTime: Date.now()
            }
            await axios.post(`${API_URL}/posts`, post)
            return thunkAPI.fulfillWithValue(post)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const postsSlice = createSlice(
    {
        name: 'posts',
        initialState: initialState,
        reducers: { },
        extraReducers: {
            // __getPosts
            [__getPosts.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__getPosts.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.posts = action.payload
            },
            [__getPosts.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },

            // __accruePostsByPage
            [__accruePostsByPage.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__accruePostsByPage.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload];
            },
            [__accruePostsByPage.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },

            // __getPost
            [__getPost.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__getPost.fulfilled]: (state, action) => {
                state.isLoading = false;
                state.post = action.payload
            },
            [__getPost.rejected]: (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            },

            // __writePost
            [__writePost.pending]: (state, action) => {
                state.isLoading = true;
            },
            [__writePost.fulfilled]: (state, action) => {
                state.posts = [action.payload, ...state.posts]
                state.isLoading = false;
            },
            [__writePost.rejected]: (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            },
        }
    }
)

export default postsSlice.reducer;