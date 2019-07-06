import { get } from "https";

const input = document.getElementById('request-input');
const submit = document.getElementById('request-button');
const wrap = document.getElementById('app');


submit.onclick = () => {

    clearWrap(wrap);

    let number = input.value;

    getMembers(number)
    .then(users => {
        console.info(`Success, all users downloaded!`);
        console.log(users);
        return users;
    })
    .then(displayUsers)
    .catch(error => console.error(error))

}

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

const displayUsers = (users) => {

    let numberOfusers = users.length;
    const counterLayer = document.getElementById('counter');
    counterLayer.innerHTML = `Donwloaded ${numberOfusers} ${numberOfusers <= 1 ? 'user' : 'users'}`;

    for (let user of users) {
        const p = document.createElement('p')
        const img = document.createElement('img')
        const container = document.createElement('div');
        container.className = `user`;

        img.src = user.picture.large;
        img.title = user.name.first;
        p.innerHTML = user.name.first;

        container.appendChild(img);
        container.appendChild(p);

        wrap.appendChild(container)
    }
}


const clearWrap = (camp) => {
    while (camp.firstChild) {
        camp.removeChild(camp.firstChild);
    }
}

    