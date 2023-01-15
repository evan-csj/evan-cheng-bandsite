const commentsDiv = document.getElementById("comments");
const form = document.getElementById("form");
const formName = document.getElementById("form-name");
const formComment = document.getElementById("form-comment");
const nameErrorMsg = "Please enter valid name format: First-Name Last-Name";
const commentErrorMsg = "Please enter something";
const photoAddress = "../assets/images/Mohan-muruge.jpg";
const likeAddress = "../assets/icons/icon-like.svg";
const deleteAddress = "../assets/icons/icon-delete.svg";

let submitStatus = false;
let comments;

const refreshComments = () => {
    commentsDiv.textContent = "";
    for (let i = 0; i < comments.length; i++) {
        let comment = createStandardElement("article", "comment");
        comment.setAttribute("id", comments[i].id);

        let leftDiv = createStandardElement("div");
        let photo;
        if (!comments[i].photo) {
            photo = createStandardElement("div", "comment__photo");
        } else {
            photo = createStandardElement("img", "comment__photo--user");
            photo.src = photoAddress;
            photo.alt = "profile-photo";
        }
        leftDiv.appendChild(photo);

        let rightDiv = createStandardElement("div");
        let upperDiv = createStandardElement("div");
        let lowerDiv = createStandardElement("div");

        let name = createStandardElement("p", "comment__name", comments[i].name);
        let date = createStandardElement("p", "comment__date", comments[i].show);
        upperDiv.appendChild(name);
        upperDiv.appendChild(date);

        let content = createStandardElement("p", "comment__content", comments[i].comment);
        rightDiv.appendChild(upperDiv);
        rightDiv.appendChild(content);

        let likeIcon = createStandardElement("img", "comment__like");
        likeIcon.src = likeAddress;
        likeIcon.alt = "like icon";

        let likeNumber = createStandardElement("span", "comment__like-number", comments[i].likes.toString());

        let deleteIcon = createStandardElement("img", "commnet__delete");
        deleteIcon.src = deleteAddress;
        deleteIcon.alt = "delete icon";

        lowerDiv.appendChild(likeIcon);
        lowerDiv.appendChild(likeNumber);
        lowerDiv.appendChild(deleteIcon);

        if (i < comments.length - 3) {
            rightDiv.appendChild(lowerDiv);
        }

        deleteIcon.addEventListener("click", () => {
            deleteComments(comment.id);
        });

        likeIcon.addEventListener("click", () => {
            likeComments(comment.id);
        });

        comment.appendChild(leftDiv);
        comment.appendChild(rightDiv);
        commentsDiv.appendChild(comment);
    }
}

const dynamicDate = (now) => {
    for (let i = 0; i < comments.length; i++) {
        let monthDiff = now.diff(comments[i].date, "month", true);
        let dayDiff = now.diff(comments[i].date, "day", true);
        let hrDiff = now.diff(comments[i].date, "hour", true);
        let minDiff = now.diff(comments[i].date, "minute", true);
        let secDiff = now.diff(comments[i].date, "second", true);

        if (monthDiff >= 12.5) {
            comments[i].show = comments[i].date.format("MM/DD/YYYY");
        } else if (monthDiff >= 11.5) {
            comments[i].show = "a year ago";
        } else if (monthDiff >= 1.5) {
            comments[i].show = Math.round(monthDiff) + " months ago";
        } else if (dayDiff >= 29.5) {
            comments[i].show = "a month ago";
        } else if (dayDiff >= 1.5) {
            comments[i].show = Math.round(dayDiff) + " days ago";
        } else if (hrDiff >= 23.5) {
            comments[i].show = "a day ago";
        } else if (hrDiff >= 1.5) {
            comments[i].show = Math.round(hrDiff) + " hours ago";
        } else if (minDiff >= 59.5) {
            comments[i].show = "a hour ago";
        } else if (minDiff >= 1.5) {
            comments[i].show = Math.round(minDiff) + " minutes ago";
        } else if (secDiff >= 59.5) {
            comments[i].show = "a minute ago";
        } else {
            comments[i].show = Math.round(secDiff) + " seconds ago";
        }
    }
}

const submitHandle = (event) => {
    event.preventDefault();
    if (!submitStatus) return;

    const formData = new FormData(form);
    let name = formData.get("name");
    let comment = formData.get("comment");

    event.target.reset();
    postComments(name, comment);
    dynamicDate(dayjs());
}

const formCheck = () => {
    const formData = new FormData(form);
    let name = formData.get("name");
    let comment = formData.get("comment");
    let patternName = new RegExp("^[A-Z]([a-z]*)((\\s|\-)[A-Z]([a-z]*))+\\s*$");
    let patternComment = new RegExp("^\\s+$");

    if (patternName.test(name)) {
        formName.classList.remove("error");
        formName.classList.add("no-error");
        formName.setCustomValidity("");
    } else {
        formName.classList.remove("no-error");
        formName.classList.add("error");
        formName.setCustomValidity(nameErrorMsg);
    }

    if (!patternComment.test(comment)) {
        formComment.classList.remove("error");
        formComment.classList.add("no-error");
        formComment.setCustomValidity("");
    } else {
        formComment.classList.remove("no-error");
        formComment.classList.add("error");
        formComment.setCustomValidity(commentErrorMsg);
    }

    if (patternName.test(name) && !patternComment.test(comment)) {
        submitStatus = true;
    } else {
        submitStatus = false;
    }
}

let updateDelete = (id) => {
    for (let i = 0; i < comments.length; i++) {
        if (id === comments[i].id) {
            comments.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < commentsDiv.childElementCount; i++) {
        if (commentsDiv.childNodes[i].id === id) {
            commentsDiv.removeChild(commentsDiv.childNodes[i]);
            break;
        }
    }
}

let updateLikes = (id, likes) => {
    for (let i = 0; i < comments.length; i++) {
        if (id === comments[i].id) {
            comments[i].likes = likes;
            break;
        }
    }

    for (let i = 0; i < commentsDiv.childElementCount; i++) {
        if (commentsDiv.childNodes[i].id === id) {
            commentsDiv.childNodes[i].lastChild.lastChild.childNodes[1].innerText = likes;
        }
    }
}

let createComments = async () => {
    comments = [];
    getComments();
    let jsonResponse = await dataComments;
    for (let i = 0; i < jsonResponse.length; i++) {
        let date = new Date(jsonResponse[i].timestamp);
        let newComment = {
            photo: i < 3? false : true,
            name: jsonResponse[i].name,
            date: dayjs(date),
            show: "",
            comment: jsonResponse[i].comment,
            id: jsonResponse[i].id,
            likes: jsonResponse[i].likes
        };

        if (i < 3) {
            comments.push(newComment);
        } else {
            comments.unshift(newComment);
        }
    }

    dynamicDate(dayjs());
    refreshComments();
}

createComments();

form.addEventListener("keyup", formCheck);
form.addEventListener("submit", submitHandle);