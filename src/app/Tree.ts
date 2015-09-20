///<reference path="Tree.d.ts"/>
/**
 * Created by alex on 9/19/15.
 */

module Tree {

    export class Node implements NodeInterface {
        left:number;
        right:number;

        constructor();
        constructor(left:number, right:number);
        constructor(left?:any, right?:any) {
            this.left = left || 0;
            this.right = right || 0;
        }
    }

    export class BasicTree implements BasicTreeInterface {
        nodes:NodeInterface[];
        currentNode:NodeInterface;

        constructor();
        constructor(data:NodeInterface[]);
        constructor(data?:any) {
            this.nodes = data || [];
            this.currentNode = this.nodes[0] || null;
        }

        setNodes(nodes:Tree.NodeInterface[]):BasicTreeInterface {
            this.nodes = nodes || [];
            this.currentNode = this.nodes[0] || null;
            return this;
        }
    }

    export class TreeTraversal extends BasicTree implements TreeTraversalInterface {
        nodes:NodeInterface[];
        currentNode:NodeInterface;

        protected minLeft = 0;
        protected maxLeft = 0;
        protected minRight = 0;
        protected maxRight = 0;

        constructor(data?:any) {
            super(data);
            this._calculateLimits();
        }

        private _calculateLimits() {
            if (this.nodes.length === 0) return;
            this.minLeft = this.nodes[0].left;
            this.maxLeft = this.nodes[this.nodes.length - 1].left;
            this.minRight = Math.min.apply(Math, this.nodes.map((node:NodeInterface) => {
                return node.right;
            }));
            this.maxRight = this.nodes[0].right;
        }

        private _isInRange(left:number, right:number) {
            return !(left < this.minLeft || left > this.maxLeft ||
            right < this.minRight || right > this.maxRight);
        }

        private _getNodeNumber(left:number, right:number):number {
            if (!this._isInRange(left, right)) return 0;

            for (var i = this.nodes.length - 1; i >= 0; --i)
                if (this.nodes[i].left === left && this.nodes[i].right === right)
                    return i;

            return 0;
        }

        setNodes(nodes:Tree.NodeInterface[]):BasicTreeInterface {
            super.setNodes(nodes);
            this._calculateLimits();
            return this;
        }

        getNode(left:number, right:number):NodeInterface {
            if (!this._isInRange(left, right)) return null;
            return this.nodes[this._getNodeNumber(left, right)];
        }

        getNodeChildren(node:NodeInterface):number {
            if (!node || !this._isInRange(node.left, node.right)) return 0;
            return Math.ceil((node.right + node.left - 1) / 2);
        }

        getFirstNode():NodeInterface {
            return this.nodes[0] || null;
        }

        getLastNode():NodeInterface {
            return this.nodes[this.nodes.length - 1] || null;
        }

        getNextNode():NodeInterface {
            var currentNodeNum = this._getNodeNumber(this.currentNode.left, this.currentNode.right);
            this.currentNode = this.nodes[Math.min(currentNodeNum + 1, this.nodes.length - 1)];
            return this.currentNode;
        }

        getPreviousNode():NodeInterface {
            var currentNodeNum = this._getNodeNumber(this.currentNode.left, this.currentNode.right);
            this.currentNode = this.nodes[Math.max(currentNodeNum - 1, 0)];
            return this.currentNode;
        }

        getTreeLength():number {
            return this.nodes.length;
        }

        getSubTree(node:NodeInterface, nonStrict = false):NodeInterface[] {
            if (!this._isInRange(node.left, node.right)) return [];
            return this.nodes.filter((nodeLocal:NodeInterface) => {
                if (nonStrict) return nodeLocal.left >= node.left && nodeLocal.right <= node.right;
                else return nodeLocal.left > node.left && nodeLocal.right < node.right;
            });
        }

        getPathFromNode(node:NodeInterface):NodeInterface[] {
            if (!this._isInRange(node.left, node.right)) return [];
            return this.nodes.filter((nodeLocal:NodeInterface) => {
                return nodeLocal.left < node.left && nodeLocal.right > node.right;
            });
        }

    }

}