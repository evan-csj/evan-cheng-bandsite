let shows = document.getElementById('shows');
let headerDiv = document.createElement("div");
headerDiv.classList.add("shows__header")
shows.appendChild(headerDiv);
let showsHeader = document.createElement("h2");
showsHeader.innerText = "Shows";
headerDiv.appendChild(showsHeader);

let events = document.createElement("div");
events.classList.add("events");
shows.appendChild(events);

let currentEventsList = [
    {
        date: "",
        venue: "",
        location: "",
    },
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA",
    },
    {
        date: "Wed Dec 05 2021",
        venue: "Press Club",
        location: "San Francisco, CA",
    }
];

currentEventsList.forEach((item, index) => {
    let event = document.createElement("div");

    let dateDiv = document.createElement("div");
    let dateTag = document.createElement("p");
    let date = document.createElement("p");

    let venueDiv = document.createElement("div");
    let venueTag = document.createElement("p");
    let venue = document.createElement("p");

    let locationDiv = document.createElement("div");
    let locationTag = document.createElement("p");
    let location = document.createElement("p");

    dateTag.innerText = "Date";
    venueTag.innerText = "Venue";
    locationTag.innerText = "Location";

    date.innerText = item.date;
    venue.innerText = item.venue;
    location.innerText = item.location;

    event.classList.add("event");
    event.setAttribute("tabindex", "0")

    dateTag.classList.add("event__tag");
    venueTag.classList.add("event__tag");
    locationTag.classList.add("event__tag");

    date.classList.add("event__date");
    venue.classList.add("event__venue");
    location.classList.add("event__location");

    dateDiv.appendChild(dateTag);
    dateDiv.appendChild(date);
    event.appendChild(dateDiv);

    venueDiv.appendChild(venueTag);
    venueDiv.appendChild(venue);
    event.appendChild(venueDiv);

    locationDiv.appendChild(locationTag);
    locationDiv.appendChild(location);
    event.appendChild(locationDiv);

    if (index !== 0) {
        let button = document.createElement("button");
        button.classList.add("event__btn");
        button.innerText = "Buy Tickets";
        event.appendChild(button);
        events.appendChild(event);
    } else {
        let empty = document.createElement("p");
        empty.innerText = "";
        event.appendChild(empty);
        headerDiv.appendChild(event);
    }
});