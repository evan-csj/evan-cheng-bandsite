const commentsDiv = document.getElementById("comments");
const form = document.getElementById("form");
const formName = document.getElementById("form-name");
const formComment = document.getElementById("form-comment");
const nameErrorMsg = "Please enter valid name format: First-Name Last-Name";
const commentErrorMsg = "Please enter something";
const photoAddress = "../assets/images/Mohan-muruge.jpg";
let submitStatus = false;

let defaultComment = [
    {
        photo: false,
        name: "Conner Walton",
        date: dayjs("02/17/2021"),
        show: "",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        photo: false,
        name: "Emilie Beach",
        date: dayjs("01/09/2021"),
        show: "",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        photo: false,
        name: "Miles Acosta",
        date: dayjs("12/20/2020"),
        show: "",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

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
    for (let i = 0; i < defaultComment.length; i++) {
        let userCommentDiv = displayComment(defaultComment[i]);
        commentsDiv.appendChild(userCommentDiv);
    }
}

const dynamicDate = (now) => {
    for (let i = 0; i < defaultComment.length; i++) {
        let monthDiff = now.diff(defaultComment[i].date, "month", true);
        let dayDiff = now.diff(defaultComment[i].date, "day", true);
        let hrDiff = now.diff(defaultComment[i].date, "hour", true);
        let minDiff = now.diff(defaultComment[i].date, "minute", true);
        let secDiff = now.diff(defaultComment[i].date, "second", true);

        if (monthDiff >= 12.5) {
            defaultComment[i].show = defaultComment[i].date.format("MM/DD/YYYY");
        } else if (monthDiff >= 11.5) {
            defaultComment[i].show = "a year ago";
        } else if (monthDiff >= 1.5) {
            defaultComment[i].show = Math.round(monthDiff) + " months ago";
        } else if (dayDiff >= 29.5) {
            defaultComment[i].show = "a month ago";
        } else if (dayDiff >= 1.5) {
            defaultComment[i].show = Math.round(dayDiff) + " days ago";
        } else if (hrDiff >= 23.5) {
            defaultComment[i].show = "a day ago";
        } else if (hrDiff >= 1.5) {
            defaultComment[i].show = Math.round(hrDiff) + " hours ago";
        } else if (minDiff >= 59.5) {
            defaultComment[i].show = "a hour ago";
        } else if (minDiff >= 1.5) {
            defaultComment[i].show = Math.round(minDiff) + " minutes ago";
        } else if (secDiff >= 59.5) {
            defaultComment[i].show = "a minute ago";
        } else {
            defaultComment[i].show = Math.round(secDiff) + " seconds ago";
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

    let newComment = {
        photo: true,
        name: name,
        date: now,
        show: "",
        comment: comment
    };

    defaultComment.unshift(newComment);
    event.target.reset();
    dynamicDate(now);
    refreshComments();
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

dynamicDate(dayjs());
refreshComments();
form.addEventListener("keyup", formCheck);
form.addEventListener("submit", submitHandle);