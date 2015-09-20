///<reference path="../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jasmine_jasmine.d.ts"/>
///<reference path="../src/app/DataProvider.ts"/>

/**
 * Created by alex on 9/19/15.
 */

import DP = DataProvider.DataProvider;

interface DataType {
    name:string;
    left:number;
    right:number;
}

declare var TypeOfData: DataType;

describe('DataProvider module', () => {

    var data = [
        {name: "Cars", left: 1, right: 18},
        {name: "Fast", left: 2, right: 11},
        {name: "Red", left: 3, right: 6},
        {name: "Ferrari", left: 4, right: 5},
        {name: "Yellow", left: 7, right: 10},
        {name: "Lamborghini", left: 8, right: 9},
        {name: "Slow", left: 12, right: 17},
        {name: "Lada", left: 13, right: 14},
        {name: "Polonez", left: 15, right: 16}
    ];

    describe('DataProvider typing mechanism', () => {
        var dataProviderNoParams:DP<DataType> = new DP<DataType>();
        var dataProviderWithParams:DP<DataType> = new DP<DataType>(data);

        it('should by typed as "DataType"', () => {
            expect(typeof dataProviderNoParams.getData()).toBe(typeof TypeOfData);
        });

        it('should return undefined without initialization', () => {
            expect(dataProviderNoParams.getData()).toBe(undefined);
        });

        it('should return initialized data in constructor', () => {
            expect(dataProviderWithParams.getData()).toBe(data);
        });

        it('should set new data if data was not initialized', () => {
            expect(dataProviderNoParams.setData(data).getData()).toBe(data);
        });

        it('should unset all current data with empty array', () => {
            expect(dataProviderWithParams.setData([]).getData()).toEqual([]);
        });
    });

});