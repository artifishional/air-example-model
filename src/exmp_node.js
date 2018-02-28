export default function ({conf, env, stream}) {

    const main = stream.reducer( function ({sum}, {action: {type, data}}) {

        if(type === "add") {

            return { win: sum + data.sum }

        }

    } );

    const list = new Container( { stream: main } );

    //затем этот объект мержится с текущим env
    return {
        //minimal path
        main,
        //nested path
        from: { list }
    }

}