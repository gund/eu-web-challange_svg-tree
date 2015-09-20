///<reference path="../../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_svgjs_svgjs.d.ts"/>
///<reference path="Tree.ts"/>
///<reference path="DataProvider.ts"/>

/**
 * Created by alex on 9/20/15.
 */

class MyNode extends Tree.Node {
    name:string;
}

(() => {
    "use strict";

    if (!SVG.supported) {
        alert('SVG not supported');
        return;
    }

    var staticData:MyNode[] = [
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

    var draw:svgjs.Doc = SVG('svg-drawing');
    var input:HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector('textarea.input-data');
    var errorBlock:HTMLDivElement = <HTMLDivElement>document.querySelector('.error-block');
    var data:DataProvider.DataProvider<MyNode> = new DataProvider.DataProvider<MyNode>(staticData);

    var myTree:Tree.TreeTraversal = new Tree.TreeTraversal(data.getData());

    // Init svg
    //draw.spof();
    //window.addEventListener('resize', () => draw.spof());

    // Load static data to input
    _renderDataToInput();
    _updateData();

    // Watch changes on input
    var timer = 0;
    input.addEventListener('keyup', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                var parsedNodes:MyNode[] = <MyNode[]>JSON.parse(input.value);
                data.setData(parsedNodes);
                myTree.setNodes(data.getData());
                _updateData();
                _triggerError();
            } catch (e) {
                _triggerError(e);
            }
        }, 500);
    }, false);

    function _updateData() {
        draw.clear();

        var right = [];

        for (let i = 0; i < myTree.nodes.length; ++i) {
            if (right.length > 0)
                while (right[right.length - 1] < myTree.nodes[i].right)
                    right.pop();

            _renderNode(myTree.nodes[i], right.length * 30, 30 * i);

            right.push(myTree.nodes[i].right);
        }
    }

    function _renderNode(node:Tree.Node, x:number, y:number) {
        var text = draw.text(node.name).dx(x).dy(y);
    }

    function _renderDataToInput() {
        input.value = "[\n" + data.getData().map((node:MyNode) => {
                return JSON.stringify(node);
            }).join(",\n") + "\n]";
    }

    var timerError = 0;

    function _triggerError(e?) {
        clearTimeout(timerError);
        if (!e) {
            errorBlock.classList.remove('shown');
            return;
        }
        errorBlock.innerHTML = e;
        errorBlock.classList.add('shown');
    }

})();