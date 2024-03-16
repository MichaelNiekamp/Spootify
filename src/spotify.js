import axios from "axios";


const authEndpoint = "https://accounts.spotify.com/authorize?";
const redirectUri = "https://newtest-bdfb7.web.app/callback";

const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${process.env.REACT_APP_CLIENTID}&redirect_uri=https://newtest-bdfb7.web.app/callback&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function(config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export default apiClient;