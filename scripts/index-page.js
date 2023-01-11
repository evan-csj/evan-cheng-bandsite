const commentsDiv = document.getElementById("comments");
const form = document.getElementById("form");
const formName = document.getElementById("form-name");
const formComment = document.getElementById("form-comment");
const nameErrorMsg = "Please enter valid name format: First-Name Last-Name";
const commentErrorMsg = "Please enter something";
const photoAddress = "../assets/images/Mohan-muruge.jpg";
let submitStatus = false;

const displayComment = function (userComment) {
    let comment = createStandardElement("article", "comment");
    let leftDiv = createStandardElement("div");
    let photo;
    if (!userComment.photo) {
        photo = createStandardElement("div", "comment__photo");
    } else {
        photo = createStandardElement("img", "comment__photo--user");
        photo.src = photoAddress;
        photo.alt="profile-photo";
    }

    leftDiv.appendChild(photo);
    comment.appendChild(leftDiv);

    let rightDiv = createStandardElement("div");
    let upperDiv = createStandardElement("div");
    let name = createStandardElement("p", "comment__name", userComment.name);
    let date = createStandardElement("p", "comment__date", userComment.show);
    upperDiv.appendChild(name);
    upperDiv.appendChild(date);

    let content = createStandardElement("p", "comment__content", userComment.comment);
    rightDiv.appendChild(upperDiv);
    rightDiv.appendChild(content);
    comment.appendChild(rightDiv);

    return comment;
}

const refreshComments = () => {
    commentsDiv.textContent = "";
    for (let i = 0; i < comments.length; i++) {
        let userCommentDiv = displayComment(comments[i]);
        commentsDiv.appendChild(userCommentDiv);
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
    let now = dayjs();

    event.target.reset();
    postComments(name, comment);
    dynamicDate(now);
    createComments();
}

const formCheck = (event) => {
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

let comments;
let createComments = async () => {
    comments = [];
    getComments();
    let jsonResponse = await dataComments;
    for (let i = 0; i < jsonResponse.length; i++) {
        let date = new Date(jsonResponse[i].timestamp);
        let newComment = {
            photo: false,
            name: jsonResponse[i].name,
            date: dayjs(date.toUTCString()),
            show: "",
            comment: jsonResponse[i].comment
        };
        comments.push(newComment);
    }
    dynamicDate(dayjs());
    refreshComments();
}
createComments();

form.addEventListener("keyup", formCheck);
form.addEventListener("submit", submitHandle);