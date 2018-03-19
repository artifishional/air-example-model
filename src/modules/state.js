export function loto({advantages, id, type}) {

    //либо один обсерв, либо группу
    return advantages
        .obtain( {route: "../server" } )
        .ifExist( ({state}) => state && state.find( ({type: _type}) => _type === type ) );

}