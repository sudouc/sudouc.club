var DateTime = luxon.DateTime; // Why does JS dates suck sooo much

function setPosterNextEvent(ne) {
    // let ne = events.next_event.formatted;
    let setAttr = (attr, content) => document.querySelectorAll(attr)[0].innerHTML = content;
    setAttr('.poster_title', ne.title);
    setAttr('.poster_tagline', ne.description);
    let location = ne.location != "" ? ` @ ${ne.location}` : "";
    setAttr('.poster_when', `${ne.start_date}${location}`);
    document.querySelectorAll('.poster_more')[0].href = ne.link;
    setAttr('.poster_more', 'Learn More');
};

// Parses input event json, sorts and returns events
function getEvents() {
    return new Promise((resolve, reject) => {
        fetch('/data/events.json')
            .then(res => res.json())
            .then(data => {
                let ret = {
                    "upcomming_events": [],
                    "past_events": [],
                    "next_event": {}
                };
                const NOW = DateTime.now();

                let nullOrTime = (t) => t == null ? null : DateTime.fromRFC2822(t)
                let generateTagline = (event) => {
                    return null
                };
                let humanReadableTime = (t) => {
                    return t == null ? null : t.toFormat(`EEEE MMMM d${NOW.year == t.year ? '' : ' yyyy'}, hh:mma`);
                };

                for (let event of data.events) {
                    let startDate = nullOrTime(event.start_date);
                    let endDate = nullOrTime(event.end_date) ?? (startDate == null ? null : startDate.plus({ hours: 2 }));

                    // process
                    event.location = event.location ?? "TBD";
                    event.link = event.link ?? "#";
                    event.showcase = event.showcase ?? false;

                    let formattedEvent = {
                        "start_date": humanReadableTime(startDate) ?? "Coming soon...", // @todo human format start date
                        "end_date": humanReadableTime(endDate) ?? "UNK",
                        "title": event.title ?? "",
                        "description": event.description ?? "",
                        "location": event.location ?? "",
                        "tagline": event.tagline ?? generateTagline(event),
                        "tag_name": event.tag_name ?? "Event",
                        "tag_color": event.tag_color ?? "yellow",
                        "link": event.link ?? "#"
                    };

                    event = {
                        "formatted": formattedEvent,
                        "raw": event
                    };

                    event.raw['start_date_millis'] = startDate == null ? null : startDate.toMillis();
                    event.raw['end_date_millis'] = endDate == null ? null : endDate.toMillis();

                    // Upcomming event (or one that is currently happening)
                    if (NOW.toMillis() <= event.raw.end_date_millis || event.raw.start_date_millis == null) {
                        ret.upcomming_events.push(event);
                    }
                    else {
                        ret.past_events.push(event);
                    }
                }

                // Sort
                let sortFunc = (a, b, flip) => {
                    const FAR_AWAY = DateTime.fromMillis(Number.MAX_SAFE_INTEGER);
                    let ca = a.raw.start_date_millis ?? FAR_AWAY;
                    let cb = b.raw.start_date_millis ?? FAR_AWAY;

                    return flip ? ca - cb : cb - ca;
                };

                ret.past_events.sort((a, b) => sortFunc(a, b, false));
                ret.upcomming_events.sort((a, b) => sortFunc(a, b, true));

                // Get next/ current event that isn't a showcase event (i.e. hidden from banner)
                // ret.next_event = ret.upcomming_events[0] ?? null;
                ret.next_event = getNextActualEvent(ret.upcomming_events);

                resolve(ret);
            })
            .catch(err => {
                console.error(err);
                reject({
                    "success": false,
                    "data": {
                        "message": "Woops. Something went wrong loading events. Check back again later",
                        "error": err
                    }
                })
            })
            ;
    });
}

// Get the next non-showcase event
function getNextActualEvent(events) {
    let nextEvent = null;
    for(let _event of events) {
        if(! _event.raw.showcase) {
            nextEvent = _event;
            break;
        }
    }

    return nextEvent;
}

// let returnSchema = {
//     "upcomming_events": [
//         { event... }
//     ],
//     "past_events": [
//         { event... }
//     ],
//     "next_event": {
//         event
//     }
// }