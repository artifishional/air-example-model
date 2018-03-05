import {Observable} from "air-stream"

export default class Loader {

    obtain({src, path}) {

        return new Observable( evt => {

            eval(`import("./${path}.js")`).then( function (module) {

                console.log(module.default.some);

            } );

        } );

    }

    static default = new Loader();

}