import {Observable} from "air-stream"
import Loader from "../loader"

/**
 *
 * @param {Array} schema
 */
export function schemasNormalizer([key, ...elems]) {
    return [
        key,
        elems.length && !Array.isArray(elems[0]) ? elems.shift() : {},
        ...elems.map( elem => schemasNormalizer(elem) )
    ];
}

export function routeNormalizer(route) {
    return route.split("/")
        //an empty string includes
        .filter(x => !".".includes(x))
        .map(x => x[0] === "{" ? JSON.parse(x.replace(/[a-zA-Z]\w{1,}/g, x=> `"${x}"`)) : x);
}

export default class Advantages {

    constructor(
        { parent, factory, loader, schema: [ key, {sign = Advantages.sign, source, ...settings}, ...advs ] }
    ) {
        this.key = key;
        this.sign = sign;
        this.loader = loader;
        this.source = source;
        this.parent = parent;
        this.item = advs.map( schema => factory.create( { factory, parent: this, schema, loader } ) );
        this.settings = settings;
    }

    /**
     *
     * @param route
     * @returns {*}
     * @example {route: "./../../state/{type: loto20_80}"}/
     */
    obtain({ route, ...args }) {
        return this._obtain({ route: routeNormalizer(route), ...args });
    }

    _obtain({route: [ key, ...route ], ...args}) {
        if(key) {
            if(key === "..") {
                return this.parent._obtain({ route, ...args });
            }
            else {
                const node = this.item.find( this.sign(key) );
                if(node) {
                    return node._obtain({ route, ...args });
                }
                else {
                    if(this.source.hasOwnProperty("path") && !this.item.length) {

                        //вернуть временный обсервер
                        return new Observable( function (emt) {

                            //получить дополенение для схемы
                            this.loader.get({source: this.source}, function (schema) {



                                return this.obtain().on( emt.emit );



                            });

                        } );
                    }
                    else {
                        throw "module not found";
                    }
                }
            }
        }
        else {
            return this.loader.obtain({advantages: this, source: this.source, ...args});
        }
    }

    _build(elems) {
        this.item.push(...elems.map( schema =>
            this.factory( { loader: this.loader, schema, parent: this } )
        ));
    }

    static create({
        parent = null,
        loader = Loader.default,
        factory,
        schema
    }) {
        return factory.create( { factory, parent, schema: schemasNormalizer(schema), loader } );
    }

    static sign(sign) {
        return ({key}) => sign === key;
    }

}


/*

advantages.obtain([{route: ["main", "session", "games", {name: "keno"}]}])[0].on( function (evt) {
    console.log(evt);
} );

 */