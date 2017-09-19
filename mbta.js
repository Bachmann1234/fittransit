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

    parsePredictions(stopsResponse) {
        console.log(JSON.stringify(stopsResponse)); 
    }

    nearbyBusStops(lat, long) {
        return fetch(
            this.nearbyBusStopUrl(lat, long)
        ).then(response => {
            return response.json();
        }).then(json => {
            return Promise.all(
                json['stop'].slice(0, 5).map((stop) => this.predictionForStop(stop))
            );
        }).then(stops => {
            this.parsePredictions(stops);
        }); 
    }
    predictionForStop(stop) {
        let url = this.predictionUrl(stop['stop_id']);
        return fetch(url).then(function(response) {
            return response.json();
        }); 
    }
}

//new MbtaAPI().nearbyBusStops(42.346961, -71.076640);

var result = [{"stop_id":"11384","stop_name":"Dartmouth St @ Back Bay Sta","mode":[{"route_type":"3","mode_name":"Bus","route":[{"route_id":"10","route_name":"10","direction":[{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"35243442","trip_name":"4:27 pm from City Point Bus Terminal to Saint James Ave @ Dartmouth St","trip_headsign":"Copley via South Bay Center","sch_arr_dt":"1505509740","sch_dep_dt":"1505509740","pre_dt":"1505510436","pre_away":"50","vehicle":{"vehicle_id":"y1756","vehicle_lat":"42.3456497192383","vehicle_lon":"-71.0751266479492","vehicle_bearing":"341","vehicle_speed":"0","vehicle_timestamp":"1505510350","vehicle_label":"1756"}},{"trip_id":"35243445","trip_name":"4:51 pm from City Point Bus Terminal to Saint James Ave @ Dartmouth St","trip_headsign":"Copley via South Bay Center","sch_arr_dt":"1505511180","sch_dep_dt":"1505511180","pre_dt":"1505511574","pre_away":"1188","vehicle":{"vehicle_id":"y1779","vehicle_lat":"42.3301239013672","vehicle_lon":"-71.0573806762695","vehicle_bearing":"352","vehicle_speed":"0","vehicle_timestamp":"1505510307","vehicle_label":"1779"}},{"trip_id":"35243451","trip_name":"5:40 pm from City Point Bus Terminal to Saint James Ave @ Dartmouth St","trip_headsign":"Copley via South Bay Center","sch_arr_dt":"1505513880","sch_dep_dt":"1505513880","pre_dt":"1505513559","pre_away":"3173"},{"trip_id":"35243454","trip_name":"6:10 pm from City Point Bus Terminal to Saint James Ave @ Dartmouth St","trip_headsign":"Copley via South Bay Center","sch_arr_dt":"1505515620","sch_dep_dt":"1505515620","pre_dt":"1505515359","pre_away":"4973"}]}]}]}],"alert_headers":[]},{"stop_id":"23391","stop_name":"Back Bay Station","mode":[{"route_type":"3","mode_name":"Bus","route":[{"route_id":"39","route_name":"39","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"35123899","trip_name":"5:27 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505510820","sch_dep_dt":"1505510820","pre_dt":"1505510820","pre_away":"434"},{"trip_id":"35123891","trip_name":"5:34 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505511240","sch_dep_dt":"1505511240","pre_dt":"1505511240","pre_away":"854"},{"trip_id":"35124141","trip_name":"5:41 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505511660","sch_dep_dt":"1505511660","pre_dt":"1505511660","pre_away":"1274"},{"trip_id":"35124134","trip_name":"5:48 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512080","sch_dep_dt":"1505512080","pre_dt":"1505512080","pre_away":"1694"},{"trip_id":"35124124","trip_name":"5:55 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512500","sch_dep_dt":"1505512500","pre_dt":"1505512500","pre_away":"2114"},{"trip_id":"35124119","trip_name":"6:02 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512920","sch_dep_dt":"1505512920","pre_dt":"1505512920","pre_away":"2534"},{"trip_id":"35124099","trip_name":"6:10 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505513400","sch_dep_dt":"1505513400","pre_dt":"1505513400","pre_away":"3014"},{"trip_id":"35124081","trip_name":"6:18 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505513880","sch_dep_dt":"1505513880","pre_dt":"1505513880","pre_away":"3494"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"35123902","trip_name":"4:34 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505510100","sch_dep_dt":"1505510100","pre_dt":"1505510437","pre_away":"51","vehicle":{"vehicle_id":"y1255","vehicle_lat":"42.3481712341309","vehicle_lon":"-71.0739822387695","vehicle_bearing":"156","vehicle_speed":"0","vehicle_timestamp":"1505510345","vehicle_label":"1255"}},{"trip_id":"35123893","trip_name":"4:42 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505510580","sch_dep_dt":"1505510580","pre_dt":"1505510904","pre_away":"518","vehicle":{"vehicle_id":"y1202","vehicle_lat":"42.3451194763184","vehicle_lon":"-71.08203125","vehicle_bearing":"41","vehicle_speed":"0","vehicle_timestamp":"1505510310","vehicle_label":"1202"}},{"trip_id":"35124137","trip_name":"4:50 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511060","sch_dep_dt":"1505511060","pre_dt":"1505511239","pre_away":"853","vehicle":{"vehicle_id":"y1251","vehicle_lat":"42.3381881713867","vehicle_lon":"-71.0940780639648","vehicle_bearing":"62","vehicle_speed":"0","vehicle_timestamp":"1505510332","vehicle_label":"1251"}},{"trip_id":"35124130","trip_name":"4:58 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511540","sch_dep_dt":"1505511540","pre_dt":"1505511449","pre_away":"1063","vehicle":{"vehicle_id":"y1205","vehicle_lat":"42.3334693908691","vehicle_lon":"-71.1061019897461","vehicle_bearing":"61","vehicle_speed":"0","vehicle_timestamp":"1505510353","vehicle_label":"1205"}},{"trip_id":"35124123","trip_name":"5:05 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511960","sch_dep_dt":"1505511960","pre_dt":"1505511599","pre_away":"1213","vehicle":{"vehicle_id":"y1213","vehicle_lat":"42.3300361633301","vehicle_lon":"-71.1112518310547","vehicle_bearing":"341","vehicle_speed":"0","vehicle_timestamp":"1505510308","vehicle_label":"1213"}},{"trip_id":"35124118","trip_name":"5:12 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505512380","sch_dep_dt":"1505512380","pre_dt":"1505512052","pre_away":"1666","vehicle":{"vehicle_id":"y1253","vehicle_lat":"42.3107528686523","vehicle_lon":"-71.1146469116211","vehicle_bearing":"16","vehicle_speed":"0","vehicle_timestamp":"1505510341","vehicle_label":"1253"}},{"trip_id":"35124098","trip_name":"5:19 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505512800","sch_dep_dt":"1505512800","pre_dt":"1505512305","pre_away":"1919","vehicle":{"vehicle_id":"y1250","vehicle_lat":"42.3027992248535","vehicle_lon":"-71.1145095825195","vehicle_bearing":"352","vehicle_speed":"0","vehicle_timestamp":"1505510351","vehicle_label":"1250"}},{"trip_id":"35124088","trip_name":"5:26 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505513220","sch_dep_dt":"1505513220","pre_dt":"1505512725","pre_away":"2339","vehicle":{"vehicle_id":"y1206","vehicle_lat":"42.3013343811035","vehicle_lon":"-71.1134643554688","vehicle_bearing":"216","vehicle_speed":"0","vehicle_timestamp":"1505510206","vehicle_label":"1206"}},{"trip_id":"35124082","trip_name":"5:33 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505513580","sch_dep_dt":"1505513580","pre_dt":"1505513145","pre_away":"2759"},{"trip_id":"35124006","trip_name":"5:47 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505514240","sch_dep_dt":"1505514240","pre_dt":"1505513985","pre_away":"3599"},{"trip_id":"35123956","trip_name":"5:54 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505514660","sch_dep_dt":"1505514660","pre_dt":"1505514405","pre_away":"4019"},{"trip_id":"35123945","trip_name":"6:01 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515020","sch_dep_dt":"1505515020","pre_dt":"1505514825","pre_away":"4439"},{"trip_id":"35123922","trip_name":"6:09 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515500","sch_dep_dt":"1505515500","pre_dt":"1505515305","pre_away":"4919"},{"trip_id":"35123907","trip_name":"6:17 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515980","sch_dep_dt":"1505515980","pre_dt":"1505515785","pre_away":"5399"}]}]}]}],"alert_headers":[]},{"stop_id":"176","stop_name":"Dartmouth St opp Back Bay Sta","mode":[{"route_type":"3","mode_name":"Bus","route":[{"route_id":"10","route_name":"10","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"35243509","trip_name":"5:23 pm from Saint James Ave @ Dartmouth St to City Point Bus Terminal","trip_headsign":"City Point via South Bay Center","sch_arr_dt":"1505510700","sch_dep_dt":"1505510700","pre_dt":"1505510748","pre_away":"362"},{"trip_id":"35243510","trip_name":"5:48 pm from Saint James Ave @ Dartmouth St to City Point Bus Terminal","trip_headsign":"City Point via South Bay Center","sch_arr_dt":"1505512200","sch_dep_dt":"1505512200","pre_dt":"1505512191","pre_away":"1805"}]}]},{"route_id":"170","route_name":"170","direction":[{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"35107304","trip_name":"4:55 pm from Carter St @ Waltham Comm Rail Sta to Dudley Station","trip_headsign":"Dudley (Express)","sch_arr_dt":"1505512860","sch_dep_dt":"1505512860","pre_dt":"1505513069","pre_away":"2683","vehicle":{"vehicle_id":"y0464","vehicle_lat":"42.406120300293","vehicle_lon":"-71.2571105957031","vehicle_bearing":"201","vehicle_speed":"0","vehicle_timestamp":"1505510352","vehicle_label":"0464"}}]}]}]}],"alert_headers":[]},{"stop_id":"70015","stop_name":"Back Bay - Inbound","mode":[{"route_type":"1","mode_name":"Subway","route":[{"route_id":"Orange","route_name":"Orange Line","direction":[{"direction_id":"1","direction_name":"Northbound","trip":[{"trip_id":"34964159","trip_name":"5:02 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510100","sch_dep_dt":"1505510100","pre_dt":"1505510611","pre_away":"225","vehicle":{"vehicle_id":"54508393","vehicle_lat":"42.33643","vehicle_lon":"-71.08957","vehicle_bearing":"40","vehicle_timestamp":"1505510369","vehicle_label":"1285"}},{"trip_id":"34964160","trip_name":"5:08 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510460","sch_dep_dt":"1505510460","pre_dt":"1505510991","pre_away":"605","vehicle":{"vehicle_id":"545076E7","vehicle_lat":"42.31318","vehicle_lon":"-71.10594","vehicle_bearing":"25","vehicle_timestamp":"1505510370","vehicle_label":"1216"}},{"trip_id":"34964161","trip_name":"5:14 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510820","sch_dep_dt":"1505510820","pre_dt":"1505511234","pre_away":"848","vehicle":{"vehicle_id":"5450838E","vehicle_lat":"42.30122","vehicle_lon":"-71.11385","vehicle_bearing":"210","vehicle_timestamp":"1505510285","vehicle_label":"1272"}},{"trip_id":"34964162","trip_name":"5:20 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511180","sch_dep_dt":"1505511180","pre_dt":"1505511539","pre_away":"1153"},{"trip_id":"34964163","trip_name":"5:26 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511540","sch_dep_dt":"1505511540","pre_dt":"1505512074","pre_away":"1688"},{"trip_id":"34964164","trip_name":"5:32 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511900","sch_dep_dt":"1505511900","pre_dt":"1505512363","pre_away":"1977"},{"trip_id":"34964165","trip_name":"5:38 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512260","sch_dep_dt":"1505512260","pre_dt":"1505512709","pre_away":"2323"},{"trip_id":"34964166","trip_name":"5:44 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512620","sch_dep_dt":"1505512620","pre_dt":"1505513018","pre_away":"2632"},{"trip_id":"34964082","trip_name":"5:50 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512980","sch_dep_dt":"1505512980","pre_dt":"1505513355","pre_away":"2969"},{"trip_id":"34964154","trip_name":"5:56 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505513340","sch_dep_dt":"1505513340","pre_dt":"1505513706","pre_away":"3320"}]}]}]}],"alert_headers":[]},{"stop_id":"place-bbsta","stop_name":"Back Bay","mode":[{"route_type":"1","mode_name":"Subway","route":[{"route_id":"Orange","route_name":"Orange Line","direction":[{"direction_id":"0","direction_name":"Southbound","trip":[{"trip_id":"34964126","trip_name":"4:44 pm from Oak Grove to Forest Hills Orange Line","trip_headsign":"Forest Hills","sch_arr_dt":"1505509800","sch_dep_dt":"1505509800","pre_dt":"1505510518","pre_away":"132","vehicle":{"vehicle_id":"54508360","vehicle_lat":"42.3488","vehicle_lon":"-71.06467","vehicle_bearing":"230","vehicle_timestamp":"1505510297","vehicle_label":"1292"}},{"trip_id":"34964127","trip_name":"4:50 pm from Oak Grove to Forest Hills Orange Line","trip_headsign":"Forest Hills","sch_arr_dt":"1505510160","sch_dep_dt":"1505510160","pre_dt":"1505510864","pre_away":"478","vehicle":{"vehicle_id":"54508344","vehicle_lat":"42.35881","vehicle_lon":"-71.05782","vehicle_bearing":"175","vehicle_timestamp":"1505510296","vehicle_label":"1286"}},{"trip_id":"34964128","trip_name":"4:56 pm from Oak Grove to Forest Hills Orange Line","trip_headsign":"Forest Hills","sch_arr_dt":"1505510520","sch_dep_dt":"1505510520","pre_dt":"1505511175","pre_away":"789","vehicle":{"vehicle_id":"5450834B","vehicle_lat":"42.36912","vehicle_lon":"-71.06371","vehicle_bearing":"150","vehicle_timestamp":"1505510364","vehicle_label":"1315"}},{"trip_id":"34964129","trip_name":"5:02 pm from Oak Grove to Forest Hills Orange Line","trip_headsign":"Forest Hills","sch_arr_dt":"1505510880","sch_dep_dt":"1505510880","pre_dt":"1505511512","pre_away":"1126","vehicle":{"vehicle_id":"54508341","vehicle_lat":"42.38424","vehicle_lon":"-71.07705","vehicle_bearing":"175","vehicle_timestamp":"1505510330","vehicle_label":"1301"}},{"trip_id":"34964130","trip_name":"5:08 pm from Oak Grove to Forest Hills Orange Line","trip_headsign":"Forest Hills","sch_arr_dt":"1505511240","sch_dep_dt":"1505511240","pre_dt":"1505511861","pre_away":"1475","vehicle":{"vehicle_id":"545083AF","vehicle_lat":"42.41595","vehicle_lon":"-71.077","vehicle_bearing":"177","vehicle_timestamp":"1505510294","vehicle_label":"1248"}}]},{"direction_id":"1","direction_name":"Northbound","trip":[{"trip_id":"34964159","trip_name":"5:02 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510100","sch_dep_dt":"1505510100","pre_dt":"1505510611","pre_away":"225","vehicle":{"vehicle_id":"54508393","vehicle_lat":"42.33643","vehicle_lon":"-71.08957","vehicle_bearing":"40","vehicle_timestamp":"1505510369","vehicle_label":"1285"}},{"trip_id":"34964160","trip_name":"5:08 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510460","sch_dep_dt":"1505510460","pre_dt":"1505510991","pre_away":"605","vehicle":{"vehicle_id":"545076E7","vehicle_lat":"42.31318","vehicle_lon":"-71.10594","vehicle_bearing":"25","vehicle_timestamp":"1505510370","vehicle_label":"1216"}},{"trip_id":"34964161","trip_name":"5:14 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505510820","sch_dep_dt":"1505510820","pre_dt":"1505511234","pre_away":"848","vehicle":{"vehicle_id":"5450838E","vehicle_lat":"42.30122","vehicle_lon":"-71.11385","vehicle_bearing":"210","vehicle_timestamp":"1505510285","vehicle_label":"1272"}},{"trip_id":"34964162","trip_name":"5:20 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511180","sch_dep_dt":"1505511180","pre_dt":"1505511539","pre_away":"1153"},{"trip_id":"34964163","trip_name":"5:26 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511540","sch_dep_dt":"1505511540","pre_dt":"1505512074","pre_away":"1688"},{"trip_id":"34964164","trip_name":"5:32 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505511900","sch_dep_dt":"1505511900","pre_dt":"1505512363","pre_away":"1977"},{"trip_id":"34964165","trip_name":"5:38 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512260","sch_dep_dt":"1505512260","pre_dt":"1505512709","pre_away":"2323"},{"trip_id":"34964166","trip_name":"5:44 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512620","sch_dep_dt":"1505512620","pre_dt":"1505513018","pre_away":"2632"},{"trip_id":"34964082","trip_name":"5:50 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505512980","sch_dep_dt":"1505512980","pre_dt":"1505513355","pre_away":"2969"},{"trip_id":"34964154","trip_name":"5:56 pm from Forest Hills Orange Line to Oak Grove","trip_headsign":"Oak Grove","sch_arr_dt":"1505513340","sch_dep_dt":"1505513340","pre_dt":"1505513706","pre_away":"3320"}]}]}]},{"route_type":"2","mode_name":"Commuter Rail","route":[{"route_id":"CR-Franklin","route_name":"Franklin Line","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"CR-Weekday-Spring-17-719","trip_name":"719 (5:20 pm from South Station)","trip_headsign":"Forge Park/495","sch_arr_dt":"1505510700","sch_dep_dt":"1505510700","pre_dt":"1505510772","pre_away":"386","vehicle":{"vehicle_id":"1718","vehicle_lat":"42.3509216308594","vehicle_lon":"-71.0554275512695","vehicle_bearing":"200","vehicle_speed":"0","vehicle_timestamp":"1505510255","vehicle_label":"1718"}},{"trip_id":"CR-Weekday-Spring-17-721","trip_name":"721 (5:45 pm from South Station)","trip_headsign":"Forge Park/495","sch_arr_dt":"1505512200","sch_dep_dt":"1505512200","pre_dt":"1505512161","pre_away":"1775"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"CR-Weekday-Spring-17-722","trip_name":"722 (5:03 pm from Forge Park/495)","trip_headsign":"South Station","sch_arr_dt":"1505513460","sch_dep_dt":"1505513460","pre_dt":"1505512389","pre_away":"2003","vehicle":{"vehicle_id":"1709","vehicle_lat":"42.1209106445313","vehicle_lon":"-71.324348449707","vehicle_bearing":"62","vehicle_speed":"14","vehicle_timestamp":"1505510257","vehicle_label":"1709"}},{"trip_id":"CR-Weekday-Spring-17-744","trip_name":"744 (5:05 pm from Norwood Central)","trip_headsign":"South Station","sch_arr_dt":"1505510700","sch_dep_dt":"1505510700","pre_dt":"1505510751","pre_away":"365","vehicle":{"vehicle_id":"1716","vehicle_lat":"42.2598114013672","vehicle_lon":"-71.1239624023438","vehicle_bearing":"9","vehicle_speed":"29","vehicle_timestamp":"1505510278","vehicle_label":"1716"}}]}]},{"route_id":"CR-Needham","route_name":"Needham Line","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"CR-Weekday-Spring-17-619","trip_name":"619 (5:26 pm from South Station)","trip_headsign":"Needham Heights","sch_arr_dt":"1505511060","sch_dep_dt":"1505511060","pre_dt":"1505511079","pre_away":"693","vehicle":{"vehicle_id":"1708","vehicle_lat":"42.351261138916","vehicle_lon":"-71.0554733276367","vehicle_bearing":"200","vehicle_speed":"0","vehicle_timestamp":"1505510268","vehicle_label":"1708"}},{"trip_id":"CR-Weekday-Spring-17-621","trip_name":"621 (5:58 pm from South Station)","trip_headsign":"Needham Heights","sch_arr_dt":"1505512980","sch_dep_dt":"1505512980","pre_dt":"1505513036","pre_away":"2650"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"CR-Weekday-Spring-17-620","trip_name":"620 (5:04 pm from Needham Heights)","trip_headsign":"South Station","sch_arr_dt":"1505511600","sch_dep_dt":"1505511600","pre_dt":"1505511322","pre_away":"936","vehicle":{"vehicle_id":"1524","vehicle_lat":"42.2798385620117","vehicle_lon":"-71.1715316772461","vehicle_bearing":"99","vehicle_speed":"8","vehicle_timestamp":"1505510254","vehicle_label":"1524"}},{"trip_id":"CR-Weekday-Spring-17-622","trip_name":"622 (5:44 pm from Needham Heights)","trip_headsign":"South Station","sch_arr_dt":"1505513820","sch_dep_dt":"1505513820","pre_dt":"1505513282","pre_away":"2896"}]}]},{"route_id":"CR-Providence","route_name":"Providence/Stoughton Line","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"CR-Weekday-Spring-17-825","trip_name":"825 (5:40 pm from South Station)","trip_headsign":"Wickford Junction","sch_arr_dt":"1505511900","sch_dep_dt":"1505511900","pre_dt":"1505511977","pre_away":"1591"},{"trip_id":"CR-Weekday-Spring-17-919","trip_name":"919 (5:50 pm from South Station)","trip_headsign":"Stoughton","sch_arr_dt":"1505512500","sch_dep_dt":"1505512500","pre_dt":"1505512501","pre_away":"2115","vehicle":{"vehicle_id":"1513","vehicle_lat":"42.3509101867676","vehicle_lon":"-71.0553894042969","vehicle_bearing":"200","vehicle_speed":"0","vehicle_timestamp":"1505510063","vehicle_label":"1513"}},{"trip_id":"CR-Weekday-Spring-17-827","trip_name":"827 (6:10 pm from South Station)","trip_headsign":"Providence","sch_arr_dt":"1505513700","sch_dep_dt":"1505513700","pre_dt":"1505513715","pre_away":"3329"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"CR-Weekday-Spring-17-916","trip_name":"916 (5:15 pm from Stoughton)","trip_headsign":"South Station","sch_arr_dt":"1505511900","sch_dep_dt":"1505511900","pre_dt":"1505511847","pre_away":"1461","vehicle":{"vehicle_id":"1723","vehicle_lat":"42.1279411315918","vehicle_lon":"-71.1128082275391","vehicle_bearing":"295","vehicle_speed":"16","vehicle_timestamp":"1505510266","vehicle_label":"1723"}},{"trip_id":"CR-Weekday-Spring-17-828","trip_name":"828 (5:20 pm from Providence)","trip_headsign":"South Station","sch_arr_dt":"1505513820","sch_dep_dt":"1505513820","pre_dt":"1505513578","pre_away":"3192","vehicle":{"vehicle_id":"1712","vehicle_lat":"41.8295402526855","vehicle_lon":"-71.4127578735352","vehicle_bearing":"51","vehicle_speed":"0","vehicle_timestamp":"1505510276","vehicle_label":"1712"}},{"trip_id":"CR-Weekday-Spring-17-918","trip_name":"918 (6:14 pm from Stoughton)","trip_headsign":"South Station","sch_arr_dt":"1505515380","sch_dep_dt":"1505515380","pre_dt":"1505515261","pre_away":"4875"}]}]},{"route_id":"CR-Worcester","route_name":"Framingham/Worcester Line","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"CR-Weekday-Spring-17-523","trip_name":"523 (5:40 pm from South Station)","trip_headsign":"Worcester","sch_arr_dt":"1505511960","sch_dep_dt":"1505511960","pre_dt":"1505511867","pre_away":"1481"},{"trip_id":"CR-Weekday-Spring-17-595","trip_name":"595 (5:50 pm from South Station)","trip_headsign":"Framingham","sch_arr_dt":"1505512560","sch_dep_dt":"1505512560","pre_dt":"1505512550","pre_away":"2164"},{"trip_id":"CR-Weekday-Spring-17-525","trip_name":"525 (6:15 pm from South Station)","trip_headsign":"Worcester","sch_arr_dt":"1505514060","sch_dep_dt":"1505514060","pre_dt":"1505514050","pre_away":"3664"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"CR-Weekday-Spring-17-522","trip_name":"522 (5:20 pm from Worcester)","trip_headsign":"South Station","sch_arr_dt":"1505514840","sch_dep_dt":"1505514840","pre_dt":"1505514829","pre_away":"4443","vehicle":{"vehicle_id":"1701","vehicle_lat":"42.2613716125488","vehicle_lon":"-71.7933120727539","vehicle_bearing":"93","vehicle_speed":"0","vehicle_timestamp":"1505510258","vehicle_label":"1701"}},{"trip_id":"CR-Weekday-Spring-17-592","trip_name":"592 (5:40 pm from Framingham)","trip_headsign":"South Station","sch_arr_dt":"1505514180","sch_dep_dt":"1505514180","pre_dt":"1505514169","pre_away":"3783"},{"trip_id":"CR-Weekday-Spring-17-524","trip_name":"524 (6:05 pm from Worcester)","trip_headsign":"South Station","sch_arr_dt":"1505517540","sch_dep_dt":"1505517540","pre_dt":"1505517529","pre_away":"7143"}]}]}]},{"route_type":"3","mode_name":"Bus","route":[{"route_id":"10","route_name":"10","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"35243509","trip_name":"5:23 pm from Saint James Ave @ Dartmouth St to City Point Bus Terminal","trip_headsign":"City Point via South Bay Center","sch_arr_dt":"1505510700","sch_dep_dt":"1505510700","pre_dt":"1505510748","pre_away":"362"},{"trip_id":"35243510","trip_name":"5:48 pm from Saint James Ave @ Dartmouth St to City Point Bus Terminal","trip_headsign":"City Point via South Bay Center","sch_arr_dt":"1505512200","sch_dep_dt":"1505512200","pre_dt":"1505512191","pre_away":"1805"}]}]},{"route_id":"170","route_name":"170","direction":[{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"35107304","trip_name":"4:55 pm from Carter St @ Waltham Comm Rail Sta to Dudley Station","trip_headsign":"Dudley (Express)","sch_arr_dt":"1505512860","sch_dep_dt":"1505512860","pre_dt":"1505513069","pre_away":"2683","vehicle":{"vehicle_id":"y0464","vehicle_lat":"42.406120300293","vehicle_lon":"-71.2571105957031","vehicle_bearing":"201","vehicle_speed":"0","vehicle_timestamp":"1505510352","vehicle_label":"0464"}}]}]},{"route_id":"39","route_name":"39","direction":[{"direction_id":"0","direction_name":"Outbound","trip":[{"trip_id":"35123899","trip_name":"5:27 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505510820","sch_dep_dt":"1505510820","pre_dt":"1505510820","pre_away":"434"},{"trip_id":"35123891","trip_name":"5:34 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505511240","sch_dep_dt":"1505511240","pre_dt":"1505511240","pre_away":"854"},{"trip_id":"35124141","trip_name":"5:41 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505511660","sch_dep_dt":"1505511660","pre_dt":"1505511660","pre_away":"1274"},{"trip_id":"35124134","trip_name":"5:48 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512080","sch_dep_dt":"1505512080","pre_dt":"1505512080","pre_away":"1694"},{"trip_id":"35124124","trip_name":"5:55 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512500","sch_dep_dt":"1505512500","pre_dt":"1505512500","pre_away":"2114"},{"trip_id":"35124119","trip_name":"6:02 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505512920","sch_dep_dt":"1505512920","pre_dt":"1505512920","pre_away":"2534"},{"trip_id":"35124099","trip_name":"6:10 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505513400","sch_dep_dt":"1505513400","pre_dt":"1505513400","pre_away":"3014"},{"trip_id":"35124081","trip_name":"6:18 pm from Back Bay Station to Forest Hills Station","trip_headsign":"Forest Hills","sch_arr_dt":"1505513880","sch_dep_dt":"1505513880","pre_dt":"1505513880","pre_away":"3494"}]},{"direction_id":"1","direction_name":"Inbound","trip":[{"trip_id":"35123902","trip_name":"4:34 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505510100","sch_dep_dt":"1505510100","pre_dt":"1505510437","pre_away":"51","vehicle":{"vehicle_id":"y1255","vehicle_lat":"42.3481712341309","vehicle_lon":"-71.0739822387695","vehicle_bearing":"156","vehicle_speed":"0","vehicle_timestamp":"1505510345","vehicle_label":"1255"}},{"trip_id":"35123893","trip_name":"4:42 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505510580","sch_dep_dt":"1505510580","pre_dt":"1505510904","pre_away":"518","vehicle":{"vehicle_id":"y1202","vehicle_lat":"42.3451194763184","vehicle_lon":"-71.08203125","vehicle_bearing":"41","vehicle_speed":"0","vehicle_timestamp":"1505510310","vehicle_label":"1202"}},{"trip_id":"35124137","trip_name":"4:50 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511060","sch_dep_dt":"1505511060","pre_dt":"1505511239","pre_away":"853","vehicle":{"vehicle_id":"y1251","vehicle_lat":"42.3381881713867","vehicle_lon":"-71.0940780639648","vehicle_bearing":"62","vehicle_speed":"0","vehicle_timestamp":"1505510332","vehicle_label":"1251"}},{"trip_id":"35124130","trip_name":"4:58 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511540","sch_dep_dt":"1505511540","pre_dt":"1505511449","pre_away":"1063","vehicle":{"vehicle_id":"y1205","vehicle_lat":"42.3334693908691","vehicle_lon":"-71.1061019897461","vehicle_bearing":"61","vehicle_speed":"0","vehicle_timestamp":"1505510353","vehicle_label":"1205"}},{"trip_id":"35124123","trip_name":"5:05 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505511960","sch_dep_dt":"1505511960","pre_dt":"1505511599","pre_away":"1213","vehicle":{"vehicle_id":"y1213","vehicle_lat":"42.3300361633301","vehicle_lon":"-71.1112518310547","vehicle_bearing":"341","vehicle_speed":"0","vehicle_timestamp":"1505510308","vehicle_label":"1213"}},{"trip_id":"35124118","trip_name":"5:12 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505512380","sch_dep_dt":"1505512380","pre_dt":"1505512052","pre_away":"1666","vehicle":{"vehicle_id":"y1253","vehicle_lat":"42.3107528686523","vehicle_lon":"-71.1146469116211","vehicle_bearing":"16","vehicle_speed":"0","vehicle_timestamp":"1505510341","vehicle_label":"1253"}},{"trip_id":"35124098","trip_name":"5:19 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505512800","sch_dep_dt":"1505512800","pre_dt":"1505512305","pre_away":"1919","vehicle":{"vehicle_id":"y1250","vehicle_lat":"42.3027992248535","vehicle_lon":"-71.1145095825195","vehicle_bearing":"352","vehicle_speed":"0","vehicle_timestamp":"1505510351","vehicle_label":"1250"}},{"trip_id":"35124088","trip_name":"5:26 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505513220","sch_dep_dt":"1505513220","pre_dt":"1505512725","pre_away":"2339","vehicle":{"vehicle_id":"y1206","vehicle_lat":"42.3013343811035","vehicle_lon":"-71.1134643554688","vehicle_bearing":"216","vehicle_speed":"0","vehicle_timestamp":"1505510206","vehicle_label":"1206"}},{"trip_id":"35124082","trip_name":"5:33 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505513580","sch_dep_dt":"1505513580","pre_dt":"1505513145","pre_away":"2759"},{"trip_id":"35124006","trip_name":"5:47 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505514240","sch_dep_dt":"1505514240","pre_dt":"1505513985","pre_away":"3599"},{"trip_id":"35123956","trip_name":"5:54 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505514660","sch_dep_dt":"1505514660","pre_dt":"1505514405","pre_away":"4019"},{"trip_id":"35123945","trip_name":"6:01 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515020","sch_dep_dt":"1505515020","pre_dt":"1505514825","pre_away":"4439"},{"trip_id":"35123922","trip_name":"6:09 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515500","sch_dep_dt":"1505515500","pre_dt":"1505515305","pre_away":"4919"},{"trip_id":"35123907","trip_name":"6:17 pm from Forest Hills Station to Back Bay Station","trip_headsign":"Back Bay","sch_arr_dt":"1505515980","sch_dep_dt":"1505515980","pre_dt":"1505515785","pre_away":"5399"}]}]}]}],"alert_headers":[]}];
