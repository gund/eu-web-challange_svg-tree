/**
 * Created by alex on 9/19/15.
 */
var Greet;
(function (Greet) {
    var Greeter = (function () {
        function Greeter(name) {
            this.name = name;
        }
        Greeter.prototype.greet = function () {
            return 'Hello, ' + this.name;
        };
        return Greeter;
    })();
    Greet.Greeter = Greeter;
})(Greet || (Greet = {}));
//# sourceMappingURL=greet.js.map