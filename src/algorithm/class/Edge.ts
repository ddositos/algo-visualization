import ICloneable from "../interface/ICloneable";
import { character, word } from "../types";

let edge_id = 0;

function getEdgeId() {
    return edge_id++;
}

// Ребро сжатого суффиксного дерева.
// Содержит массив исходящих ребер.
// Ребра упорядочены по первому символу.
export default class Edge<T extends character> implements ICloneable<Edge<T>> {
    public children: Edge<T>[] = [];
    public label: T[];
    public type: "odd" | "even" | null = null;

    public id: number;

    public constructor(label: T[]) {
        this.id = getEdgeId();
        this.label = label;
    }

    clone(): Edge<T> {
        const clone = new Edge<T>([...this.label]);
        clone.id = this.id;
        clone.type = this.type;
        clone.children = this.children.map((child) => child.clone());
        return clone;
    }

    /*
    public toString(): string {
        return this.getStringView(0);
    }

    private getStringView(depth: number): string {
        return this.children
            .map((edge) => "\t".repeat(depth) + edge.letters.join("") + "\n" + edge.getStringView(depth + 1))
            .join("");
    }
	*/
}
