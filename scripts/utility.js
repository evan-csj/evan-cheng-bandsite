const errorMsg = "THERE IS AN ERROR!";
const error400 = "ERROR400: NAME AND COMMENT ARE NOT FOUND!";
const error404 = "ERROR404: ID IS NOT FOUND!";

let createStandardElement = (tag, className = null, text = null) => {
    let newElement = document.createElement(tag);
    if (className) newElement.classList.add(className);
    if (text) newElement.innerText = text;
    return newElement;
};

Date.prototype.diff = function (timestamp, mode) {
    let diff = this.getTime() - timestamp;
    diff = diff / 1000;
    if (mode === "second") return diff;
    diff = diff / 60;
    if (mode === "minute") return diff;
    diff = diff / 60;
    if (mode === "hour") return diff;
    diff = diff / 24;
    if (mode === "day") return diff;
    diff = diff / 30;
    if (mode === "month") return diff;
}

const apiKey = "43358e48-60c0-4d66-87de-29bf1cf77e7b";
const apiAddress = "https://project-1-api.herokuapp.com";
let dataComments;
let getComments = () => {
    dataComments = axios
        .get(`${apiAddress}/comments?api_key=${apiKey}`)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(errorMsg);
        });
};

let dataShows;
let getShows = () => {
    dataShows = axios
        .get(`${apiAddress}/showdates?api_key=${apiKey}`)
        .then((response) => {
            return response.data;
        })
        .catch(error => {
            console.log(errorMsg);
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
        .then(response => {
            if (response.data.name === "" || response.data.comment === "") {
                throw new Error();
            } else {
                createComments();
            }
        })
        .catch(error => {
            console.log(error400);
        });
};

let deleteComments = (id) => {
    axios
        .delete(`${apiAddress}/comments/${id}?api_key=${apiKey}`)
        .then(() => {
            updateDelete(id);
        })
        .catch(error => {
            console.log(error404);
        });
};

let likeComments = (id) => {
    axios
        .put(`${apiAddress}/comments/${id}/like?api_key=${apiKey}`)
        .then((response) => {
            updateLikes(id, response.data.likes);
        })
        .catch(error => {
            console.log(error404);
        });
}