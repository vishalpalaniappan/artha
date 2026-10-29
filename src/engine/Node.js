export class Node {
    constructor(uid, classified) {
        this.uid = uid;
        if (classified) {
            this.name = classified.name;
            this.type = classified.type;
            this.args = classified.args;
            this.definition = classified.definition;
        }
    }

    addBody(body) {
        this.body = body;
    }
}