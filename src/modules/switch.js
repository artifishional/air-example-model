const {Observable} = window;

export default function ({advantages, path}) {

    path

    //либо один обсерв, либо группу
    return new Observable( (emt) => {

        setTimeout( () => {

            emt.emit({type: "fight!", data: "After 20 years of work I am ready to fight!"});
            emt.emit({type: "some", data: id});

        }, 2020 );

    } );

}