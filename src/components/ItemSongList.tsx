import { IAlbumSchema } from "@/schemas/album.schema";
import { IArtistSchema } from "@/schemas/artist.schema";
import { globleEaseInOutTransitionTime } from "@/theme/utils/globalTransitions";
import { MGradientsDarkTheme } from "@/theme/utils/mGredient";
import { ImageCompWithLoader } from "@components/design/Image";
import { SingleLineTypo } from "@components/design/styledComponents";
import { AccessTimeRounded } from "@mui/icons-material";
import { Box, Card, CardActionArea, Typography } from "@mui/material";
import { msToTimeConvert } from "@utils/genaralFunctions";
import React from "react";
import { useNavigate } from "react-router-dom";

type ItemSongListProps = {
  title?: string;
  subtitle?: string;
  subtitleArr?: IArtistSchema[] | IAlbumSchema[];
  isAlbumArr?: boolean;
  trackDuration?: number;
  img?: string;
  track_no?: number;
  onClick?: () => void;
};

const ItemSongList = ({
  title,
  track_no = 0,
  img,
  subtitleArr,
  isAlbumArr = false,
  subtitle,
  onClick,
  trackDuration,
}: ItemSongListProps) => {
  // const classes = useStyle();
  const navigate = useNavigate();

  const listenerGoToArtistDetails = (artistId?: string) => {
    artistId && navigate(`/artist/${artistId}`);
  };
  const listenerGoToAlbumDetails = (albumId?: string) => {
    albumId && navigate(`/album/${albumId}`);
  };
  return (
    <Card
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        width: "100%",
        transition: `transform ${globleEaseInOutTransitionTime},backgroundColor ${globleEaseInOutTransitionTime}`,
        boxSizing: "border-box",
        overFlow: "hidden",
        "&:hover": {
          // backgroundColor: theme.palette.secondary.main,
          backgroundImage: MGradientsDarkTheme.hoverBgColor,
          borderRadius: "5px",
        },
      }}
      // className={classes.root}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "12px",
          paddingY: "8px",
          paddingX: "12px",
          boxSizing: "border-box",
        }}
      >
        {track_no > 0 && (
          <Typography
            variant="subtitle1"
            minWidth={"20px"}
            color="text.primary"
            mr={"2px"}
          >
            {track_no}
          </Typography>
        )}

        <ImageCompWithLoader
          img={img}
          alt={"track"}
          style={{
            width: "50px",
            minWidth: "50px",
            aspectRatio: 1,
            // flex: 1,
            borderRadius: "5px",
            boxShadow: "0px 10px 10px 2px rgba(0,0,0,0.2)",
          }}
        />
        <Box component={"div"} sx={{ flex: 1, overflow: "hidden" }}>
          <SingleLineTypo variant="subtitle1" color="text.primary" mb={"2px"}>
            {title}
          </SingleLineTypo>
          <SingleLineTypo variant="subtitle2" color="text.secondary">
            {subtitle}
            {subtitleArr?.map((item, index) => (
              <React.Fragment key={item.id}>
                <Box
                  component={"span"}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    isAlbumArr
                      ? listenerGoToAlbumDetails(item.id)
                      : listenerGoToArtistDetails(item.id);
                  }}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "text.primary",
                    },
                  }}
                >
                  {/* {subtitleArr.length - 1 == index ? `${item.name}` : `${item.name} • `} */}
                  {item.name}
                </Box>
                {subtitleArr.length - 1 == index ? `` : ` • `}
              </React.Fragment>
            ))}
          </SingleLineTypo>
        </Box>
        <Box sx={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          <AccessTimeRounded
            sx={{ fontSize: "20px", color: "text.secondary" }}
          />
          <Typography variant="body2" color="text.secondary">
            {msToTimeConvert(trackDuration || 0)}
          </Typography>
        </Box>

        {/* <MenuTrackOptions /> */}
      </CardActionArea>
    </Card>
  );
};

export default ItemSongList;

// const useStyle = makeStyles((_: Theme) => ({
//   root: {
//     width: "100%",
//     transition: `transform ${globleEaseInOutTransitionTime},backgroundColor ${globleEaseInOutTransitionTime}`,
//     boxSizing: "border-box",
//     overFlow: "hidden",
//     "&:hover": {
//       // backgroundColor: theme.palette.secondary.main,
//       backgroundImage: MGradientsDarkTheme.hoverBgColor,
//       borderRadius: "5px",
//     },
//   },
// }));
