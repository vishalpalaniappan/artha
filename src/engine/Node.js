export class Node {
    constructor(uid, classified) {
        this.uid = uid;
        this.name = classified.name;
        this.type = classified.type;
        this.args = classified.args;
        this.definition = classified.definition;
        this.errMsg = [];
        this.validate();
    }

    addBody(body) {
        this.body = body;
    }

    validate () {
        // Node doesn't have a primitive definition (ex. behavior or participant)
        if (this.type === "behavior" || this.type === "participant" || this.type === "functional") return;

        // For meta primitives, the args are saved as attributes, else participant
        let definedArgs = this.definition.participants;
        if (this.type === "meta_primitive") {
            definedArgs = this.definition.attributes;
        }

        // For each arg, check if it is included.
        for (const arg of definedArgs) {
            if (arg.required === "true") {
                const hasArg = this.checkArgs(arg.name);
                if (!hasArg) {
                    const errMsg = `${this.type} with name ${this.name} is missing arg ${arg.name}`;
                    this.errMsg.push(errMsg);
                }
            }
        }
    }

    /**
     * Check if the required arg was included in the node.
     * @param {String} name 
     * @returns 
     */
    checkArgs(name) {
        for(const arg of this.args) {
            if (arg.arg === name) {
                return true;
            }
        }
        return false;
    }
}