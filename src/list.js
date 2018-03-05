import {Observable} from "air-stream"
import Advantages from "./advantages";

function findAndGet( arr, cb ) {
    let res = null;
    for(let i = 0; i < arr.length && !res; i++ ) {
        res = cb( arr[i], i, arr );
    }
    return res;
}

export default class List extends Observable {

    constructor( { stream, parent } ) {
        super( emt => {
            stream.on( ({type, list, ...args }) => {
                if(type === "reinit") {
                    emt.emit({ type, list: list.map( data => {

                        //todo need cache
                        //todo need overloop

                        const res = new Advantages( {parent} );

                        //todo need lazy init
                        res.reg( findAndGet(this.creators, {data, stream}));

                        this.advantages.push( res );

                        return res;

                    }), ...args});

                }
                //todo need rework
                else if(type === "add") {
                    emt.emit({ type, list: list.map( x => this.creators.find( creator => creator(x) )(x)), ...args});
                }
            } );
        } );
        this.creators = [];
    }

    reg(some) {
        this.creators.push( some );
        this.advantages.forEach(  );
    }

}