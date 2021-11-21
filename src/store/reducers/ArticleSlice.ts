import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IArticle } from "../../models/IArticles"


interface ArticleState { 
    articles: IArticle[];
    isLoading: boolean;
    error: string;
}

const initialState: ArticleState = {
    articles: [],
    isLoading: false,
    error: ''
}

export const ArticleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        newsFetching(state) {
            state.isLoading = true;
        },
        newsFetchingSuccess(state, action: PayloadAction<IArticle[]>) {
            state.isLoading = false;
            state.error = "";
            state.articles = action.payload;
        },
        newsFetchingFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export default ArticleSlice.reducer;