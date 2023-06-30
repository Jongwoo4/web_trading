import { SERVER_URL } from "../env";
// A function to send a POST request with a new image
export const addImg = (form) => {
    return new Promise((resolve, reject) => {
    const url = SERVER_URL+"upload/image";

   var imageData = new FormData() 
   imageData.append('image',form)

    const request = new Request(url, {
        method: "post",
        body: imageData,
    });

    fetch(request)
        .then(data => data.json())
    .then(res => {
        resolve(res);
        })
        .catch(error => {
            reject(error);
        });
    })
};

export const deleteImg = (id) => {
    return new Promise((resolve, reject) => {
    const url = SERVER_URL+"upload/image/"+id;
        console.log(url)
    const request = new Request(url, {
        method: "delete",
    });

    fetch(request)
        .then(data => data.json())
    .then(res => {
        resolve(res);
        })
        .catch(error => {
            reject(error);
        });
    })
};
