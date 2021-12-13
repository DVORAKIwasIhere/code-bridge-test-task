import './styles.scss'
import { IArticle } from "../../models/IArticles";

interface ArticleListProps {
  currentFilteredState: IArticle[];
}

export const ResultCounter = ({ currentFilteredState }: ArticleListProps) => {
  return <div className="counter"> Results: {currentFilteredState.length}</div>;
};
