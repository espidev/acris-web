import axiosAPI from './axiosApi';

export async function listCollections() {
    return await axiosAPI.get('collections');
}

export async function createCollection(name, user_id, is_public) {
    return await axiosAPI.post('collections', {
        name: name,
        owners: [user_id],
        viewers: [],
        is_public: is_public,
    });
}

