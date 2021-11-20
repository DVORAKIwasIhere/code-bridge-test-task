import { useEffect, useState,  } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './../../store/store';


interface IArticle{
    source: {id: string; name: string};
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publlishedAt: string;
    content: string
  }

export const Home = () => {
    
  const [news, setNews] = useState<IArticle[]>([]);

  console.log(news)

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=keyword&apiKey=302cf26b79784805bd26a7621221874c")
    .then((response) => response.json())
    .then((data) =>{
      setNews(data.articles);
    })
  }, [])

  const app = useSelector((state: RootState) => state.app)
  
    return(
        <div className="App">
            {app.articles}
        <span>
          {news && news.map((article, index)=>{
            return(
              <span key={index}>
                <div>{article.title}</div>
                <div>{article.description.substring(0,100) + '...'}</div>
                <Link to={`/article/${index}`}>
                    read more
                </Link>
              </span>
            )
          })}
        </span>
      </div>
    );    
}