export interface IArticle{
    source: {id: string; name: string};
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: Date;
    content: string
  }

  export interface IArticleModified extends IArticle{
    titleOverlap: number;
    descriptionOverlap:number
  }
