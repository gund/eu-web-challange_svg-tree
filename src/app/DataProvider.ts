///<reference path="DataProvider.d.ts"/>
/**
 * Created by alex on 9/19/15.
 */

module DataProvider {

    export class DataProvider<T> implements DataProviderInterface<T> {
        data:T[];

        getData():T[] {
            return this.data;
        }

        setData(newData:T[]):DataProvider<T> {
            this.data = newData;
            return this;
        }

        constructor();
        constructor(dataInit: T[]);
        constructor(data?: any) {
            this.data = data;
        }
    }

}