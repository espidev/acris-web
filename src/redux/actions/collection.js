import {listCollections} from "../../api/collection";

export async function getCollectionsList() {
    try {
        let collections = await listCollections()
        return collections.data;
    } catch (e) {
        console.log('Error fetching collections list: ' + e);
    }
    return [];
}

export async function getCollection(id) {
    try {
        let response = await getCollection(id);
        return response.data;
    } catch (e) {
        console.log('Error fetching collections list: ' + e);
    }
    return null;
}