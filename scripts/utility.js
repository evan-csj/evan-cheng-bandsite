let createStandardElement = (tag, className = null, text = null) => {
    let newElement = document.createElement(tag);
    if (className) newElement.classList.add(className);
    if (text) newElement.innerText = text;
    return newElement;
}

const apiKey = "edfb6ec1-aaae-4dc9-aede-51cec6039010";
let dataComments = axios
  .get(`https://project-1-api.herokuapp.com/comments?api_key=${apiKey}`)
  .then(response => {
    return response.data;
  });

let dataShows = axios
  .get(`https://project-1-api.herokuapp.com/showdates?api_key=${apiKey}`)
  .then(response => {
    console.log(response.data);
    return response.data;
  });