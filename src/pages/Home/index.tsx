import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ResultCounter } from "../../components/ResultCounter";
import { SearchBar } from "../../components/Searchbar";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IArticleModified } from "../../models/IArticles";
import { fetchArticles } from "../../store/reducers/ActionCreators";
import { filterArticles, sortModifiedArticles } from "../../utils/articles";
import './styles.scss'

export const Home = () => {
  const { articles } = useAppSelector((state) => state.ArticleReducer);

  useEffect(() => {
    if (articles.length) {
      setCurrentFilteredState(articles);
    }
  }, [articles]);

  const [currentFilteredState, setCurrentFilteredState] = useState(articles);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const [searchField, setSearchField] = useState("");

  const handleFilter = (inputValue: string) => {
    const keyWords = inputValue
      .split(" ")
      .filter((keyword) => keyword !== "")
      .map((word) => word.toLowerCase());
    const keyToRegex = new RegExp(keyWords.join("|"), "gi");
    const filtered: IArticleModified[] = filterArticles(
      articles,
      keyWords,
      keyToRegex
    );

    const sorted = sortModifiedArticles(filtered);
    setCurrentFilteredState(sorted);
    if (keyWords.length === 0) setCurrentFilteredState(articles);
  };
  return (
    <div className="App">
      <span>
        <Container>
          <SearchBar
            value={searchField}
            onChange={(e) => {
              setSearchField(e.target.value);
              handleFilter(e.target.value);
            }}
          />
          <ResultCounter currentFilteredState={currentFilteredState} />
          <ArticleList currentFilteredState={currentFilteredState} />
        </Container>
      </span>
    </div>
  );
};
