///<reference path="../../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_svgjs_svgjs.d.ts"/>
///<reference path="Tree.ts"/>
///<reference path="DataProvider.ts"/>
///<reference path="../../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jquery_jquery.d.ts"/>

import Parent = svgjs.Parent;
/**
 * Created by alex on 9/20/15.
 */

class MyNode extends Tree.Node {
    name:string;
}

(() => {
    "use strict";

    // Check if SVG supported
    if (!SVG.supported) {
        alert('SVG not supported');
        return;
    }

    // Default sample data
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
    var topIndent = 25, leftIndent = 20;

    // Prepare main objects for app
    var draw:svgjs.Doc = SVG('svg-drawing');
    var input:HTMLTextAreaElement = <HTMLTextAreaElement>document.querySelector('textarea.input-data');
    var errorBlock:HTMLDivElement = <HTMLDivElement>document.querySelector('.error-block');
    var data:DataProvider.DataProvider<MyNode> = new DataProvider.DataProvider<MyNode>(staticData);

    var myTree:Tree.TreeTraversal = new Tree.TreeTraversal(data.getData());
    var skippedNodes:number[] = [];

    // Initialize svg
    draw.viewbox({x: 0, y: 0, width: 500, height: 500});
    draw.spof();
    window.addEventListener('resize', () => draw.spof());

    // Toggle nodes tree event handler
    $(draw.node).on('click', 'g', (e) => {
        e.stopPropagation();
        var group = $(e.currentTarget);
        var child = group.find('g').slideToggle();

        if (skippedNodes.indexOf(group.data('node')) === -1) {
            // Try to add node to hidden state (if not last in subtree)
            if (child.length > 0) skippedNodes.push(group.data('node'));
        } else {
            // Remove node from hidden state
            var idx = skippedNodes.indexOf(group.data('node'));
            skippedNodes.splice(idx, 1);
        }
        _updateData(); // Render data to SVG
    });

    // Watch changes on input
    var timer = 0;
    input.addEventListener('keyup', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            try {
                // Parse input tree
                var parsedNodes:MyNode[] = <MyNode[]>JSON.parse(input.value);
                data.setData(parsedNodes); // Set to data provider
                myTree.setNodes(data.getData()); // Copy to tree

                _updateData(); // Render data to SVG
                _triggerError(); // Update error block state (remove if no error)
            } catch (e) {
                // Report about parsing error
                _triggerError(e);
            }
        }, 500);
    }, false);

    // Load static data to input
    _renderDataToInput();
    // Render data to SVG
    _updateData();

    function _updateData() {
        draw.clear();

        var right = [], parentGroup = [draw.group().attr('data-node', 0)],
            topOffset = 0, skipNode:Tree.Node = null, skippingSubNode = false;

        // Loop by tree
        for (let i = 0; i < myTree.nodes.length; ++i) {
            // Draw node for skipped subtree
            if (!skippingSubNode && skippedNodes.indexOf(i) !== -1) {
                skippingSubNode = true;
                skipNode = {left: myTree.nodes[i].left, right: myTree.nodes[i].right};
            }
            // Skipp subtree
            else if (skippingSubNode) {
                if (myTree.nodes[i].left > skipNode.left && myTree.nodes[i].right < skipNode.right) {
                    ++topOffset;

                    // Check next node (if exists)
                    if (i < myTree.nodes.length - 1 &&
                        (myTree.nodes[i + 1].left < skipNode.left || myTree.nodes[i + 1].right > skipNode.right))
                        skippingSubNode = false;

                    continue;
                }
            }

            // Manage indent and parents
            if (right.length > 0)
                while (right[right.length - 1] < myTree.nodes[i].right) {
                    right.pop();
                    parentGroup.pop();
                }
            right.push(myTree.nodes[i].right);
            if (i > 0 && myTree.nodes[i - 1].left < myTree.nodes[i].left) {
                parentGroup.push(draw.group());
                parentGroup[parentGroup.length - 1].attr('data-node', i);
                parentGroup[parentGroup.length - 2].add(parentGroup[parentGroup.length - 1]);
            }

            // Draw node
            _renderNode(myTree.nodes[i], right.length * leftIndent, topIndent * (i - topOffset), parentGroup);
        }
    }

    function _renderNode(node:Tree.Node, x:number, y:number, parent = []) {
        // Create text node
        var text = draw.text(node.name).dx(x).dy(y);

        // Append it to parent group
        if (parent.length > 0) parent[parent.length - 1].add(text);
    }

    function _renderDataToInput() {
        // Output tree to input control
        input.value = "[\n" + data.getData().map((node:MyNode) => {
                return JSON.stringify(node);
            }).join(",\n") + "\n]";
    }

    var timerError = 0;

    function _triggerError(e?) {
        clearTimeout(timerError);

        // If no error - hide error block
        if (!e) {
            errorBlock.classList.remove('shown');
            return;
        }

        // Otherwise show
        errorBlock.innerHTML = e;
        errorBlock.classList.add('shown');
    }

})();