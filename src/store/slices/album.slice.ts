import { IAlbumSlice } from "@/schemas/album.schema";
import { createSlice } from "@reduxjs/toolkit";
import { getRandomColor } from "@utils/genaralFunctions";
import {
  getAlbumById,
  getAlbumTracks,
  getNewReleaseAlbums,
  getSavedAlbums,
  saveUnsaveAlbum,
} from "../thunkServices/album.thunksevices";

const intialState: IAlbumSlice = {
  bgColor: "#9759a8",
  isAlbumDataLoading: false,
  isAlbumDataError: false,
  albumData: null,
  isTrackListError: false,
  isTrackListLoading: false,
  trackList: [],
  hasMoreTrackList: true,
  trackListOffset: 0,

  isNewReleaseAlbumListError: false,
  isNewReleaseAlbumListLoading: false,
  newReleaseAlbumList: [],
  hasMoreNewReleaseAlbumList: true,
  newReleaseAlbumListOffset: 0,

  isSavedAlbumListError: false,
  isSavedAlbumListLoading: false,
  savedAlbumList: [],
  hasMoreSavedAlbumList: true,
  savedAlbumListOffset: 0,

  isSaveUnsaveAlbumLoading: false,
};

export const albumSlice = createSlice({
  name: "album",
  initialState: intialState,
  reducers: {
    resetAlbumState: (state) => {
      state.bgColor = "#9759a8";
      state.isAlbumDataLoading = false;
      state.isAlbumDataError = false;
      state.albumData = null;
      state.isTrackListError = false;
      state.isTrackListLoading = false;
      state.trackList = [];
      state.hasMoreTrackList = true;
      state.trackListOffset = 0;
      state.isNewReleaseAlbumListError = false;
      state.isNewReleaseAlbumListLoading = false;
      state.newReleaseAlbumList = [];
      state.hasMoreNewReleaseAlbumList = true;
      state.newReleaseAlbumListOffset = 0;

      state.isSavedAlbumListLoading = false;
      state.isSavedAlbumListError = false;
      state.savedAlbumList = [];
      state.hasMoreSavedAlbumList = true;
      state.savedAlbumListOffset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumById.pending, (state) => {
        state.isAlbumDataLoading = true;
      })
      .addCase(getAlbumById.fulfilled, (state, action) => {
        state.isAlbumDataLoading = false;
        state.bgColor = getRandomColor();
        state.albumData = action.payload;
      })
      .addCase(getAlbumById.rejected, (state) => {
        state.isAlbumDataLoading = false;
        state.isAlbumDataError = true;
      })
      .addCase(getAlbumTracks.pending, (state) => {
        state.isTrackListLoading = true;
      })
      .addCase(getAlbumTracks.fulfilled, (state, action) => {
        let offset = action.payload?.offset ?? 0;
        let limit = action.payload?.limit ?? 0;
        let total = action.payload?.total ?? 0;

        state.isTrackListLoading = false;
        state.trackListOffset = offset + limit;
        state.hasMoreTrackList = total > offset + limit;

        if (offset == 0) {
          state.trackList = [...(action.payload?.items ?? [])];
        } else {
          state.trackList = [
            ...state.trackList,
            ...(action.payload?.items ?? []),
          ];
        }
        if (offset >= 80) {
          state.hasMoreTrackList = false;
        }
      })
      .addCase(getAlbumTracks.rejected, (state) => {
        state.isTrackListLoading = false;
        state.isTrackListError = true;
      })
      .addCase(getNewReleaseAlbums.pending, (state) => {
        state.isNewReleaseAlbumListLoading = true;
      })
      .addCase(getNewReleaseAlbums.fulfilled, (state, action) => {
        let offset = action.payload?.albums?.offset ?? 0;
        let limit = action.payload?.albums?.limit ?? 0;
        let total = action.payload?.albums?.total ?? 0;

        state.isNewReleaseAlbumListLoading = false;
        state.newReleaseAlbumListOffset = offset + limit;
        state.hasMoreNewReleaseAlbumList = total > offset + limit;

        if (offset == 0) {
          state.newReleaseAlbumList = [
            ...(action.payload?.albums?.items ?? []),
          ];
        } else {
          state.newReleaseAlbumList = [
            ...state.newReleaseAlbumList,
            ...(action.payload?.albums?.items ?? []),
          ];
        }
        if (offset >= 80) {
          state.hasMoreNewReleaseAlbumList = false;
        }
      })
      .addCase(getNewReleaseAlbums.rejected, (state) => {
        state.isNewReleaseAlbumListLoading = false;
        state.isNewReleaseAlbumListError = true;
      })
      .addCase(saveUnsaveAlbum.pending, (state) => {
        state.isSaveUnsaveAlbumLoading = true;
      })
      .addCase(saveUnsaveAlbum.fulfilled, (state, action) => {
        state.isSaveUnsaveAlbumLoading = false;
        state.albumData && (state.albumData.isSaved = action.payload);
      })
      .addCase(saveUnsaveAlbum.rejected, (state) => {
        state.isSaveUnsaveAlbumLoading = false;
      })
      .addCase(getSavedAlbums.pending, (state) => {
        state.isSavedAlbumListLoading = true;
      })
      .addCase(getSavedAlbums.fulfilled, (state, action) => {
        let offset = action.payload?.offset ?? 0;
        let limit = action.payload?.limit ?? 0;
        let total = action.payload?.total ?? 0;

        state.isSavedAlbumListLoading = false;
        state.savedAlbumListOffset = offset + limit;
        state.hasMoreSavedAlbumList = total > offset + limit;

        if (offset == 0) {
          state.savedAlbumList = [...(action.payload?.items ?? [])];
        } else {
          state.savedAlbumList = [
            ...state.savedAlbumList,
            ...(action.payload?.items ?? []),
          ];
        }
        if (offset >= 80) {
          state.hasMoreSavedAlbumList = false;
        }
      })
      .addCase(getSavedAlbums.rejected, (state) => {
        state.isSavedAlbumListLoading = false;
        state.isSavedAlbumListError = true;
      });
  },
});

export const { resetAlbumState } = albumSlice.actions;

export default albumSlice.reducer;
