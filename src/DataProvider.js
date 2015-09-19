/**
 * Created by alex on 9/19/15.
 */
var DataProvider;
(function (DataProvider_1) {
    var DataProvider = (function () {
        function DataProvider(data) {
            this.data = data;
        }
        DataProvider.prototype.getData = function () {
            return this.data;
        };
        DataProvider.prototype.setData = function (newData) {
            this.data = newData;
            return this;
        };
        return DataProvider;
    })();
    DataProvider_1.DataProvider = DataProvider;
})(DataProvider || (DataProvider = {}));
//# sourceMappingURL=DataProvider.js.map