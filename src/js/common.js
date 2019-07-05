import { get } from "https";


const getMembers = (number) => {
    return new Promise((resolve, reject) =>{
        const api = `https://api.randomuser.me/?nat=US&results=${number}`;
        const xhr = new XMLHttpRequest();

        xhr.open('GET', api);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response).results);
            } else {
                reject(Error(xhr.statusText));
            }
        }
        xhr.onerror = (error) => rejects(error);
        xhr.send();

    });
}

getMembers(10)
    .then(users => {
        console.info(`Success, all users downloaded!`);
        console.log(users);
    })
    .catch(error => console.error(error));
    