import { useParams } from "react-router";
import { fetchArticles } from "../../store/reducers/ActionCreators";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";
import "../Home/styles.scss";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export const Article = () => {
  //     const useSelector = ((state: appState) => state)
  const dispatch = useAppDispatch();
  const { articleId } = useParams();
  const numericId = Number(articleId);
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const { articles } = useAppSelector((state) => state.ArticleReducer);
  const articleImage = articles.length
    ? articles[numericId].urlToImage
    : "Loading";
  console.log(articleImage);

  const backgroundImageStyle = {
    height: "20%",
    width: "100%",
    backgroundImage: `url(${articleImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const boxStyle = {
    backgroundColor: "white",
    margin: "50px",
    marginTop: "80px",
    minHeight: "80%",
    borderRadius: "4px",
    padding: "50px 75px",
    boxShadow: "0px 3px 3px -2px",
  };

  return (
    <div className="App">
      <Grid style={backgroundImageStyle} container>
        <Grid item>
          <Box style={boxStyle}>
            <Typography
              sx={{
                mt: 2,
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                fontSize: 24,
                fontFamily: "Montserrat",
              }}
            >
              {articles.length ? articles[numericId].title : "Loading..."}
            </Typography>
            <Typography
              sx={{
                mt: 2,
              }}
              style={{
                flexWrap: "wrap",
                fontSize: 18,
                lineHeight: "27px",
                fontFamily: "Montserrat",
              }}
            >
              {articles.length ? articles[numericId].description : ""}
            </Typography>
          </Box>
          <Link to={`/`} className="link">
            <Typography
              sx={{
                alignSelf: "flex-end",
                fontWeight: "bold",
                ml: 20,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: 18,
                fontFamily: "Montserrat",
              }}
            >
              <ArrowRightAltIcon className="leftArrow" />
              Back to homepage
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
