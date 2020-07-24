import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        collection: null,
        trackQueue: [],

        track: null,
        playing: false,
    },
    reducers: { // immer copies the state beforehand
        switchCollection: (state , action) => {
            state.collection = action.payload;
            state.queue = [];
            state.playing = false;
            state.track = null;
        },
        changeTrack: (state, action) => {
            state.track = action.payload.track;
            state.trackQueue = action.payload.trackQueue;
        },
        shuffleQueue: state => {
            let curIndex = state.trackQueue.length, temp, randomIndex;

            while (0 !== curIndex) {
                randomIndex = Math.floor(Math.random() * curIndex);
                curIndex--;

                temp = state.trackQueue[curIndex];
                state.trackQueue[curIndex] = state.trackQueue[randomIndex];
                state.trackQueue[randomIndex] = temp;
            }
        },
        play: state => {
            state.playing = true;
        },
        pause: state => {
            state.playing = false;
        },
    },
});

export const { play, pause, changeTrack, switchCollection } = playerSlice.actions;

export default playerSlice.reducer;
