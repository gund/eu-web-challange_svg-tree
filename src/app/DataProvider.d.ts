/**
 * Created by alex on 9/19/15.
 */

declare module DataProvider {

    interface DataProviderInterface<T> {
        data: T[];
        getData(): T[];
        setData(newData:T[]):DataProviderInterface<T>;
    }

}