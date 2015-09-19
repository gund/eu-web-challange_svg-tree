/**
 * Created by alex on 9/19/15.
 */

module Tree {

    interface TreeNodeInterface {
        left: number;
        right: number;
    }

    interface BasicTreeInterface {
        nodes: TreeNodeInterface[];
        currentNode: TreeNodeInterface;
    }

    interface TreeTraversalInterface extends BasicTreeInterface {
        getNode():TreeNodeInterface;
        getNodeLevel(node:TreeNodeInterface):number;
        getFirstNode():TreeNodeInterface;
        getLastNode():TreeNodeInterface;
        getNextNode():TreeNodeInterface;
        getPreviousNode():TreeNodeInterface;
        getTreeLength():number;
        getSubTree(node:TreeNodeInterface):TreeNodeInterface[];
        getPathFromNode(node:TreeNodeInterface):TreeNodeInterface[];
    }

}