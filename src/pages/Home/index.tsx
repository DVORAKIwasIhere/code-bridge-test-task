import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchArticles } from "../../store/reducers/ActionCreators";

export const Home = () => {
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector(
    (state) => state.ArticleReducer
  );

  return (
    <div className="App">
      {isLoading && <h1>Now is loading...</h1>}
      {error && <h1>{error}</h1>}
      {articles &&
        articles.map((article, index) => {
          return (
            <span key={index}>
              <div>{article.title}</div>
              <div>{article.description.substring(0, 100) + "..."}</div>
              <Link to={`/article/${index}`}>read more</Link>
              
            </span>
          );
        })}
    </div>
  );
};
