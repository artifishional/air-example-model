import {normalize} from "./index";

describe('advantages', function () {

    describe('normalize', function () {

        it('simple', function () {
            chai.expect(normalize( ["key"] )).to.deep.equal([ "key", {} ]);
        });

        it('nested', function () {
            chai.expect(normalize( ["key", [ "key2", ["key3"], ["key4"] ], ["key5"]] ))
                .to.deep.equal([ "key", {}, [ "key2", {}, [ "key3", {} ], ["key4", {} ] ], ["key5", {}] ]);
        });

        it('nested with props', function () {
            chai.expect(normalize( ["key", {prop1: 10}, [ "key2", ["key3", {prop2: 10}], ["key4"] ], ["key5"]] ))
                .to.deep.equal([ "key", {prop1: 10}, [ "key2", {}, [ "key3", {prop2: 10} ], ["key4", {} ] ], ["key5", {}] ]);
        });

    });

});