const {Observable} = window;

export default function({advantages, ...args}) {

    //либо один обсерв, либо группу
    return new Observable( function (emt) {

        setTimeout( () => {

            emt.emit({type: "ggwp", data: args});

        }, 2020 );

    } );

}