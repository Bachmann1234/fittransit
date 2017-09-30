const fetch = require("node-fetch");

const MBTA_API_URL = "http://realtime.mbta.com/developer/api/v2/";

function combineObjectWithArrayProperties(o1, o2) {
    Object.keys(o2).forEach((k) => {
        if (o1.hasOwnProperty(k)) {
            o1[k] = o1[k.concat(o2[k])]
        } else {
            o1[k] = o2[k]
        }
    });
    return o1;
}

function invertRoutesWithStops(parsedMBTARoutes) {
    let unique_stops = new Set(
        Object.keys(parsedMBTARoutes).map(
            (route) => {
                return Object.keys(parsedMBTARoutes[route]);
            }
        ).reduce((a, b) => a.concat(b), [])
    );
    let result = {};
    unique_stops.forEach(
        (stop_name) => {
            Object.keys(parsedMBTARoutes).forEach(
                (route_name) => {
                   if(result.hasOwnProperty(stop_name)) {
                       if (result[stop_name].hasOwnProperty(route_name)) {
                           result[stop_name][route_name].concat(parsedMBTARoutes[route_name][stop_name]);
                       } else {
                           result[stop_name][route_name] = parsedMBTARoutes[route_name][stop_name];
                       }
                   } else {
                       result[stop_name] = {[route_name] : parsedMBTARoutes[route_name][stop_name]};
                   }
                }
            )
        }
    );
    return result
}

function nearbyBusStopUrl(lat, lon, apiKey) {
    return `${MBTA_API_URL}stopsbylocation?api_key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;
}

function predictionUrl(stopId, apiKey) {
    return `${MBTA_API_URL}predictionsbystop?api_key=${apiKey}&stop=${stopId}&format=json`;
}

function parseTrip(trip) {
    return {
        "headsign": trip.trip_headsign,
        "secondsUntilArrival": parseInt(trip.pre_away)
    }
}


function parseDirection(direction) {
    return direction.trip.map((t) => parseTrip(t));
}

function parseRoute(route) {
    return {
        [route.route_id]: route.direction.map(
            (d) => parseDirection(d)
        ).reduce(
            (d1, d2) => { return d1.concat(d2) },
            []
        )
    };
}

function parseMode(mode) {
    return mode.route.map(
        (r) => parseRoute(r)
    ).reduce(
        combineObjectWithArrayProperties,
        {}
    )
}

function parseStop(stop) {
    let stopName = stop.stop_name;
    let combinedModes = stop.mode.map(
        (m) => parseMode(m)
    ).reduce(
        combineObjectWithArrayProperties,
        {}
    );
    let result = {};
    Object.keys(combinedModes).forEach((route) => {
        result[route] = {
            [stopName] : combinedModes[route]
        }
    });
    return result;
}

function parsePredictions(stopsResponse) {
    return stopsResponse.map(
        (s) => parseStop(s)
    ).reduce(
        (s1, s2) => {
            Object.keys(s2).forEach((k) => {
                if (s1.hasOwnProperty(k)) {
                    s1[k] = combineObjectWithArrayProperties(s1[k], s2[k]);
                } else {
                    s1[k] = s2[k]
                }
            });
            return s1;
        },
        {}
    );
}

function nearbyBusStops(lat, long, apiKey) {
    if (apiKey === undefined) {
        // Default key for open public access.
        apiKey = "wX9NwuHnZU2ToO7GmGR9uw";
    }
    return fetch(
        nearbyBusStopUrl(lat, long, apiKey)
    ).then(response => {
        return response.json();
    }).then(json => {
        return Promise.all(
            json['stop'].map((stop) => predictionForStop(stop, apiKey))
        );
    }).then(parsePredictions);
}

function predictionForStop(stop, apiKey) {
    let url = predictionUrl(stop['stop_id'], apiKey);
    return fetch(url).then(function(response) {
        return response.json();
    });
}

module.exports = {
    nearbyBusStops,
    invertRoutesWithStops
};

if (process.env.NODE_ENV === 'test') {
    module.exports = {
        invertRoutesWithStops,
        parseTrip,
        parseDirection,
        parseRoute,
        parseMode,
        parseStop,
        parsePredictions,
        nearbyBusStops,
    };
}

