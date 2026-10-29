export class Node {
    constructor(node) {
        this.uid = node.uid;
        this.type = node.type;
    }

    addBody(body) {
        this.body = body;
    }
}