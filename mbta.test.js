const mbta = require('./mbta.js');
const fs = require('fs');
predictions_data = "";
beforeAll(() => {
    return new Promise(function(resolve, reject) {
        fs.readFile('mbta_predictions.json', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            predictions_data = JSON.parse(data);
            resolve();
        });
    })
});


test("Extract trip data", () => {
   expect(
      mbta.parseTrip({
           "trip_id": "34982499",
           "trip_name": "9:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
           "trip_headsign": "Davis",
           "sch_arr_dt": "1506302580",
           "sch_dep_dt": "1506302580",
           "pre_dt": "1506302699",
           "pre_away": "330",
           "vehicle": {
               "vehicle_id": "y0626",
               "vehicle_lat": "42.4185447692871",
               "vehicle_lon": "-71.1106567382813",
               "vehicle_bearing": "294",
               "vehicle_speed": "0",
               "vehicle_timestamp": "1506302291",
               "vehicle_label": "0626"
           }
       })
   ).toEqual({
           "headsign": "Davis",
           "secondsUntilArrival": 330
   })
});

test("Extract Direction Data", () => {
    expect(
        mbta.parseDirection({
            "direction_id": "1",
            "direction_name": "Inbound",
            "trip": [
                {
                    "trip_id": "34982499",
                    "trip_name": "9:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                    "trip_headsign": "Davis",
                    "sch_arr_dt": "1506302580",
                    "sch_dep_dt": "1506302580",
                    "pre_dt": "1506302728",
                    "pre_away": "359",
                    "vehicle": {
                        "vehicle_id": "y0626",
                        "vehicle_lat": "42.4185447692871",
                        "vehicle_lon": "-71.1106567382813",
                        "vehicle_bearing": "294",
                        "vehicle_speed": "0",
                        "vehicle_timestamp": "1506302291",
                        "vehicle_label": "0626"
                    }
                },
                {
                    "trip_id": "34982800",
                    "trip_name": "10:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                    "trip_headsign": "Davis",
                    "sch_arr_dt": "1506306120",
                    "sch_dep_dt": "1506306120",
                    "pre_dt": "1506306253",
                    "pre_away": "3884"
                }
            ]
        })
    ).toEqual(
        [
            {
                "headsign": "Davis",
                "secondsUntilArrival": 359
            },
            {
                "headsign": "Davis",
                "secondsUntilArrival": 3884
            }
        ]
    )
});

test("Extract route data", () => {
   expect(
       mbta.parseRoute({
           "route_id": "94",
           "route_name": "94",
           "direction": [
               {
                   "direction_id": "1",
                   "direction_name": "Inbound",
                   "trip": [
                       {
                           "trip_id": "34982499",
                           "trip_name": "9:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                           "trip_headsign": "Davis",
                           "sch_arr_dt": "1506302580",
                           "sch_dep_dt": "1506302580",
                           "pre_dt": "1506302699",
                           "pre_away": "330",
                           "vehicle": {
                               "vehicle_id": "y0626",
                               "vehicle_lat": "42.4185447692871",
                               "vehicle_lon": "-71.1106567382813",
                               "vehicle_bearing": "294",
                               "vehicle_speed": "0",
                               "vehicle_timestamp": "1506302291",
                               "vehicle_label": "0626"
                           }
                       },
                       {
                           "trip_id": "34982800",
                           "trip_name": "10:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                           "trip_headsign": "Davis",
                           "sch_arr_dt": "1506306060",
                           "sch_dep_dt": "1506306060",
                           "pre_dt": "1506306224",
                           "pre_away": "3855"
                       }
                   ]
               }
           ]
       })
   ).toEqual({
       "94" :  [
           {
               "headsign": "Davis",
               "secondsUntilArrival": 330
           },
           {
               "headsign": "Davis",
               "secondsUntilArrival": 3855
           }
       ]
   })
});

