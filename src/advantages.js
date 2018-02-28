import {Observable} from "air-stream"

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

    constructor({ parent }) {
        this.parent = parent;
        this.item = [];
    }

    /**
     *
     * @param {Object} store nested store of advantages
     */
    reg(store) {

        const advantages = getObservables(store);


        advantages.map(  );

        const exist = this.item.find( ({path}) => path === _path );

        //Если уже успел вернуть заглушку для потока

        if(exist) {


            const emt =

            advantage.on( (evt) => {
                emt.emit(evt);
            } );

            //тогда для него сущесвует эмитер


            //decorator for every Observable ?

            res.main = new Observable( (emt) => {

                const res = this.creators.find( creator => creator({data: x, stream}) )({data: x, stream});
                const {main} = res;

                return main.on( (data) => {
                    emt.emit(data);
                } );

            } );

        }
        else {
            this.item.push( {path, advantage} );



        }


    }

    $(advantages) {

        //создаем пустой обсервер
        return advantages.map( ({path}) => {

            const exist = this.item.find( ({path: _path}) => path === _path );

            if(exist) {
                return exist;
            }

            else {

                return new Observable( (emt) => {

                    this.emts.push( {path, emt} );
                    
                    return () => {
                        this.emts.remove({path, emt});
                    }

                } )

            }

        } );
    }

}


advantages.$( [ "some", {path: "./some"} ] );