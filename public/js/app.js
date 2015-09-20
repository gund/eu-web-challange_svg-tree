///<reference path="DataProvider.d.ts"/>
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
///<reference path="Tree.d.ts"/>
/**
 * Created by alex on 9/19/15.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Tree;
(function (Tree) {
    var Node = (function () {
        function Node(left, right) {
            this.left = left || 0;
            this.right = right || 0;
        }
        return Node;
    })();
    Tree.Node = Node;
    var BasicTree = (function () {
        function BasicTree(data) {
            this.nodes = data || [];
            this.currentNode = this.nodes[0] || null;
        }
        BasicTree.prototype.setNodes = function (nodes) {
            this.nodes = nodes || [];
            this.currentNode = this.nodes[0] || null;
            return this;
        };
        return BasicTree;
    })();
    Tree.BasicTree = BasicTree;
    var TreeTraversal = (function (_super) {
        __extends(TreeTraversal, _super);
        function TreeTraversal(data) {
            _super.call(this, data);
            this.minLeft = 0;
            this.maxLeft = 0;
            this.minRight = 0;
            this.maxRight = 0;
            this._calculateLimits();
        }
        TreeTraversal.prototype._calculateLimits = function () {
            if (this.nodes.length === 0)
                return;
            this.minLeft = this.nodes[0].left;
            this.maxLeft = this.nodes[this.nodes.length - 1].left;
            this.minRight = Math.min.apply(Math, this.nodes.map(function (node) {
                return node.right;
            }));
            this.maxRight = this.nodes[0].right;
        };
        TreeTraversal.prototype._isInRange = function (left, right) {
            return !(left < this.minLeft || left > this.maxLeft ||
                right < this.minRight || right > this.maxRight);
        };
        TreeTraversal.prototype._getNodeNumber = function (left, right) {
            if (!this._isInRange(left, right))
                return 0;
            for (var i = this.nodes.length - 1; i >= 0; --i)
                if (this.nodes[i].left === left && this.nodes[i].right === right)
                    return i;
            return 0;
        };
        TreeTraversal.prototype.setNodes = function (nodes) {
            _super.prototype.setNodes.call(this, nodes);
            this._calculateLimits();
            return this;
        };
        TreeTraversal.prototype.getNode = function (left, right) {
            if (!this._isInRange(left, right))
                return null;
            return this.nodes[this._getNodeNumber(left, right)];
        };
        TreeTraversal.prototype.getNodeChildren = function (node) {
            if (!node || !this._isInRange(node.left, node.right))
                return 0;
            return Math.ceil((node.right + node.left - 1) / 2);
        };
        TreeTraversal.prototype.getFirstNode = function () {
            return this.nodes[0] || null;
        };
        TreeTraversal.prototype.getLastNode = function () {
            return this.nodes[this.nodes.length - 1] || null;
        };
        TreeTraversal.prototype.getNextNode = function () {
            var currentNodeNum = this._getNodeNumber(this.currentNode.left, this.currentNode.right);
            this.currentNode = this.nodes[Math.min(currentNodeNum + 1, this.nodes.length - 1)];
            return this.currentNode;
        };
        TreeTraversal.prototype.getPreviousNode = function () {
            var currentNodeNum = this._getNodeNumber(this.currentNode.left, this.currentNode.right);
            this.currentNode = this.nodes[Math.max(currentNodeNum - 1, 0)];
            return this.currentNode;
        };
        TreeTraversal.prototype.getTreeLength = function () {
            return this.nodes.length;
        };
        TreeTraversal.prototype.getSubTree = function (node, nonStrict) {
            if (nonStrict === void 0) { nonStrict = false; }
            if (!this._isInRange(node.left, node.right))
                return [];
            return this.nodes.filter(function (nodeLocal) {
                if (nonStrict)
                    return nodeLocal.left >= node.left && nodeLocal.right <= node.right;
                else
                    return nodeLocal.left > node.left && nodeLocal.right < node.right;
            });
        };
        TreeTraversal.prototype.getPathFromNode = function (node) {
            if (!this._isInRange(node.left, node.right))
                return [];
            return this.nodes.filter(function (nodeLocal) {
                return nodeLocal.left < node.left && nodeLocal.right > node.right;
            });
        };
        return TreeTraversal;
    })(BasicTree);
    Tree.TreeTraversal = TreeTraversal;
})(Tree || (Tree = {}));
//# sourceMappingURL=Tree.js.map
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
    // Check if SVG supported
    if (!SVG.supported) {
        alert('SVG not supported');
        return;
    }
    // Default sample data
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
    // Prepare main objects for app
    var draw = SVG('svg-drawing');
    var input = document.querySelector('textarea.input-data');
    var errorBlock = document.querySelector('.error-block');
    var data = new DataProvider.DataProvider(staticData);
    var myTree = new Tree.TreeTraversal(data.getData());
    var skippedNodes = [];
    // Initialize svg
    draw.viewbox({ x: 0, y: 0, width: 500, height: 500 });
    draw.spof();
    window.addEventListener('resize', function () { return draw.spof(); });
    // Toggle nodes tree event handler
    $(draw.node).on('click', 'g', function (e) {
        e.stopPropagation();
        var group = $(e.currentTarget);
        var child = group.find('g').slideToggle();
        if (skippedNodes.indexOf(group.data('node')) === -1) {
            // Try to add node to hidden state (if not last in subtree)
            if (child.length > 0)
                skippedNodes.push(group.data('node'));
        }
        else {
            // Remove node from hidden state
            var idx = skippedNodes.indexOf(group.data('node'));
            skippedNodes.splice(idx, 1);
        }
        _updateData(); // Render data to SVG
    });
    // Watch changes on input
    var timer = 0;
    input.addEventListener('keyup', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            try {
                // Parse input tree
                var parsedNodes = JSON.parse(input.value);
                data.setData(parsedNodes); // Set to data provider
                myTree.setNodes(data.getData()); // Copy to tree
                _updateData(); // Render data to SVG
                _triggerError(); // Update error block state (remove if no error)
            }
            catch (e) {
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
        var right = [], parentGroup = [draw.group().attr('data-node', 0)], topOffset = 0, skipNode = null, skippingSubNode = false;
        // Loop by tree
        for (var i = 0; i < myTree.nodes.length; ++i) {
            // Draw node for skipped subtree
            if (!skippingSubNode && skippedNodes.indexOf(i) !== -1) {
                skippingSubNode = true;
                skipNode = { left: myTree.nodes[i].left, right: myTree.nodes[i].right };
            }
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
    function _renderNode(node, x, y, parent) {
        if (parent === void 0) { parent = []; }
        // Create text node
        var text = draw.text(node.name).dx(x).dy(y);
        // Append it to parent group
        if (parent.length > 0)
            parent[parent.length - 1].add(text);
    }
    function _renderDataToInput() {
        // Output tree to input control
        input.value = "[\n" + data.getData().map(function (node) {
            return JSON.stringify(node);
        }).join(",\n") + "\n]";
    }
    var timerError = 0;
    function _triggerError(e) {
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
//# sourceMappingURL=main.js.map