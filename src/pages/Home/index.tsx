import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IArticle, IArticleModified } from "../../models/IArticles";
import { fetchArticles } from "../../store/reducers/ActionCreators";

export const Home = () => {
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const dispatch = useAppDispatch();
  const { articles, isLoading, error } = useAppSelector(
    (state) => state.ArticleReducer
  );

  const [currentFilteredState, setCurrentFilteredState] = useState(articles);

  useEffect(() => {
    if (articles.length) {
      setCurrentFilteredState(articles);
    }
  }, [articles]);

  const [searchField, setSearchField] = useState("");
  // const isExist = (num: number) => {
  //   return num > 0
  // }
  const handleFilter = () => {
    const keyWords = searchField.split(" ");
    const filteredKeyWords = keyWords.filter((keyword) => keyword !== "");
    const toLowered = filteredKeyWords.map((word) => word.toLowerCase());
    const keyToRegex = new RegExp(toLowered.join("|"), "gi");
    const filtered: IArticleModified[] = articles.filter((article) => {
      let isMatch = false;
      const lowerTitle = article.title.toLocaleLowerCase();
      const lowerDescription = article.description.toLocaleLowerCase();
      for (let index = 0; index < toLowered.length; index++) {
        const indexTitle = lowerTitle.indexOf(toLowered[index]) > -1;
        const indexDescription = lowerDescription.indexOf(toLowered[index]) > -1;
        if (indexTitle || indexDescription) {
          isMatch = true;
        }
      }
      return isMatch;
    })
      .map((article):IArticleModified=>{
        const lowerTitle = article.title.toLocaleLowerCase();
        const lowerDescription = article.description.toLocaleLowerCase();
        const titleOverlap = lowerTitle.match(keyToRegex) ? lowerTitle.match(keyToRegex)!.length : 0;
        const descriptionOverlap = lowerDescription.match(keyToRegex) ? lowerDescription.match(keyToRegex)!.length : 0;
        
        return {...article, titleOverlap, descriptionOverlap}
      })
    ;
      const sorted = (
        filtered.sort((a, b)=>{
          let titleParam = b.titleOverlap - a.titleOverlap
          if (titleParam !== 0) {
            return titleParam            
          }
          return b.descriptionOverlap - a.descriptionOverlap
        })
      )
    console.log(sorted);
    setCurrentFilteredState(sorted);
    if (toLowered.length === 0) setCurrentFilteredState(articles);
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

      {currentFilteredState &&
        currentFilteredState.map((article, index) => {
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
