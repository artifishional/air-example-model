import {Observable} from "air-stream"

//fixme (only for debug)
window.Observable = Observable;

import Advantages from "./advantages/index"
import List from "./list";
import Factory from "./advantages/factory";


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
            [ "state", {type: "container"},
                [ {type: "loto20_80"}, { source: {path: "./state.js", name: "loto20_80"} } ]
            ],
            [ "session",
                [ "games", {type: "container"},
                    [ {name: "keno"}, {source: { path: "./keno.js"}} ],
                    [ {name: "lucky"}, {source: { path: "./lucky.js"}} ],
                ],
                [ "gs", { source: { path: "./switch.js" }} ]
            ],
        ],
        factory: Factory.default
} );


setTimeout( () => {


    const keno = advantages.obtain({route: "./session/games/{name: keno}", id: 45});

    keno.on( evt => console.log(evt) );

} );


