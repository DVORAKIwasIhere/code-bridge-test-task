import { IArticle, IArticleModified } from "../models/IArticles";

export const filterArticles = (
  articles: IArticle[],
  keyWords: string[],
  keyToRegex: RegExp
) =>
  articles
    .filter((article) => {
      let isMatch = false;
      const lowerTitle = article.title.toLocaleLowerCase();
      const lowerDescription = article.description.toLocaleLowerCase();
      for (let index = 0; index < keyWords.length; index++) {
        const indexTitle = lowerTitle.indexOf(keyWords[index]) > -1;
        const indexDescription = lowerDescription.indexOf(keyWords[index]) > -1;
        if (indexTitle || indexDescription) {
          isMatch = true;
        }
      }
      return isMatch;
    })
    .map((article): IArticleModified => {
      const lowerTitle = article.title.toLocaleLowerCase();
      const lowerDescription = article.description.toLocaleLowerCase();
      const titleOverlap = lowerTitle.match(keyToRegex)
        ? lowerTitle.match(keyToRegex)!.length
        : 0;
      const descriptionOverlap = lowerDescription.match(keyToRegex)
        ? lowerDescription.match(keyToRegex)!.length
        : 0;
      const title = article.title.replace(
        keyToRegex,
        (match) => `<mark>${match}</mark>`
      );
      const description = article.description.replace(
        keyToRegex,
        (match) => `<mark>${match}</mark>`
      );
      return {
        ...article,
        title: title,
        description: description,
        titleOverlap,
        descriptionOverlap,
      };
    });

export const sortModifiedArticles = (articles: IArticleModified[]) =>
  articles
    .sort((a, b) => {
      return b.descriptionOverlap - a.descriptionOverlap;
    })
    .sort((a) => {
      if (a.descriptionOverlap < a.titleOverlap) {
        return 1;
      }
      return 0;
    })
    .sort((a, b) => {
      if (
        a.descriptionOverlap === b.descriptionOverlap &&
        b.titleOverlap > a.titleOverlap
      ) {
        return 1;
      }
      return 0;
    });
