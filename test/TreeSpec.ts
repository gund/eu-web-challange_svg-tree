///<reference path="../../../../../Users/alex/Library/Preferences/WebStorm11/javascript/extLibs/http_github.com_borisyankov_DefinitelyTyped_raw_master_jasmine_jasmine.d.ts"/>
///<reference path="../src/app/Tree.ts"/>

import TreeNode = Tree.Node;
import BasicTree = Tree.BasicTree;
import TreeTraversal = Tree.TreeTraversal;
import NodeInterface = Tree.NodeInterface;

/**
 * Created by alex on 9/19/15.
 */

describe('Tree module', () => {

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

    describe('Node class', () => {
        var node:TreeNode = new TreeNode();
        var nodeInitialized:TreeNode = new TreeNode(2, 4);

        it('should have left and right node numbers "0"', () => {
            expect(node.left).toBeDefined();
            expect(node.right).toBeDefined();
        });

        it('should have left and right as (2,4)', () => {
            expect(nodeInitialized.left).toBe(2);
            expect(nodeInitialized.right).toBe(4);
        });
    });

    var nodesArray = [];
    for (let i = 0; i < data.length; ++i) {
        nodesArray.push(new TreeNode(data[i].left, data[i].right));
    }

    describe('BasicTree class', () => {
        var treeBasic:BasicTree = new BasicTree();
        var treeBasicWithData:BasicTree = new BasicTree(nodesArray);

        testBasicTree(treeBasic, treeBasicWithData);
    });

    describe('TreeTraversal class', () => {
        var tree:TreeTraversal = new TreeTraversal();
        var treeWithData:TreeTraversal = new TreeTraversal(nodesArray);
        var treeEmpty:TreeTraversal = new TreeTraversal();

        testBasicTree(tree, treeWithData);

        // Extended features

        it('should get node (7,10)', () => {
            expect(treeWithData.getNode(7, 10)).toBe(nodesArray[4]);
        });

        it('should return "null" if no node found', () => {
            expect(treeWithData.getNode(16, 17)).toBe(null);
        });

        it('should return "null" if nodes empty', () => {
            expect(treeEmpty.getNode(1, 2)).toBe(null);
        });

        it('should return first node if nodes array were set manually', () => {
            var myTree:TreeTraversal = new TreeTraversal(nodesArray);
            myTree.nodes = [nodesArray[0], nodesArray[1]];
            expect(myTree.getNode(3, 6)).toBe(nodesArray[0]);
        });

        it('should return node children count', () => {
            expect(treeWithData.getNodeChildren(nodesArray[2])).toBe(4);
        });

        it('should return "0" children count for non existing node', () => {
            expect(treeWithData.getNodeChildren(nodesArray[9])).toBe(0);
        });

        it('should return first node', () => {
            expect(treeWithData.getFirstNode()).toBe(nodesArray[0]);
        });

        it('should return null as first node if empty nodes', () => {
            expect(treeEmpty.getFirstNode()).toBe(null);
        });

        it('should return last node', () => {
            expect(treeWithData.getLastNode()).toBe(nodesArray[nodesArray.length - 1]);
        });

        it('should return null as last node if empty nodes', () => {
            expect(treeEmpty.getLastNode()).toBe(null);
        });

        it('should return second and third node', () => {
            expect(treeWithData.getNextNode()).toBe(nodesArray[1]);
            expect(treeWithData.getNextNode()).toBe(nodesArray[2]);
        });

        it('should return last node even if current is last', () => {
            treeWithData.currentNode = nodesArray[nodesArray.length - 1];
            expect(treeWithData.getNextNode()).toBe(nodesArray[nodesArray.length - 1]);
        });

        it('should return second if current not exist', () => {
            treeWithData.currentNode = {left: 1, right: 2};
            expect(treeWithData.getNextNode()).toBe(nodesArray[1]);
        });

        it('should return node before and before before last', () => {
            treeWithData.currentNode = nodesArray[nodesArray.length - 1];
            expect(treeWithData.getPreviousNode()).toBe(nodesArray[nodesArray.length - 2]);
            expect(treeWithData.getPreviousNode()).toBe(nodesArray[nodesArray.length - 3]);
        });

        it('should return first node even if current is first', () => {
            treeWithData.currentNode = nodesArray[0];
            expect(treeWithData.getPreviousNode()).toBe(nodesArray[0]);
        });

        it('should return first node if current not exist', () => {
            treeWithData.currentNode = {left: 1, right: 2};
            expect(treeWithData.getPreviousNode()).toBe(nodesArray[0]);
        });

        it('should return "0" length for empty tree', () => {
            expect(treeEmpty.getTreeLength()).toBe(0);
        });

        it('should return actual tree length', () => {
            expect(treeWithData.getTreeLength()).toBe(nodesArray.length);
        });

        it('should return subtree for second node (2,11)', () => {
            expect(treeWithData.getSubTree(nodesArray[1])).toEqual(nodesArray.filter((node:NodeInterface) => {
                return node.left > 2 && node.right < 11;
            }));
        });

        it('should return subtree for second node (2,11) including it', () => {
            expect(treeWithData.getSubTree(nodesArray[1], true)).toEqual(nodesArray.filter((node:NodeInterface) => {
                return node.left >= 2 && node.right <= 11;
            }));
        });

        it('should return empty subtree for last element', () => {
            expect(treeWithData.getSubTree(nodesArray[nodesArray.length - 1])).toEqual([]);
        });

        it('should return last element from subtree for last element when non strict', () => {
            expect(treeWithData.getSubTree(nodesArray[nodesArray.length - 1], true)).toEqual([nodesArray[nodesArray.length - 1]]);
        });

        it('should return empty subtree for non existing element', () => {
            expect(treeWithData.getSubTree({left: 1, right: 2})).toEqual([]);
        });

        it('should return path to node (4,5)', () => {
            expect(treeWithData.getPathFromNode(nodesArray[3])).toEqual(nodesArray.filter((node:NodeInterface) => {
                return node.left < 4 && node.right > 5;
            }));
        });

        it('should return empty path for first element', () => {
            expect(treeWithData.getPathFromNode(nodesArray[0])).toEqual([]);
        });

        it('should return empty path for non existing element', () => {
            expect(treeWithData.getPathFromNode({left: 1, right: 2})).toEqual([]);
        });
    });

    function testBasicTree(tree:BasicTree, treeWithData:BasicTree) {
        it('should have nodes array and currentNode', () => {
            expect(tree.nodes).toEqual([]);
            expect(tree.currentNode).toBeDefined();
        });

        it('should initialize nodes array via constructor\'s data', () => {
            expect(treeWithData.nodes).toBe(nodesArray);
        });

        it('should initialize currentNode to first element in nodes', () => {
            expect(treeWithData.currentNode).toBe(nodesArray[0]);
        });

        it('should set nodes via setData()', () => {
            expect(tree.setNodes(nodesArray).nodes).toBe(nodesArray);
        });

        it('should set currentNode to first in nodes via setData()', () => {
            expect(tree.currentNode).toBe(nodesArray[0]);
        });
    }

});