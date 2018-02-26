export default function (conf, env, stream) {

    //затем этот объект мержится с текущим env
    return {
        main: stream.reducer( function ({sum}, {action: {type, data}}) {

            if(type === "add") {

                return {win: sum + data.sum }

            }

        } ),
        list: new List( main,  )
    }

}