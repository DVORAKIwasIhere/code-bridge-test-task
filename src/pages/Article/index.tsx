import { useParams } from "react-router";
import { appState } from "../../store/app";
import { fetchArticles } from "../../store/reducers/ActionCreators";
import { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

export const Article = () => {
  //     const useSelector = ((state: appState) => state)

  const { articleId } = useParams();
  const numericId = Number(articleId);
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.ArticleReducer);

  return (
    <div className="App">
      1
      {articles[numericId].title}
    </div>
  )
};
