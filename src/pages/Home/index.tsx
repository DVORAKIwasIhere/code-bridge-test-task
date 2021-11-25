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

  const [currentFilteredState, setCurrentFilteredState] = useState(articles);

  useEffect(() => {
    if (articles.length) {
      setCurrentFilteredState(articles);
    }
  }, [articles]);

  const [searchField, setSearchField] = useState("");

  const handleFilter = () => {
    const keyWords = searchField.split(" ");
    const filteredKeyWords = keyWords.filter((keyword)=>keyword !== '')
    // const filtered = articles.filter((article) => {
    // return keyWords.forEach((element) => article.title.indexOf(element) > -1 );

    const filtered = articles.filter((article) => {
      let isMatch = false;
      for (let index = 0; index < filteredKeyWords.length; index++) {
        const indexTitle = article.title.indexOf(filteredKeyWords[index]) > -1;
        const indexDescription = article.description.indexOf(filteredKeyWords[index]) > -1;
        if (indexTitle || indexDescription) {
          isMatch = true;
        }
      }
      return isMatch;
    });
    // const filteredDesc = articles.filter((article) => {
    //   let isMatch = false;
    //   for (let index = 0; index < keyWords.length; index++) {
    //     const element = article.description.indexOf(keyWords[index]) > -1;
    //     if (element) {
    //       isMatch = true;
    //     }
    //   }
    //   return isMatch;

    console.log(keyWords);
    console.log(filteredKeyWords);
    console.log(filtered);
    setCurrentFilteredState(filtered);
    if (keyWords.length === 0) setCurrentFilteredState(articles);
  };

  // const handleFilterDesc = () => {
  //   const keyWords = searchField.split(" ");
  //   const filtered = articles.filter((article) => {
  //     let isMatch = false;
  //     for (let index = 0; index < keyWords.length; index++) {
  //       const element = article.description.indexOf(keyWords[index]) > -1;
  //       if (element) {
  //         isMatch = true;
  //       }
  //     }
  //     return isMatch;
  //   });
  //   console.log(keyWords);
  //   console.log(filtered);
  //   setFilteredStateDesc(filtered);
  // };

  // const handleFilter = () => {
  //   handleFilterTitle()
  //   // handleFilterDesc()
  //   setCurrentFilteredState(filteredStateTitle.concat(filteredStateDesc))
  // };

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
