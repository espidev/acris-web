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
        isShuffled: false,
    },
    reducers: { // immer copies the state beforehand
        switchCollection: (state , action) => {
            state.collection = action.payload;

            state.queueIndex = 0;
            state.trackQueue = [];
            state.originalTrackQueue = [];
            state.playing = false;
            state.track = null;
            state.isShuffled = false;
        },
        changeTrack: (state, action) => {
            state.queueIndex = 0;
            state.trackQueue = action.payload.trackQueue;
            state.originalTrackQueue = action.payload.trackQueue;
            state.track = action.payload.track;
            state.playing = false;
            state.isShuffled = false;
        },
        shuffleQueue: state => {
            state.isShuffling = true;
            let curIndex = state.trackQueue.length - state.queueIndex, temp, randomIndex;

            while (0 !== curIndex) {
                randomIndex = Math.floor(Math.random() * curIndex);
                curIndex--;

                temp = state.trackQueue[curIndex + state.queueIndex];
                state.trackQueue[curIndex + state.queueIndex] = state.trackQueue[randomIndex + state.queueIndex];
                state.trackQueue[randomIndex + state.queueIndex] = temp;
            }
        },
        unshuffleQueue: state => {
            state.isShuffling = false;
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
            state.isShuffled = false;
        }
    },
});

export const { shuffleQueue, unshuffleQueue, nextTrack, prevTrack, stop, play, pause, changeTrack, switchCollection } = playerSlice.actions;

export default playerSlice.reducer;
