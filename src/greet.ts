/**
 * Created by alex on 9/19/15.
 */

module Greet {

    export interface GreeterInterface {
        name: string;
        greet():string;
    }

    export class Greeter implements GreeterInterface {
        name:string;

        constructor(name: string) {
            this.name = name;
        }

        greet():string {
            return 'Hello, ' + this.name;
        }

    }

}