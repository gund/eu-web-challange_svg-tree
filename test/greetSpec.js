///<reference path="../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jasmine_jasmine.d.ts"/>
///<reference path="../src/greet.ts"/>
var Greeter = Greet.Greeter;
describe('Greet module', function () {
    describe('Greeter object with name 123', function () {
        var greeter = new Greeter('123');
        it('should be named "123"', function () {
            expect(greeter.name).toBe('123');
        });
        it('should greet with "Hello, 123"', function () {
            expect(greeter.greet()).toBe('Hello, 123');
        });
    });
});
//# sourceMappingURL=greetSpec.js.map