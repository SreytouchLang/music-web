import FallbackError from "@components/FallbackError";
import ItemArtistAlbumsList from "@components/ItemArtistAlbumsList";
import { TitleSeeAll } from "@components/design/Image";
import {
  ContainerWithoutScrollbar,
  RootContainer,
} from "@components/design/styledComponents";
import ItemArtistAlbumListSkeleton from "@components/skeletons/ItemArtistAlbumsList.skeleton";
import ItemSongListSkeleton from "@components/skeletons/ItemSongLIst.skeleton";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ItemSongList from "../../components/ItemSongList";
import useHomeController from "./Home.controller";

const Home: React.FC = () => {
  // const classes = useStyle();
  const {
    listenerGoToAlbumDetails,
    listenerSeeAllNewRelease,
    listenerPlayTrack,
    isRecentPlayedTrackListError,
    isRecentPlayedTrackListLoading,
    recentPlayedTrackList,
    isNewReleaseAlbumListError,
    isNewReleaseAlbumListLoading,
    newReleaseAlbumList,
    isHindiTrackListError,
    isHindiTrackListLoading,
    hindiTrackList,
    isEnglishTrackListError,
    isEnglishTrackListLoading,
    englishTrackList,
    isPunjabiTrackListError,
    isPunjabiTrackListLoading,
    punjabiTrackList,
  } = useHomeController();

  const renderHindiTracks = () => {
    if (isHindiTrackListLoading) return renderSkeletons(true);
    if (
      (hindiTrackList.length == 0 &&
        !isHindiTrackListError &&
        !isHindiTrackListLoading) ||
      isHindiTrackListError
    )
      return;

    return (
      <Box
        // className={classes.trendingContainer}
        sx={{
          backgroundImage: `url(${
            hindiTrackList[0].track?.album?.images &&
            hindiTrackList[0].track?.album?.images[0].url
          })`,
          flex: 1,
          minWidth: "330px",
          // backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
          padding: "10px 5px",
          // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
          scrollSnapAlign: "start",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          // className={classes.trendingContainerBgImage}
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            // opacity: 0.3,
            background: `linear-gradient(to top, rgba(12,11,26,0.95) 30%, rgba(12,11,26,0.6)  )`,
          }}
        />
        <Typography variant="h4" m={"10px"}>
          Hindi
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {hindiTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                img={
                  item?.track?.album?.images &&
                  item?.track?.album?.images[0]?.url
                }
                title={item?.track?.name}
                // track_no={index + 1}
                onClick={() => {
                  listenerPlayTrack(item.track?.uri);
                }}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderPunjabiTracks = () => {
    if (isPunjabiTrackListLoading) return renderSkeletons(true);
    if (
      (punjabiTrackList.length == 0 &&
        !isPunjabiTrackListLoading &&
        !isPunjabiTrackListError) ||
      isPunjabiTrackListError
    )
      return;

    return (
      <Box
        // className={classes.trendingContainer}
        sx={{
          backgroundImage: `url(${
            punjabiTrackList[0].track?.album?.images &&
            punjabiTrackList[0].track?.album?.images[0].url
          })`,
          flex: 1,
          minWidth: "330px",
          // backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
          padding: "10px 5px",
          // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
          scrollSnapAlign: "start",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          // className={classes.trendingContainerBgImage}
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            // opacity: 0.3,
            background: `linear-gradient(to top, rgba(12,11,26,0.95) 30%, rgba(12,11,26,0.6)  )`,
          }}
        />
        <Typography variant="h4" m={"10px"}>
          Punjabi
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {punjabiTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                onClick={() => {
                  listenerPlayTrack(item.track?.uri);
                }}
                img={
                  item?.track?.album?.images &&
                  item?.track?.album?.images[0]?.url
                }
                title={item?.track?.name}
                // track_no={index + 1}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderEnglishTracks = () => {
    if (isEnglishTrackListLoading) return renderSkeletons(true);
    if (
      (englishTrackList.length == 0 &&
        !isEnglishTrackListError &&
        !isEnglishTrackListLoading) ||
      isEnglishTrackListError
    )
      return;
    return (
      <Box
        // className={classes.trendingContainer}
        sx={{
          backgroundImage: `url(${
            englishTrackList[0].track?.album?.images &&
            englishTrackList[0].track?.album?.images[0].url
          })`,
          flex: 1,
          minWidth: "330px",
          // backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
          padding: "10px 5px",
          // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
          scrollSnapAlign: "start",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          // className={classes.trendingContainerBgImage}
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            // opacity: 0.3,
            background: `linear-gradient(to top, rgba(12,11,26,0.95) 30%, rgba(12,11,26,0.6)  )`,
          }}
        />
        <Typography variant="h4" m={"10px"}>
          English
        </Typography>
        {/* <TitleSeeAll varient="h4" title="Hindi" style={{ paddingTop: "10px" }} /> */}
        <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
          {englishTrackList?.map((item, index) => (
            <Grid item xs={12} key={`${item?.track?.id}${index}`}>
              <ItemSongList
                onClick={() => {
                  listenerPlayTrack(item.track?.uri);
                }}
                img={
                  item?.track?.album?.images &&
                  item?.track?.album?.images[0]?.url
                }
                title={item?.track?.name}
                // track_no={index + 1}
                subtitleArr={item?.track?.artists}
                trackDuration={item?.track?.duration_ms}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };
  const renderRecentPlayedTrackList = () => {
    if (isRecentPlayedTrackListLoading) return renderSkeletons();
    if (
      (recentPlayedTrackList.length == 0 &&
        !isRecentPlayedTrackListLoading &&
        !isRecentPlayedTrackListError) ||
      isRecentPlayedTrackListError
    )
      return;
    return (
      <>
        <Typography variant="h3" ml={"10px"}>
          Recent Played
        </Typography>
        {/* <TitleSeeAll title="Recent Played" /> */}
        <ContainerWithoutScrollbar>
          {recentPlayedTrackList.map((item, index) => (
            <ItemArtistAlbumsList
              onClick={() => {
                listenerPlayTrack(item.track?.uri);
              }}
              key={`${item.track?.id}${index}`}
              subtitleArr={item.track?.artists}
              subtitle={"--"}
              title={item.track?.name}
              img={
                (item.track?.album?.images &&
                  item.track?.album?.images[0]?.url) ||
                ""
              }
            />
          ))}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderNewReleaseAlbumsList = () => {
    if (isNewReleaseAlbumListLoading) return renderSkeletons();
    if (
      (newReleaseAlbumList.length == 0 &&
        !isNewReleaseAlbumListLoading &&
        !isNewReleaseAlbumListError) ||
      isNewReleaseAlbumListError
    )
      return;
    return (
      <>
        <TitleSeeAll
          title="New Release"
          style={{ paddingLeft: "10px" }}
          isSeeAllBtnVisible={newReleaseAlbumList.length >= 10}
          onSeeAllClick={listenerSeeAllNewRelease}
        />
        <ContainerWithoutScrollbar>
          {newReleaseAlbumList.map(
            (item, index) =>
              index < 10 && (
                <ItemArtistAlbumsList
                  key={`${item?.id}${index}`}
                  subtitleArr={item?.artists}
                  onClick={() => listenerGoToAlbumDetails(item.id)}
                  subtitle={item.release_date?.slice(0, 4)}
                  title={item?.name}
                  img={(item?.images && item?.images[0]?.url) || ""}
                />
              )
          )}
        </ContainerWithoutScrollbar>
      </>
    );
  };
  const renderSkeletons = (isTrack: boolean = false) => {
    if (isTrack) {
      return (
        <Box
          sx={{
            flex: 1,
            minWidth: "330px",
            // backgroundColor: theme.palette.secondary.main,
            borderRadius: "10px",
            padding: "10px 5px",
            // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
            scrollSnapAlign: "start",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 1,
          }}
          // className={classes.trendingContainer}
        >
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ width: "20%", height: `30px`, margin: "10px" }}
          />
          <Grid container spacing={1} paddingX={"10px"} sx={{ zIndex: 1 }}>
            {Array.from({ length: 5 }, (_, index) => (
              <Grid item xs={12} key={index}>
                <ItemSongListSkeleton key={index} />
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }
    return (
      <Box sx={{ width: "100%" }}>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: "20%", height: `50px`, marginBottom: "10px" }}
        />
        <ContainerWithoutScrollbar sx={{ gap: "10px" }}>
          {Array.from({ length: 10 }, (_, index) => (
            <ItemArtistAlbumListSkeleton isArtist={false} key={index} />
          ))}
        </ContainerWithoutScrollbar>
      </Box>
    );
  };
  const renderUI = () => {
    if (
      isEnglishTrackListError ||
      isHindiTrackListError ||
      isPunjabiTrackListError ||
      isRecentPlayedTrackListError ||
      isNewReleaseAlbumListError
    )
      return <FallbackError type="something_went_wrong" />;
    return (
      <>
        {renderRecentPlayedTrackList()}
        <Typography variant="h3" ml={"10px"}>
          Tranding Songs
        </Typography>
        <ContainerWithoutScrollbar
          sx={{ scrollSnapType: "x mandatory", paddingX: "10px" }}
          gap={"10px"}
        >
          {renderHindiTracks()}
          {renderPunjabiTracks()}
          {renderEnglishTracks()}
        </ContainerWithoutScrollbar>
        {renderNewReleaseAlbumsList()}
      </>
    );
  };
  return (
    <RootContainer style={{ padding: "10px 0", gap: "20px" }}>
      {renderUI()}
    </RootContainer>
  );
};

export default Home;

// const useStyle = makeStyles((_: Theme) => ({
//   mainContainer: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: "10px",
//     padding: "10px",
//   },
//   trendingContainer: {
//     flex: 1,
//     minWidth: "330px",
//     // backgroundColor: theme.palette.secondary.main,
//     borderRadius: "10px",
//     padding: "10px 5px",
//     // background: `linear-gradient(to top, rgba(12,11,26,0.95) 40%, rgba(12,11,26,0.6)  )`,
//     scrollSnapAlign: "start",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     position: "relative",
//     zIndex: 1,
//   },
//   trendingContainerBgImage: {
//     height: "100%",
//     width: "100%",
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: -1,
//     // opacity: 0.3,
//     background: `linear-gradient(to top, rgba(12,11,26,0.95) 30%, rgba(12,11,26,0.6)  )`,
//   },
// }));
