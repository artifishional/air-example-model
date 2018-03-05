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

    /**
     *
     * @param {Object} store nested store of advantages
     */
    reg(store) {

        getObservables(store).map( observable => {

            const exist = this.item.find( ({path}) => path === _path );

            //Если уже успел вернуть заглушку для потока
            //То для нее должен был быть зарегестрирован эмиттер

            if(exist) {

                const unobs = observable.on( (evt) => {
                    exist.emt.emit(evt);
                } );

            }
            else {
                this.item.push( {path, observable} );

            }

        } );


    }

    obtain(advantages) {

        //создаем пустой обсервер
        return advantages.map( ({path}) => {

            const exist = this.item.find( ({path: _path}) => path === _path );

            if(exist) {
                return exist;
            }

            else {

                const observable = new Observable( (emt) => {

                    this.loader.obtain({src: this, path}).on( (evt) => {

                        emt.emit(evt);

                    } );

                } );

                this.item.push( {path, observable} );

                return observable;

            }

        } );
    }

}


/*
const advantages = new Advantages();

advantages.obtain( ["main", some: ["path2"]] ); //=> { main: Observable, some: { path2: Observable } }

*/

























