///<reference path="../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jasmine_jasmine.d.ts"/>
///<reference path="../src/DataProvider.ts"/>
/**
 * Created by alex on 9/19/15.
 */
var DP = DataProvider.DataProvider;
describe('DataProvider module', function () {
    var data = [
        { name: "Cars", left: 1, right: 18 },
        { name: "Fast", left: 2, right: 11 },
        { name: "Red", left: 3, right: 6 },
        { name: "Ferrari", left: 4, right: 5 },
        { name: "Yellow", left: 7, right: 10 },
        { name: "Lamborghini", left: 8, right: 9 },
        { name: "Slow", left: 12, right: 17 },
        { name: "Lada", left: 13, right: 14 },
        { name: "Polonez", left: 15, right: 16 }
    ];
    describe('DataProvider typing mechanism', function () {
        var dataProviderNoParams = new DP();
        var dataProviderWithParams = new DP(data);
        it('should by typed as "DataType"', function () {
            expect(typeof dataProviderNoParams.getData()).toBe(typeof TypeOfData);
        });
        it('should return undefined without initialization', function () {
            expect(dataProviderNoParams.getData()).toBe(undefined);
        });
        it('should return initialized data in constructor', function () {
            expect(dataProviderWithParams.getData()).toBe(data);
        });
        it('should set new data if data was not initialized', function () {
            expect(dataProviderNoParams.setData(data).getData()).toBe(data);
        });
        it('should unset all current data with empty array', function () {
            expect(dataProviderWithParams.setData([]).getData()).toEqual([]);
        });
    });
});
//# sourceMappingURL=DataProviderSpec.js.map