

const input = document.getElementById('request-input');
const submit = document.getElementById('request-button');
const wrap = document.getElementById('app');


submit.onclick = () => {

    clearWrap(wrap);

    let number = input.value;

    getUsers(number)
        .then(users => {
            console.info(`Success, all users downloaded!`);
            console.log(users);
            return users;
        })
        .then(displayUsers)
        .catch(error => console.error(error))

}

const getUsers = async (number) => {
    const response =  await fetch(`https://api.randomuser.me/?nat=US&results=${number}`)
    const data = await response.json()
    return data.results;

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

    