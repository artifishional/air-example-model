const {Observable} = window;

export default function ({advantages}) {

    //либо один обсерв, либо группу
    return new Observable( function (emt) {

        setTimeout( () => {

            emt.emit({type: "fight!", data: "After 20 years of work I am ready to fight!"});

        }, 2020 );

    } );

}