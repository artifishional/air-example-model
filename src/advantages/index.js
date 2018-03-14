import {Observable} from "air-stream"
import Loader from "../loader"

/**
 *
 * @param {Array} schema
 */
export function normalize([key, ...elems]) {
    return [
        key,
        elems.length && !Array.isArray(elems[0]) ? elems.shift() : {},
        ...elems.map( elem => normalize(elem) )
    ];
}

export default class Advantages {

    constructor(
        { parent, factory, loader, schema: [ key, {source, ...args}, ...advs ] },
        _ = () => { throw `You can not instantiate this class directly. Use the static method "create" instead`}
    ) {
        this.key = key;
        this.source = source;
        this.parent = parent;
        this.item = [ ];
        this.args = args;
        this.loader = loader;
        this.factory = factory;
        this._build(advs);
    }

    obtain(...advs) {
        //создаем пустой обсервер
        return advs.map( ({route: [ key, ...route ]}) =>
            key ? (key === ".." ? this.parent : this.item.find( ({key: _key}) => key === _key ))
                    .obtain({ route }) :
                this.loader.obtain({advantages: this, source: this.source, ...this.args})
        );
    }

    _build(elems) {
        this.item.push(...elems.map( schema =>
            this.factory( { loader: this.loader, schema, parent: this } )
        ));
    }

    static create({
        parent = null,
        loader = Loader.default,
        factory = Factory.default,
        schema
    }) {
        return new Advantages( {parent, schema: normalize(schema), loader}, 0 );
    }

}


/*

advantages.obtain([{route: ["main", "session", "games", {name: "keno"}]}])[0].on( function (evt) {
    console.log(evt);
} );

 */