import { useState } from "react";
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

  const [filteredState, setFilteredState] = useState(articles);
  
  useEffect(() => {
    if (articles.length) {
      setFilteredState(articles);
    }
  }, [articles]);

  const [searchField, setSearchField] = useState("");

  const handleFilter = () => {
    const keyWords = searchField.split(" ");
    
    // const filtered = articles.filter((article) => {
      // return keyWords.forEach((element) => article.title.indexOf(element) > -1 );

      const filtered = articles.filter((article) => {
        let isMatch = false
        for (let index = 0; index < keyWords.length; index++) {
          const element = article.title.indexOf(keyWords[index]) >-1;
          if (element) {
            isMatch = true
          }      
        }
        return isMatch
      }
    );
    console.log(keyWords)
    console.log(filtered)
    setFilteredState(filtered);
    if (keyWords.length === 0) setFilteredState(articles);
  };

  return (
    <div className="App">
      <input
        value={searchField}
        onChange={(e) => {
          setSearchField(e.target.value);
        }}
      />
      <button onClick={handleFilter}>фильтрация</button>
      {isLoading && <h1>Now is loading...</h1>}
      {error && <h1>{error}</h1>}

      {filteredState &&
        filteredState.map((article, index) => {
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
