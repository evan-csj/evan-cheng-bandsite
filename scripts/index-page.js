const commentsDiv = document.getElementById("comments");
const form = document.getElementById("form");
const photoAddress = "../assets/images/Mohan-muruge.jpg";

let date;
let today;
let time;

let defaultComment = [
    {
        photo: false,
        name: "Conner Walton",
        date: "02/17/2021",
        time: "",
        showDate: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        photo: false,
        name: "Emilie Beach",
        date: "01/09/2021",
        time: "",
        showDate: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        photo: false,
        name: "Miles Acosta",
        date: "12/20/2020",
        time: "",
        showDate: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

const getDate = () => {
    date = new Date();
    today = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    time = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

const displayComment = function (userComment) {
    let comment = document.createElement("article");
    comment.classList.add("comment");
    let leftDiv = document.createElement("div");
    let icon;
    if (!userComment.photo) {
        photo = document.createElement("div");
        photo.classList.add("comment__photo");
    } else {
        photo = document.createElement("img");
        photo.src = photoAddress;
        photo.alt="profile-photo";
        photo.classList.add("comment__photo--user");
    }

    leftDiv.appendChild(photo);
    comment.appendChild(leftDiv);

    let rightDiv = document.createElement("div");
    let upperDiv = document.createElement("div");
    let name = document.createElement("p");
    name.classList.add("comment__name");
    name.innerText = userComment.name;
    let date = document.createElement("p");
    date.classList.add("comment__date");
    date.innerText = userComment.showDate;
    upperDiv.appendChild(name);
    upperDiv.appendChild(date);

    let content = document.createElement("p");
    content.classList.add("comment__content");
    content.innerText = userComment.comment;
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

const dynamicDate = () => {
    for (let i = 0; i < defaultComment.length; i++) {
        if (defaultComment[i].date === today) {
            let secDiff = time - defaultComment[i].time;
            let hrDiff = parseInt(secDiff / 3600);
            let minDiff = parseInt(secDiff / 60);

            if (hrDiff >= 1) {
                defaultComment[i].showDate = hrDiff + " hours ago";
            } else if (minDiff >= 1) {
                defaultComment[i].showDate = minDiff + " minutes ago";
            } else {
                defaultComment[i].showDate = secDiff + " seconds ago";
            }
        } else {
            defaultComment[i].showDate = defaultComment[i].date;
        }
    }
}

const submitHandle = (event) => {
    event.preventDefault();
    getDate();

    const formData = new FormData(form);

    let newComment = {
        photo: true,
        name: formData.get("name"),
        date: today,
        time: time,
        showDate: "",
        comment: formData.get("comment")
    };

    defaultComment.unshift(newComment);
    event.target.reset();
    dynamicDate();
    refreshComments(commentsDiv);
}

refreshComments();
form.addEventListener("submit", submitHandle);