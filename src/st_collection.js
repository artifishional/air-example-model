import list from "./container"

export default function stCollection({scheme, stream}) {

    //stream => stream to list
    list({scheme, stream});
    scheme.constructor.push(

        function (scheme, stream) {



        }

    );

}