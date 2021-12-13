import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IArticle } from "../../models/IArticles";

export interface appState {
  articles: IArticle[];
  currentArticle: IArticle;
}
//в articles хранятся статьи
//при нажатии на кнопку "перейти", мы передаем id в редакс, редакс задает curr articles и после того, как я перейду по кнопке сразу получу статью
//надо записать в articles все 
//fetch надо записывать в редакс
//fetch в редакс
const initialState: appState = {
  articles: [],
  currentArticle: {
    source: {id: '', name: ''},
    author: '',
    title: '',
    description: '',
    url: '',
    urlToImage: '',
    publishedAt: new Date(),
    content: '',
    // titleOverlap: 0,
    // descriptionOverlap: 0,
  },
};

export const appStore = createSlice({
  name: "app",
  initialState,
  reducers: {
    getArticle: (state, action: PayloadAction<number>) => {
      state.currentArticle = state.articles.find((_, index) => action.payload === index ) || state.articles[0]
    }
  },
});

// Action creators are generated for each case reducer function

export const {getArticle} = appStore.actions;

export default appStore.reducer;
