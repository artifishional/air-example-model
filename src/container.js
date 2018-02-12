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

    function getModuleAtSignature( signature, stream ) {

        const rscheme = {};

        //проверить кеш, если нет, то пройтись по плагинам
        plugs.reduce(  (prev, next)  => next( rscheme, stream, signature ) , {});

        if() {

        }

    }

    //управление элементами
    scheme.item = stream.map( forEachFromData( ({data, type}) => {

        const loader = new Loader(data);
        const scheme = {};
        

        if(type === "reinit") {

            function onload() {
                plugs.every( plug => plug({ scheme, stream, ...data} ) );
            }

            stream = stream.withHandler(function (emt, data) {
                /*if(!loader.isLoad) {
                    loader.onload.off(onload);
                    loader.onload.on(onload);
                    return new MError({ type: "MODULE_NOT_READY", event: loader.onload });
                }*/

                //Если вызвана данная функция, то объект еще не инициализирован

                //Требуется:

                // 1. Заполнить объект scheme для текущего юнита
                // 2. Получить модификатор данных для данного юнита

                plugs.forEach( plug =>

                    //Если не один из плагинов не инициализирует текущий юнит, то команда должна быть
                    //преостановлена

                    /**
                     * Если придерживаться правила, что для инциализации каждого юнита достаточно одного
                     * действущего конструктора (любого), то возникает противоречие, так как этот конструктор
                     * может являться не основой, а расширением. Поэтому инициализирующий конструктор должен
                     * создать основной поток
                     */

                    /**
                     * Плагин сам должен получить все ссылки на верхние уровни
                     */
                    plug(scheme, stream)


                );

                emt.emit(data);
            });

            scheme.bus = stream;

        }
        else if(type === "add") {


        }


    } ) );

}


//  1. Запрос на item Observable из контнейнера
//  2. Далее - любая операция на текущий Observable должна инициаировать запрос на создание нового объекта

