import {forEachFromData} from "./utils"
import {Loader, MError} from "m2"

/**
 * Органайзер списка
 * @param scheme
 * @param stream
 * @param {Array<String>} signature
 */
export default function container({scheme, stream, signature}) {

    //коллекция компонентов
    const plugs = scheme.constructor = [

        /**
         * Плагин, который определяет сигнатуру для поиска
         */
        function ({scheme, ...data}) {
            signature.map( prop => scheme[prop] = data[prop] )
        }
        
    ];

    //управление элементами
    scheme.item = stream.map( forEachFromData( ({data, type}) => {

        if(type === "reinit") {

            const loader = new Loader(data);

            const scheme = {};

            function onload() {
                plugs.every( plug => plug({ scheme, stream, ...data} ) );
            }

            stream = stream.withHandler(function (emt, data) {
                if(!loader.isLoad) {
                    loader.onload.off(onload);
                    loader.onload.on(onload);
                    return new MError({ type: "MODULE_NOT_READY", event: loader.onload });
                }
                emt.emit(data);
            });

            return {scheme, stream};

        }
        else if(type === "add") {


        }


    } ) );

}


/**
 * stream
 * {type: "reinit", data: [ signature ]}
 */