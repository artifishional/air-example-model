import {Observable} from "air-stream"

export default class List extends Observable {

    constructor( { stream } ) {
        super( function (emt) {
            stream.on( ({type, list, ...args }) => {
                if(type === "reinit") {
                    emt.emit({ type, list: list.map( x => this.creators.find( creator => creator(x) )({data: x, stream})), ...args});
                }
                //todo rework
                else if(type === "add") {
                    emt.emit({ type, list: list.map( x => this.creators.find( creator => creator(x) )(x)), ...args});
                }
            } );
        } );
        this.creators = [];
    }

}