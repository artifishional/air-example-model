const {Observable} = window;

export default function () {

    //либо один обсерв, либо группу
    return new Observable( (emt) => {

        setTimeout( () => {

            emt.emit({type: "reinit", data: { state: [] } });
            emt.emit({type: "change", data: { state: [] } });

        }, 2020 );

    } );

}