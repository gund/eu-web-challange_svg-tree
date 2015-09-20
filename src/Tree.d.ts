/**
 * Created by alex on 9/19/15.
 */

declare module Tree {

    interface NodeInterface {
        left: number;
        right: number;
    }

    interface BasicTreeInterface {
        nodes: NodeInterface[];
        currentNode: NodeInterface;
        setNodes(nodes:NodeInterface[]):BasicTreeInterface;
    }

    interface TreeTraversalInterface extends BasicTreeInterface {
        getNode(left:number, right:number):NodeInterface;
        getNodeChildren(node:NodeInterface):number;
        getFirstNode():NodeInterface;
        getLastNode():NodeInterface;
        getNextNode():NodeInterface;
        getPreviousNode():NodeInterface;
        getTreeLength():number;
        getSubTree(node:NodeInterface, nonStrict?:boolean):NodeInterface[];
        getPathFromNode(node:NodeInterface):NodeInterface[];
    }

}