const {Observable, List} = window;

export default function({advantages, some, ...args}) {

    //либо один обсерв, либо группу
    return new Observable( function (emt) {

        setTimeout( () => {

            emt.emit({type: "fight!", data: "After 20 years of work I am ready to fight!"});
            emt.emit({type: "some", data: some});

        }, 2020 );

    } );

}

export function list({advantages, some, ...args}) {

    return new List( advantages.obtain() );

}