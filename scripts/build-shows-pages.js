const shows = document.getElementById("shows");
const headerDiv = createStandardElement("div", "shows__header");
shows.appendChild(headerDiv);

const showsHeader = createStandardElement("h2", "", "Shows");
headerDiv.appendChild(showsHeader);

const events = createStandardElement("div", "events");
shows.appendChild(events);

const currentEventsList = [
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
    let event = createStandardElement("div", "event");
    event.setAttribute("tabindex", "0");

    let dateDiv = createStandardElement("div");
    let dateLabel = createStandardElement("label", "event__label", "Date");
    let date = createStandardElement("p", "event__date", item.date);

    let venueDiv = createStandardElement("div");
    let venueLabel = createStandardElement("label", "event__label", "Venue");
    let venue = createStandardElement("p", "event__venue", item.venue)

    let locationDiv = createStandardElement("div");
    let locationLabel = createStandardElement("label", "event__label", "Location")
    let location = createStandardElement("p", "event__location", item.location);

    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(date);
    event.appendChild(dateDiv);

    venueDiv.appendChild(venueLabel);
    venueDiv.appendChild(venue);
    event.appendChild(venueDiv);

    locationDiv.appendChild(locationLabel);
    locationDiv.appendChild(location);
    event.appendChild(locationDiv);

    if (index !== 0) {
        let button = createStandardElement("button", "event__btn", "Buy Tickets");
        event.appendChild(button);
        events.appendChild(event);
    } else {
        let empty = createStandardElement("p", "", "");
        event.appendChild(empty);
        headerDiv.appendChild(event);
    }
});