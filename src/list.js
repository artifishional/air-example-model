import {Observable} from "air-stream"

export default class List extends Observable {

    constructor( { stream } ) {
        super( function (emt) {
            stream.on( ({type, list, ...args }) => {
                if(type === "reinit") {
                    emt.emit({ type, list: list.map( x => {

                        //todo need cache
                        //todo need overloop
                        //todo need lazy init

                        const res = {};

                        //decorator for every Observable ?

                        res.main = new Observable( (emt) => {

                            const res = this.creators.find( creator => creator({data: x, stream}) )({data: x, stream});
                            const {main} = res;

                            return main.on( (data) => {
                                emt.emit(data);
                            } );

                        } );

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

}