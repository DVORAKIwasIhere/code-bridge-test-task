import { useParams } from "react-router";
import { fetchArticles } from "../../store/reducers/ActionCreators";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

export const Article = () => {
  //     const useSelector = ((state: appState) => state)
  const dispatch = useAppDispatch();
  const { articleId } = useParams();
  const numericId = Number(articleId);
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  
  const { articles } = useAppSelector((state) => state.ArticleReducer);

  return (
    <div className="App">
      {articles.length ? articles[numericId].title : "Loading..."}
      <div>
        {articles.length ? articles[numericId].description : "Loading..."}
      </div>
      <Link to={`/`}>back to home</Link>
    </div>
  );
};
