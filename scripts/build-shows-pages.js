const shows = document.getElementById("shows");
const headerDiv = createStandardElement("div", "shows__header");
shows.appendChild(headerDiv);

const showsHeader = createStandardElement("h2", "", "Shows");
headerDiv.appendChild(showsHeader);

const events = createStandardElement("div", "events");
shows.appendChild(events);

let showEvents = (eventList) => {
    eventList.forEach((item, index) => {
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
};

const options = {
    weekday: "short", 
    year: "numeric", 
    month: "short", 
    day: "2-digit", 
    timeZone: 'UTC'
};

let currentEvents = [
    {
        date: "",
        venue: "",
        location: "",
    }
];

let createEventList = async () => {
    getShows();
    let jsonResponse = await dataShows;
    for (let i = 0; i < jsonResponse.length; i++) {
        let date = new Date(jsonResponse[i].date);
        let newEvent = {
            date: date.toLocaleDateString("en-US", options).replaceAll(",", ""),
            venue: jsonResponse[i].place,
            location: jsonResponse[i].location
        };
        currentEvents.push(newEvent);
    }

    showEvents(currentEvents);
}

createEventList();