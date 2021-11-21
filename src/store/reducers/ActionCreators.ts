import axios from "axios";
import { IArticle } from "../../models/IArticles";
import { AppDispatch } from "../store";
import { ArticleSlice } from "./ArticleSlice";

interface IDataArticles{
    articles: IArticle[],
    status: string,
    totalResults: number
}

export const fetchArticles = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(ArticleSlice.actions.newsFetching())
        const response = await axios.get<IDataArticles>("https://newsapi.org/v2/everything?q=keyword&apiKey=302cf26b79784805bd26a7621221874c")
        dispatch(ArticleSlice.actions.newsFetchingSuccess(response.data.articles))
    } catch (e) {
        dispatch(ArticleSlice.actions.newsFetchingFailure(e.message))
    }
}