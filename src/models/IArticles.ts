export interface IArticle{
    source: {id: string; name: string};
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publlishedAt: string;
    content: string
  }

  export interface IArticleModified extends IArticle{
    titleOverlap: number;
    descriptionOverlap:number
  }
