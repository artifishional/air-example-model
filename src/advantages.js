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

    constructor({ parent = null, loader = Loader.default } = {}) {
        this.parent = parent;
        this.item = [];
        this.loader = loader;
    }

    obtain(advantages) {
        //создаем пустой обсервер
        return advantages.map( ({path}) => {
            return this.loader.obtain({src: this, path});
        } );
    }

}


/*
const advantages = new Advantages();

advantages.obtain( ["main", some: ["path2"]] ); //=> { main: Observable, some: { path2: Observable } }

*/
