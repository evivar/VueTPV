"use strict";

class Tree {

    /**
     * Tree class constructor
     * @param {*} rootNode : Tree root node. The underscore(_) means that this object's property is private
     *
     */
    constructor(rootNode) {
        this._rootNode = rootNode || null;
    }

    /**
     * This function traverses the tree and returns all its nodes and their children.
     * @param {*} callback
     */
    _traverse(callback) {
        const self = this;

        function goThrough(node) {
            callback(node);
            node.children.forEach((child) => {
                goThrough(child);
            });
        }
        goThrough(this._rootNode, dash);
    }

    addNode(parentNode, childNode) {
        if (this._rootNode === null) {
            this._rootNode
        }
    }

}



module.exports = Tree;