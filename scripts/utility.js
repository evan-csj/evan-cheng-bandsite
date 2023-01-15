let createStandardElement = (tag, className = null, text = null) => {
    let newElement = document.createElement(tag);
    if (className) newElement.classList.add(className);
    if (text) newElement.innerText = text;
    return newElement;
};

const apiKey = "10b30624-4a7f-453b-9b33-232afbbfb9a5";
let dataComments;
let getComments = () => {
    dataComments = axios
        .get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        });
};

let dataShows;
let getShows = () => {
    dataShows = axios
        .get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
        .then((response) => {
            return response.data;
        });
};

let postComments = (name, comment) => {
    axios
        .post(
            `https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`,
            {
                name: name,
                comment: comment,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(() => {
            createComments();
        });
};

let deleteComments = (id) => {
    axios
        .delete(`https://project-1-api.herokuapp.com/comments/${id}?api_key=${apiKey}`)
        .then(() => {
            createComments();
        });
};

let likeComments = (id) => {
    axios
        .put(`https://project-1-api.herokuapp.com/comments/${id}/like?api_key=${apiKey}`)
        .then(() => {

        })
}