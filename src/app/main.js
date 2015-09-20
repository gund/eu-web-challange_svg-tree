///<reference path="../../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_svgjs_svgjs.d.ts"/>
///<reference path="Tree.ts"/>
///<reference path="DataProvider.ts"/>
///<reference path="../../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jquery_jquery.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by alex on 9/20/15.
 */
var MyNode = (function (_super) {
    __extends(MyNode, _super);
    function MyNode() {
        _super.apply(this, arguments);
    }
    return MyNode;
})(Tree.Node);
(function () {
    "use strict";
    if (!SVG.supported) {
        alert('SVG not supported');
        return;
    }
    var staticData = [
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
    var topIndent = 30, leftIndent = 20;
    var draw = SVG('svg-drawing');
    var input = document.querySelector('textarea.input-data');
    var errorBlock = document.querySelector('.error-block');
    var data = new DataProvider.DataProvider(staticData);
    var myTree = new Tree.TreeTraversal(data.getData());
    var skippedNodes = [];
    // Init svg
    draw.viewbox({ x: 0, y: 0, width: 500, height: 500 });
    draw.spof();
    window.addEventListener('resize', function () { return draw.spof(); });
    // Toggle nodes tree
    $(draw.node).on('click', 'g', function (e) {
        e.stopPropagation();
        var group = $(e.currentTarget);
        var child = group.find('g').slideToggle();
        if (skippedNodes.indexOf(group.data('node')) === -1) {
            if (child.length > 0)
                skippedNodes.push(group.data('node'));
        }
        else {
            var idx = skippedNodes.indexOf(group.data('node'));
            skippedNodes.splice(idx, 1);
        }
        _updateData();
    });
    // Watch changes on input
    var timer = 0;
    input.addEventListener('keyup', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            try {
                var parsedNodes = JSON.parse(input.value);
                data.setData(parsedNodes);
                myTree.setNodes(data.getData());
                _updateData();
                _triggerError();
            }
            catch (e) {
                _triggerError(e);
            }
        }, 500);
    }, false);
    // Load static data to input
    _renderDataToInput();
    _updateData();
    function _updateData() {
        draw.clear();
        var right = [], parentGroup = [draw.group().attr('data-node', 0)], topOffset = 0, currSkip = null;
        for (var i = 0; i < myTree.nodes.length; ++i) {
            // Skip
            if (!currSkip && skippedNodes.indexOf(i) !== -1) {
                currSkip = { left: myTree.nodes[i].left, right: myTree.nodes[i].right };
            }
            else if (currSkip) {
                if (myTree.nodes[i].right > currSkip.right)
                    currSkip = null;
                else {
                    ++topOffset;
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
    function _renderNode(node, x, y, parent) {
        if (parent === void 0) { parent = []; }
        var text = draw.text(node.name).dx(x).dy(y);
        if (parent.length > 0)
            parent[parent.length - 1].add(text);
    }
    function _renderDataToInput() {
        input.value = "[\n" + data.getData().map(function (node) {
            return JSON.stringify(node);
        }).join(",\n") + "\n]";
    }
    var timerError = 0;
    function _triggerError(e) {
        clearTimeout(timerError);
        if (!e) {
            errorBlock.classList.remove('shown');
            return;
        }
        errorBlock.innerHTML = e;
        errorBlock.classList.add('shown');
    }
})();
//# sourceMappingURL=main.js.map