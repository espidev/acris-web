import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        collection: null,

        queueIndex: 0,
        trackQueue: [],
        originalTrackQueue: [],
        track: null,
        playing: false,
    },
    reducers: { // immer copies the state beforehand
        switchCollection: (state , action) => {
            state.collection = action.payload;

            state.queueIndex = 0;
            state.trackQueue = [];
            state.originalTrackQueue = [];
            state.playing = false;
            state.track = null;
        },
        changeTrack: (state, action) => {
            state.queueIndex = 0;
            state.trackQueue = action.payload.trackQueue;
            state.originalTrackQueue = action.payload.trackQueue;
            state.track = action.payload.track;
            state.playing = false;
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
        unshuffleQueue: state => {
            state.queue = state.originalTrackQueue;
        },
        play: state => {
            if (state.track !== null) {
                state.playing = true;
            }
        },
        pause: state => {
            state.playing = false;
        },
        prevTrack: state => {
            if (state.queueIndex > 0) {
                state.queueIndex--;
                state.track = state.trackQueue[state.queueIndex];
            }
        },
        nextTrack: state => {
            if (state.queueIndex < state.trackQueue.length-1) {
                state.queueIndex++;
                state.track = state.trackQueue[state.queueIndex];
            }
        },
        stop: state => {
            state.queueIndex = 0;
            state.trackQueue = [];
            state.originalTrackQueue = [];
            state.track = null;
            state.playing = false;
        }
    },
});

export const { play, pause, changeTrack, switchCollection } = playerSlice.actions;

export default playerSlice.reducer;
