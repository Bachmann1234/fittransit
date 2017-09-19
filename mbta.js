const fetch = require("node-fetch");

const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

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
            'headsign': trip.trip_headsign,
            'secondsUntilArrival': trip.pre_away
        }
    }

    static parsePredictions(stopsResponse) {
        //todo: handle arrays
        // Modes: busses and subways come together
        // there are many routes pir mode
        // Break down by "mode", "route", "direction"
        return groupBy(stopsResponse.map(function(stop) {
            return {
                'stopName': stop.stop_name,
                'transitType': stop.mode[0].mode_name,
                'name': stop.mode[0].route[0].route_name,
                'direction': stop.mode[0].route[0].direction[0].direction_name,
                'trips': stop.mode[0].route[0].direction[0].trip.map(MbtaAPI.parseTrip)
            }
        }), 'name');
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
        console.log(stop);
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


