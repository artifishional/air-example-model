import {Observable} from "air-stream"

//fixme (only for debug)
window.Observable = Observable;

import Advantages from "./advantages/index"
import List from "./list";


/*
const list = new List( {stream: new Observable( function (emt) {

    setTimeout( () => emt.emit( {type: "reinit", list: [{a: 10}, {b: 20}] } ), 1000 );

} ) });

list.creators.push( ({data, stream}) => {

    return { main: stream }

} );


list.on( function ({ list }) {

    list[1].main.on( function (data) {
        console.log(data);
    } );

} );*/

/*

const advantages = new Advantages( );

advantages.obtain([{ source: {path: "./advanced1"}, some: 77}])[0].on( function (evt) {
    console.log(evt);
} );
*/


const advantages = Advantages.create( { schema:
        [ "main",
            [ "state",
                [ {type: "loto20_80"}, { source: {path: "./state.js", name: "loto20_80"} } ]
            ],
            [ "session",
                [ "games",
                    [ {name: "keno"}, {path: "./keno.js"} ],
                ],
                [ "gs", { source: { path: "./switch.js" }} ]
            ],
        ]
} );


setTimeout( () => {


    const [keno] = advantages.obtain({route: [ "session", "games", {name: "keno"}]});

    keno.on( evt => console.log(evt) );

} );


