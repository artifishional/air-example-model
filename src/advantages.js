import {Observable} from "air-stream"
import Loader from "./loader"

function getObservables(store, _path = []) {
    const res = [];
    for(let key in store) {
        const path = [..._path, key];
        if(store[key] instanceof Observable) {
            res.push( {path, advantage: store[key]} );
        }
        else {
            res.push(...getObservables( store[key], path) );
        }
    }
    return res;
}

export default class Advantages {

    constructor({
                    source = null,
                    parent = null,
                    loader = Loader.default,
                    schema
    } = {}) {
        this.parent = parent;
        this.item = [];
        this.loader = loader;
        this.source = source;
    }

    obtain(advantages) {
        //создаем пустой обсервер
        return advantages.map( ({source, ...args}) => {

            advantages.

            this.loader.obtain({src: this, source, ...args});


        });
    }

    build(schema) {

    }

}


/*
const advantages = new Advantages();

advantages.obtain( ["main", some: ["path2"]] ); //=> { main: Observable, some: { path2: Observable } }

*/
