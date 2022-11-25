import { API_PATH, getData } from "./utils";

export const listLinks = async () => {
    return await getData(`http://localhost:7070/${API_PATH.LIST}`);
};