const fetch = require("node-fetch");

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
        return mode.route.map((r) => this.parseRoute(r)).reduce(
            (r1, r2) => {
                Object.keys(r2).forEach((k) => {
                    if (r1.hasOwnProperty(k)) {
                        r1[k] = r1[k.concat(r2[k])]
                    } else {
                        r1[k] = r2[k]
                    }
                });
                return r1;
            },
            {}
        )
    }

    static parseStop(stop) {

    }

    static parsePredictions(stopsResponse) {
        let result = {};

        return result;
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

Promise.resolve(new MbtaAPI().nearbyBusStops(42.4114684, -71.1264738).then(function(data) {
    // console.log(JSON.stringify(data, null, 2));
    console.log(Object.keys(data));
}));

module.exports = MbtaAPI;

