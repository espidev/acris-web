import React from "react";
import {baseURL} from "./axiosApi";

export default function parseTrack(track, thumbnailClass) {
    if (track === null) {
        return {
            thumbnail: <React.Fragment/>,
            name: '',
            artist: '',
            album: '',
            year: '',
            length: '',
        }
    }

    let thumbnail = track.thumbnail_src === null ?
                <img className={thumbnailClass} alt="Track Image" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9e4066b1-0e52-42c5-8b03-c80b53dc64c8/de1tjzh-713cea00-f11f-400c-92cc-c3f4ea8527b9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvOWU0MDY2YjEtMGU1Mi00MmM1LThiMDMtYzgwYjUzZGM2NGM4XC9kZTF0anpoLTcxM2NlYTAwLWYxMWYtNDAwYy05MmNjLWMzZjRlYTg1MjdiOS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.vk2UoBUZZbyZ2aTSlwsvAMVemoWWgfMmiNvDJcQyqJo"/>
        : <img className={thumbnailClass} alt="Track Image" src={baseURL.substring(0, baseURL.length-5) + track.thumbnail_src}/>,
        name = track.name === '' ? decodeURIComponent(track.file_name) : decodeURIComponent(track.name),
        artist = '',
        album = track.album == null ? '' : track.album.name,
        year = track.year == null ? '' : track.year,
        genre = '',
        length = track.length == null ? '' : track.length.split('.')[0];

    for (let i = 0; i < track.artists.length; i++) {
        if (i === 0) artist += track.artists[i].name;
        else artist += ' & ' + track.artists[i].name;
    }
    for (let i = 0; i < track.genres.length; i++) {
        if (i === 0) genre += track.genres[i].name;
        else genre += ', ' + track.genres[i].name;
    }

    return {
        thumbnail: thumbnail,
        name: name,
        artist: artist,
        album: album,
        year: year,
        genre: genre,
        length: length,
    };
}