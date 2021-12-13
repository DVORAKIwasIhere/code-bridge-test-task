import { createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IArticle } from "../../models/IArticles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import ThemeProvider from "@mui/system/ThemeProvider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface ArticleListProps {
  currentFilteredState: IArticle[];
}
export const ArticleList = ({ currentFilteredState }: ArticleListProps) => {
  const { isLoading, error } = useAppSelector((state) => state.ArticleReducer);
  const createMarkUp = (html: any) => {
    return { __html: html };
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Montserrat"].join(","),
    },
  });

  const publishTheme = createTheme({
    typography: {
      fontSize: 12,
      fontFamily: ["Montserrat"].join(","),
      allVariants: {
        color: "grey",
      },
    },
  });

  const titleTheme = createTheme({
    typography: {
      fontSize: 16,
      fontFamily: ["Montserrat"].join(","),
    },
  });

  const descriptionTheme = createTheme({
    typography: {
      fontSize: 12,
      fontFamily: ["Montserrat"].join(","),
    },
  });

  if (isLoading) return <h1>Now is loading...</h1>;

  if (error) return <h1>{error}</h1>;
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        {currentFilteredState &&
          currentFilteredState.map((article, index) => {
            console.log(article);
            const options = { year: "numeric", month: "long", day: "numeric" };
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Link to={`/article/${index}`} className="link">
                  <Card
                    sx={{ maxWidth: 345, minHeight: 275, boxShadow: 3 }}
                    style={{ height: "100%" }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={article.urlToImage}
                      alt="Loading"
                    />
                    <CardContent style={{ height: "100%" }}>
                      <ThemeProvider theme={publishTheme}>
                        <Typography component="div" sx={{ mr: 2, mt: 2 }} style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}>
                          <CalendarTodayIcon className="icon" />
                          {new Date(article.publishedAt).toLocaleDateString(
                            "en-US",
                            options
                          )}
                        </Typography>
                      </ThemeProvider>
                      <ThemeProvider theme={titleTheme}>
                        <Typography
                          dangerouslySetInnerHTML={createMarkUp(article.title)}
                          component="div"
                          sx={{ mr: 2, mt: 2 }}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={descriptionTheme}>
                        <Typography
                          component="div"
                          dangerouslySetInnerHTML={createMarkUp(
                            article.description.substring(0, 100) + "..."
                          )}
                          sx={{ mr: 2, mt: 2 }}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={descriptionTheme}>
                        <Typography
                          sx={{
                            alignSelf: "flex-end",
                            mt: 2,
                            fontWeight: "bold",
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          read more
                          <ArrowRightAltIcon />
                        </Typography>
                      </ThemeProvider>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
      </Grid>
    </ThemeProvider>
  );
};
