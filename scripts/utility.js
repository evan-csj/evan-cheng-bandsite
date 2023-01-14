let createStandardElement = (tag, className = null, text = null) => {
    let newElement = document.createElement(tag);
    if (className) newElement.classList.add(className);
    if (text) newElement.innerText = text;
    return newElement;
}

const apiKey = "327db850-6234-464e-b20c-47d9baf56cec";
let dataComments;
let getComments = () => {
    dataComments = axios
      .get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
      .then(response => {
          return response.data;
      });
}

let dataShows;
let getShows = () => {
    dataShows = axios
      .get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
      .then(response => {
          return response.data;
      });
}

let postComments = (name, comment) => {
    axios
      .post(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`,
          {
              "name": name,
              "comment": comment
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
      .then(response => {
          createComments();
      });
}

let deleteComments = (id) => {
  axios
    .delete(`https://project-1-api.herokuapp.com/comments/${id}?api_key=${apiKey}`)
    .then(response => {
        createComments();
    })
}