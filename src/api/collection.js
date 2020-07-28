import axiosAPI, {baseURL} from './axiosApi';

export async function listCollections() {
    return await axiosAPI.get('collections');
}

export async function getCollection(id) {
    return await axiosAPI.get('collection/' + id);
}

export function createCollection(name, userId, isPublic) {
    return axiosAPI.post('collections/', {
        name: name,
        owners: [''+userId],
        viewers: [],
        is_public: isPublic,
    });
}

export async function getTracks(collectionId) {
    return await axiosAPI.get('collection/' + collectionId + '/tracks/');
}

export function getArtists(collectionId) {
    return axiosAPI.get('collection/' + collectionId + '/artists/');
}

export function deleteTrack(trackId) {
    return axiosAPI.delete('track/' + trackId + '/');
}

export function uploadToCollection(collectionId, formData, fileName) {
    return axiosAPI.request({
        method: 'put',
        url: baseURL + 'collection/' + collectionId + '/upload/',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Disposition': 'attachment; filename=' + encodeURI(fileName),
        }
    });
}
