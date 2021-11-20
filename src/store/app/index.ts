import {createSlice} from "@reduxjs/toolkit";

export interface appState {
  articles: string;
  currentArticle: string;
}
//в articles хранятся статьи
//при нажатии на кнопку "перейти", мы передаем id в редакс, редакс задает curr articles и после того, как я перейду по кнопке сразу получу статью
//надо записать в articles все 
//fetch надо записывать в редакс
//fetch в редакс
const initialState: appState = {
  articles: "empty array",
  currentArticle: "",
};

export const appStore = createSlice({
  name: "app",
  initialState,
  reducers: {
  },
});

// Action creators are generated for each case reducer function
export const {} = appStore.actions;

export default appStore.reducer;
