import {Observable} from "air-stream"

//fixme (only for debug)
window.Observable = Observable;

import Advantages from "./advantages"
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



const advantages = new Advantages( );

advantages.obtain([{path: "advanced1", some: 10}])[0].on( function (evt) {
    console.log(evt);
} );