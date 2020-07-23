import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        trackId: 0,
        playing: false,
    },
    reducers: {
        play: state => {
            state.playing = true;
        },
        pause: state => {
            state.playing = false;
        },
        changeTrack: (state, action) => {
            state.trackId = action.payload;
        },
    },
});

export const { play, pause, changeTrack } = playerSlice.actions;

export default playerSlice.reducer;
