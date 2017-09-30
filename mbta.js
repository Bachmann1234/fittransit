const fetch = require("node-fetch");

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

class MbtaAPI {
    constructor(apiKey) {
        if (apiKey !== undefined) {
          this.apiKey = apiKey;
        } else {
          // Default key for open public access.
          this.apiKey = "wX9NwuHnZU2ToO7GmGR9uw";
        }
        this.host = "http://realtime.mbta.com/developer/api/v2/";
    };

    nearbyBusStopUrl(lat, lon) {
        return `${this.host}stopsbylocation?api_key=${this.apiKey}&lat=${lat}&lon=${lon}&format=json`;
    };

    predictionUrl(stopId) {
        return `${this.host}predictionsbystop?api_key=${this.apiKey}&stop=${stopId}&format=json`;
    };

    static parseTrip(trip) {
        return {
            "headsign": trip.trip_headsign,
            "secondsUntilArrival": parseInt(trip.pre_away)
        }
    }


    static parseDirection(direction) {
        return direction.trip.map((t) => this.parseTrip(t));
    }

    static parseRoute(route) {
        return {
            [route.route_id]: route.direction.map(
                (d) => this.parseDirection(d)
            ).reduce(
                (d1, d2) => { return d1.concat(d2) },
                []
            )
        };
    }

    static parseMode(mode) {
        return mode.route.map(
            (r) => this.parseRoute(r)
        ).reduce(
            combineObjectWithArrayProperties,
            {}
        )
    }

    static parseStop(stop) {
        let stopName = stop.stop_name;
        let combinedModes = stop.mode.map(
            (m) => this.parseMode(m)
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

    static parsePredictions(stopsResponse) {
        return stopsResponse.map(
            (s) => MbtaAPI.parseStop(s)
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

    nearbyBusStops(lat, long) {
        return fetch(
            this.nearbyBusStopUrl(lat, long)
        ).then(response => {
            return response.json();
        }).then(json => {
            return Promise.all(
                json['stop'].map((stop) => this.predictionForStop(stop))
            );
        }).then(MbtaAPI.parsePredictions);
    }

    predictionForStop(stop) {
        let url = this.predictionUrl(stop['stop_id']);
        return fetch(url).then(function(response) {
            return response.json();
        }); 
    }
}

Promise.resolve(
    new MbtaAPI().nearbyBusStops(42.4114684, -71.1264738).then(
        function(data) {
            console.log(JSON.stringify(data, null, 2));
        }
    )
);

module.exports = MbtaAPI;

