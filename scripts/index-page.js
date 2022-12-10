const defaultComment = [
    {
        icon: "",
        name: "Conner Walton",
        date: "02/17/2021",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },
    {
        icon: "",
        name: "Emilie Beach",
        date: "01/09/2021",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },
    {
        icon: "",
        name: "Miles Acosta",
        date: "12/20/2020",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];

let displayComment = function (userComment) {
    let comment = document.createElement("div");
    comment.classList.add("comment");
    let leftDiv = document.createElement("div");
    let icon;
    if (userComment.icon === "") {
        icon = document.createElement("div");
        icon.classList.add("comment__icon");
    }
    leftDiv.appendChild(icon);
    comment.appendChild(leftDiv);

    let rightDiv = document.createElement("div");
    let upperDiv = document.createElement("div");
    let name = document.createElement("p");
    name.classList.add("comment__name");
    name.innerText = userComment.name;
    let date = document.createElement("p");
    date.classList.add("comment__date");
    date.innerText = userComment.date;
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

const conversation = document.getElementById("conversation");
const headerDiv = document.createElement("h2");
headerDiv.classList.add("conversation__header");
headerDiv.innerText = "Join the Conversation";
const formDiv = document.createElement("div");
formDiv.classList.add("conversation__form");
const commentsDiv = document.createElement("div");
commentsDiv.classList.add("conversation__comments");
conversation.appendChild(headerDiv);
// conversation.appendChild(formDiv);
conversation.appendChild(commentsDiv);

for (let i = 0; i < defaultComment.length; i++) {
    let userComment = displayComment(defaultComment[i]);
    commentsDiv.appendChild(userComment);
}