import { Utils } from "./utils";

export class BaseRoute {
    depth: number = 0;
    path = '';
    namespace = '';
    directChildren: string[] = [];
    deepChildren: BaseRoute[] = [];

    constructor(name: string, path: string, depth: number) {
        this.namespace = Utils.capitalizeAndRemoveHighDash(name);
        this.path = path;
        this.depth = depth;
    }

    indent(control: number = 0) {
        return '    '.repeat(this.depth + 1 + control);
    }

    addDirectChild(child: string) {
        this.directChildren.push(child);
    }

    addDeepChild(child: BaseRoute) {
        this.deepChildren.push(child);
    }

    stringifyPath() {
        return `export const path = "${this.path}";\n`;
    }

    stringifyDirectChildren() {
        return this.directChildren.map(child => `export const ${Utils.capitalizeAndRemoveHighDash(child)} = { path: "${this.path}/${child}" };`).join('\n' + this.indent());
    }

    stringifyDeepChildren(): string {
        return this.deepChildren.map(child => child.stringifyToNamespace()).join('\n\n' + this.indent());
    }

    stringifyToNamespace() {
        let namespace = `export namespace ${this.namespace} {
${this.indent()}${this.stringifyPath()}
${this.indent()}${this.stringifyDirectChildren()}
${this.indent()}${this.stringifyDeepChildren()}
${this.indent(-1)}}`;

        if (this.namespace === 'Routes') {
            namespace = namespace.replace('const path = ""', 'const path = "/"');
        }

        return namespace;
    }
}