test('Extract Mode Data', () => {
   expect(
       mbta.parseMode({
           "route_type": "3",
           "mode_name": "Bus",
           "route": [
               {
                   "route_id": "80",
                   "route_name": "80",
                   "direction": [
                       {
                           "direction_id": "1",
                           "direction_name": "Inbound",
                           "trip": [
                               {
                                   "trip_id": "35072168",
                                   "trip_name": "10:15 pm from Medford St @ Massachusetts Ave to Lechmere Station - Outbound Side",
                                   "trip_headsign": "Lechmere",
                                   "sch_arr_dt": "1506306000",
                                   "sch_dep_dt": "1506306000",
                                   "pre_dt": "1506306017",
                                   "pre_away": "3648"
                               }
                           ]
                       }
                   ]
               },
               {
                   "route_id": "94",
                   "route_name": "94",
                   "direction": [
                       {
                           "direction_id": "1",
                           "direction_name": "Inbound",
                           "trip": [
                               {
                                   "trip_id": "34982499",
                                   "trip_name": "9:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                                   "trip_headsign": "Davis",
                                   "sch_arr_dt": "1506302580",
                                   "sch_dep_dt": "1506302580",
                                   "pre_dt": "1506302699",
                                   "pre_away": "330",
                                   "vehicle": {
                                       "vehicle_id": "y0626",
                                       "vehicle_lat": "42.4185447692871",
                                       "vehicle_lon": "-71.1106567382813",
                                       "vehicle_bearing": "294",
                                       "vehicle_speed": "0",
                                       "vehicle_timestamp": "1506302291",
                                       "vehicle_label": "0626"
                                   }
                               },
                               {
                                   "trip_id": "34982800",
                                   "trip_name": "10:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                                   "trip_headsign": "Davis",
                                   "sch_arr_dt": "1506306060",
                                   "sch_dep_dt": "1506306060",
                                   "pre_dt": "1506306224",
                                   "pre_away": "3855"
                               }
                           ]
                       }
                   ]
               }
           ]
       })
   ).toEqual({
       "80": [
           {
               "headsign": "Lechmere",
               "secondsUntilArrival": 3648
           }
       ],
       "94" :  [
           {
               "headsign": "Davis",
               "secondsUntilArrival": 330
           },
           {
               "headsign": "Davis",
               "secondsUntilArrival": 3855
           }
       ]
   })
});

test("Extract stop data", () => {
    expect(
        mbta.parseStop(
            {"stop_id": "2375",
            "stop_name": "Boston Ave @ Hillsdale Rd",
            "mode": [
                {
                    "route_type": "3",
                    "mode_name": "Bus",
                    "route": [
                        {
                            "route_id": "80",
                            "route_name": "80",
                            "direction": [
                                {
                                    "direction_id": "1",
                                    "direction_name": "Inbound",
                                    "trip": [
                                        {
                                            "trip_id": "35072168",
                                            "trip_name": "10:15 pm from Medford St @ Massachusetts Ave to Lechmere Station - Outbound Side",
                                            "trip_headsign": "Lechmere",
                                            "sch_arr_dt": "1506306000",
                                            "sch_dep_dt": "1506306000",
                                            "pre_dt": "1506306017",
                                            "pre_away": "3648"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "route_id": "94",
                            "route_name": "94",
                            "direction": [
                                {
                                    "direction_id": "1",
                                    "direction_name": "Inbound",
                                    "trip": [
                                        {
                                            "trip_id": "34982499",
                                            "trip_name": "9:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                                            "trip_headsign": "Davis",
                                            "sch_arr_dt": "1506302580",
                                            "sch_dep_dt": "1506302580",
                                            "pre_dt": "1506302699",
                                            "pre_away": "330",
                                            "vehicle": {
                                                "vehicle_id": "y0626",
                                                "vehicle_lat": "42.4185447692871",
                                                "vehicle_lon": "-71.1106567382813",
                                                "vehicle_bearing": "294",
                                                "vehicle_speed": "0",
                                                "vehicle_timestamp": "1506302291",
                                                "vehicle_label": "0626"
                                            }
                                        },
                                        {
                                            "trip_id": "34982800",
                                            "trip_name": "10:15 pm from Medford Sq @ City Hall Parking lot to Davis Square Busway",
                                            "trip_headsign": "Davis",
                                            "sch_arr_dt": "1506306060",
                                            "sch_dep_dt": "1506306060",
                                            "pre_dt": "1506306224",
                                            "pre_away": "3855"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            "alert_headers": []
            }
        )
    ).toEqual(
        {"80": {
             "Boston Ave @ Hillsdale Rd": [
                 {
                     headsign: "Lechmere",
                     secondsUntilArrival: 3648,
                 }
             ]
         },
         "94": {
             "Boston Ave @ Hillsdale Rd": [
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 330,
                 },
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 3855,
                 },
             ]
         }
    })
});

test('Extract Required Data From List Of Predictions', () => {
     expect(
         mbta.parsePredictions(predictions_data)
     ).toEqual({
         "80": {
             "Boston Ave @ Hillsdale Rd": [
                 {
                     headsign: "Lechmere",
                     secondsUntilArrival: 3648,
                 }
             ],
             "Boston Ave @ Piggott Rd": [
                 {
                     headsign: "Arlington Center",
                     secondsUntilArrival: 2200,
                 }
             ],
             "Boston Ave @ Winthrop St": [
                 {
                     headsign: "Lechmere",
                     secondsUntilArrival: 3692,
                 }
             ]
         },
         "94": {
             "Boston Ave @ Hillsdale Rd": [
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 330,
                 },
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 3855,
                 },
             ],
             "Boston Ave @ Piggott Rd": [
                 {
                     headsign: "Medford Square",
                     secondsUntilArrival: 1169,
                 }
             ],
             "Boston Ave @ Winthrop St": [
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 359,
                 },
                 {
                     headsign: "Davis",
                     secondsUntilArrival: 3884,
                 }
             ]
         },
         "96": {
             "Boston Ave @ Winthrop St": [
                 {
                     headsign: "Harvard",
                     secondsUntilArrival: 675,
                 }
             ]
         }
     })
});