import {Observable} from "air-stream"

export default class Loader {

    constructor() {
        this.modules = [];
    }

    obtain({advantages, source: {path, name = "default"}, ...args}) {
        const exist = this.modules.find( ({ path: _path }) => path === _path );
        if(exist) {
            return exist.module[name]( {advantages, ...args} );
        }
        else {
            return new Observable( emt => {
                eval(`import("${path}.js")`).then(module => {
                    this.modules.push({module, path});
                    return module[name]( {advantages, ...args} ).on( evt => emt.emit(evt));
                } );
            } );
        }
    }

    static default = new Loader();

}