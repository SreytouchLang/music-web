import { globleEaseInOutTransitionTime } from "@/theme/utils/globalTransitions";
import { imgDefaultSong } from "@assets/images";
import AppLoader from "@components/AppLoader";
import { LoaderButton } from "@components/design/Button";
import { ImageCompWithLoader } from "@components/design/Image";
import { RootContainer } from "@components/design/styledComponents";
import DialogImagePreview from "@components/dialog/DialogImagePreview";
import FallbackError from "@components/FallbackError";
import ItemSongListSkeleton from "@components/skeletons/ItemSongLIst.skeleton";
import { Add, Check } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import ItemSongList from "../../components/ItemSongList";
import useAlbumDetailController from "./AlbumDetail.controller";

const AlbumDetail = () => {
  // const classes = useStyles();

  const {
    listenerGoToArtistDetails,
    lastTrackListItemRef,
    listenerOpenDialogImagePreview,
    handleSaveUnsaveAlbumAPICall,
    isAlbumDataError,
    isAlbumDataLoading,
    albumData,
    bgColor,
    isTrackListLoading,
    isTrackListError,
    trackList,
    isSaveUnsaveAlbumLoading,
  } = useAlbumDetailController();

  const renderAlbumProfile = () => {
    if (isAlbumDataLoading) return <AppLoader />;
    if (isAlbumDataLoading)
      return <FallbackError type="something_went_wrong" />;
    if (!albumData && !isAlbumDataError && !isAlbumDataLoading)
      return <FallbackError message="Album Not Found" type="data_not_found" />;

    return (
      <>
        <Box
          // className={classes.details}
          sx={{
            backgroundColor: `${bgColor}`,
            zIndex: 1,
            borderRadius: "12px 12px 0 0",
            padding: "30px",
            display: "flex",
            flexWrap: "wrap",
            position: "relative",
            // flex: 1,
            gap: "30px",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              width: "100%",
              background: `linear-gradient(to bottom, ${bgColor}b0  10%, ${bgColor}05  )`,
              position: "absolute",
              height: "100%",
              left: 0,
              bottom: "-100%",
              zIndex: -1,
            }}
          />
          <DialogImagePreview
            previewImageUrl={
              (albumData?.images && albumData?.images[0]?.url) || ""
            }
          />
          <ImageCompWithLoader
            img={(albumData?.images && albumData?.images[0]?.url) || ""}
            alt={"album"}
            errorImage={imgDefaultSong}
            onClick={listenerOpenDialogImagePreview}
            style={{
              // flex: "0 0 200px",
              width: "250px",
              aspectRatio: 1,
              borderRadius: "12px",
              boxShadow: "0px 10px 10px 2px rgba(10,10,10,0.5)",
              transition: `transform ${globleEaseInOutTransitionTime}`,
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          <Box sx={{ flex: "1 1 auto" }}>
            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {albumData?.type}
            </Typography>
            <Typography
              variant="h1"
              style={{
                fontSize: "clamp(2rem,1rem + 4vw, 4rem)",
                fontWeight: "bolder",
              }}
              mb={"15px"}
            >
              {albumData?.name}
            </Typography>
            <Typography variant="h6" color="text.primary" mb={"15px"}>
              {`${albumData?.release_date?.slice(0, 4)} • `}
              {albumData?.artists?.map((item, index) => (
                <Box
                  component={"span"}
                  key={item.id}
                  onClick={() => listenerGoToArtistDetails(item.id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "text.primary",
                    },
                  }}
                >
                  {(albumData?.artists?.length ?? 0) - 1 == index
                    ? `${item.name}`
                    : `${item.name}, `}
                </Box>
              ))}
              {` • ${albumData?.total_tracks} songs • ${albumData?.album_type}`}
            </Typography>
            <LoaderButton
              startIcon={albumData?.isSaved ? <Check /> : <Add />}
              label={albumData?.isSaved ? "Saved" : "Save"}
              loading={isSaveUnsaveAlbumLoading}
              variant={"outlined"}
              color={"primary"}
              style={{
                "& .MuiButton-startIcon": {
                  marginRight: "3px",
                },
                padding: "5px 18px",
                fontSize: "13px",
                borderRadius: "20px",
                borderColor: "text.primary",
                color: "text.primary",
                "&:hover": {
                  borderColor: "text.primary",
                  color: "text.primary",
                },
              }}
              onClick={handleSaveUnsaveAlbumAPICall}
            />
          </Box>
        </Box>
        {renderAlbumsTracks()}
      </>
    );
  };

  const renderAlbumsTracks = () => {
    if (
      (trackList.length == 0 && !isTrackListLoading && !isTrackListError) ||
      isTrackListError
    )
      return;
    return (
      <>
        {/* <Typography variant="h3" sx={{ margin: "20px 0 10px 10px", zIndex: 1 }}>
          Tracks
        </Typography> */}
        <Grid
          container
          spacing={1}
          mt={"20px"}
          mb={"10px"}
          paddingX={"10px"}
          sx={{ zIndex: 1 }}
        >
          {trackList?.map((track, index) => (
            <Grid item xs={12} key={track.id}>
              <Box
                key={track.id}
                component={"div"}
                sx={{ width: "100%" }}
                ref={
                  index === trackList.length - 1 ? lastTrackListItemRef : null
                }
              >
                <ItemSongList
                  key={track.id}
                  img={albumData?.images && albumData?.images[0]?.url}
                  title={track?.name}
                  track_no={index + 1}
                  // subtitle={` From ${track.album?.name}`}
                  subtitleArr={track.artists}
                  trackDuration={track.duration_ms}
                />
              </Box>
            </Grid>
          ))}
          {isTrackListLoading && renderSkeleton()}
        </Grid>
      </>
    );
  };

  const renderSkeleton = () => {
    return Array.from({ length: 10 }, (_, index) => (
      <Grid item xs={12} key={index}>
        <ItemSongListSkeleton haveIndex key={index} />
      </Grid>
    ));
  };

  return (
    <RootContainer style={{ padding: 0 }}>{renderAlbumProfile()}</RootContainer>
  );
};

export default AlbumDetail;

// const useStyles = makeStyles((_: Theme) => ({
//   details: {
//     borderRadius: "12px 12px 0 0",
//     padding: "30px",
//     display: "flex",
//     flexWrap: "wrap",
//     position: "relative",
//     // flex: 1,
//     gap: "30px",
//     alignItems: "flex-end",
//   },
// }));
