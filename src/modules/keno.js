const {Observable, List} = window;

export default function({advantages, id}) {

    const res = advantages.obtain({route: "../../../state/{type: loto20_80}", id});

    return res;

/*
    //либо один обсерв, либо группу
    return new Observable( function (emt) {

        setTimeout( () => {

            emt.emit({type: "fight!", data: "After 20 years of work I am ready to fight!"});
            emt.emit({type: "some", data: some});

        }, 2020 );

    } );*/

}