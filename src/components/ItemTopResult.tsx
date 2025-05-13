import { globleEaseInOutTransitionTime } from "@/theme/utils/globalTransitions";
import { MGradientsDarkTheme } from "@/theme/utils/mGredient";
import { imgDefaultSong, imgPlay } from "@assets/images";
import ImageComp from "@components/design/Image";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";

type ItemTopResultProps = {
  isArtist?: boolean;
};

const ItemTopResult: React.FC<ItemTopResultProps> = ({ isArtist = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const classes = useStyles();
  return (
    <Card
      // className={classes.root}
      sx={{
        backgroundColor: "secondary.main",
        backgroundImage: "none",
        boxShadow: "none",
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: `transform ${globleEaseInOutTransitionTime},backgroundColor ${globleEaseInOutTransitionTime}`,
        borderRadius: "8px",
        "&:hover": {
          backgroundImage: MGradientsDarkTheme.hoverBgColor,
        },
      }}
    >
      <CardActionArea
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "10px",
          padding: "12px",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={imgDefaultSong}
          alt="green iguana"
          sx={{
            userSelect: "none",
            objectFit: "fill",
            cursor: "pointer",
            aspectRatio: 1,
            maxWidth: "170px",
            // borderRadius: "8px",
            borderRadius: isArtist ? "50%" : "8px",
          }}
        />
        <ImageComp
          onClick={() => {
            // showCustomToast("Oops! LogOut Failed.", "error");
          }}
          img={imgPlay}
          alt="Spotify"
          style={{
            width: "20%",
            maxWidth: "80px",
            position: "absolute",
            bottom: isHovered ? 10 : -10,
            right: isHovered ? 10 : -10,
            transition: `opacity ${globleEaseInOutTransitionTime}, transform ${globleEaseInOutTransitionTime},right ${globleEaseInOutTransitionTime},bottom ${globleEaseInOutTransitionTime}`,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "scale(1)" : "scale(0.5)",
            "&:active": {
              transform: "scale(0.5)",
            },
          }}
        />
        <CardContent sx={{ padding: 0, mt: "1.5rem" }}>
          <Typography variant="h3" color="text.primary" mb={"5px"}>
            Arijit Singh
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Artist
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemTopResult;

// const useStyles = makeStyles((_: Theme) => ({
//   root: {
//     width: "100%",
//     overflow: "hidden",
//     boxSizing: "border-box",
//     transition: `transform ${globleEaseInOutTransitionTime},backgroundColor ${globleEaseInOutTransitionTime}`,
//     borderRadius: "8px",
//     "&:hover": {
//       backgroundImage: MGradientsDarkTheme.hoverBgColor,
//     },
//   },
// }));
