import Advantages from "./index";

export default class Factory {

    create([,{type = "node"}]) {
        if(type === "node") {
            return Advantages();
        }
        else if(type === "container") {
            return new Container();
        }
    }

}