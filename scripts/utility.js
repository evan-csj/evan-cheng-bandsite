let createStandardElement = (tag, className = null, text = null) => {
    let newElement = document.createElement(tag);
    if (className) newElement.classList.add(className);
    if (text) newElement.innerText = text;
    return newElement;
};

const apiKey = "10b30624-4a7f-453b-9b33-232afbbfb9a5";
const apiAddress = "https://project-1-api.herokuapp.com";
let dataComments;
let getComments = () => {
    dataComments = axios
        .get(`${apiAddress}/comments?api_key=${apiKey}`)
        .then((response) => {
            return response.data;
        });
};

let dataShows;
let getShows = () => {
    dataShows = axios
        .get(`${apiAddress}/showdates?api_key=${apiKey}`)
        .then((response) => {
            return response.data;
        });
};

let postComments = (name, comment) => {
    axios
        .post(
            `${apiAddress}/comments?api_key=${apiKey}`,
            {
                name: name,
                comment: comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        .then(() => {
            createComments();
        });
};

let deleteComments = (id) => {
    axios
        .delete(`${apiAddress}/comments/${id}?api_key=${apiKey}`)
        .then(() => {
            updateDelete(id);
        });
};

let likeComments = (id) => {
    axios
        .put(`${apiAddress}/comments/${id}/like?api_key=${apiKey}`)
        .then((response) => {
            updateLikes(id, response.data.likes);
        })
}