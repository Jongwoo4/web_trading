var url = window.location.origin + "/api/"

if(url.includes("localhost") || url.includes("127.0.0.1")){
    url = "http://localhost:3001/api/"
}

export const SERVER_URL = url;
