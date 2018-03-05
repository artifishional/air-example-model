import {Observable} from "air-stream"

export default class Loader {

    obtain({advantages, path}) {

        return new Observable( emt => {

            eval(`import("./${path}.js")`).then( function (module) {

                module.default( {advantages} ).on( function (evt) {

                    emt.emit(evt);

                } );

            } );

        } );

    }

    static default = new Loader();

}