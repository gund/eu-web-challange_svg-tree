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