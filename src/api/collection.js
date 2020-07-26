import axiosAPI, {baseURL} from './axiosApi';
import axios from 'axios';

export async function listCollections() {
    return await axiosAPI.get('collections');
}

export async function getCollection(id) {
    return await axiosAPI.get('collection/' + id);
}

export async function createCollection(name, userId, isPublic) {
    return await axiosAPI.post('collections/', {
        name: name,
        owners: [userId],
        viewers: [],
        is_public: isPublic,
    });
}

export async function getTracks(collectionId) {
    return await axiosAPI.get('collection/' + collectionId + '/tracks/');
}

export function uploadToCollection(collectionId, formData, fileName) {
    return axiosAPI.put(baseURL + 'collection/' + collectionId + '/upload/', formData, {headers: {
        'Content-Type': 'multipart/form-data',
        'Content-Disposition': 'attachment; filename=' + encodeURI(fileName),
    }});
}
