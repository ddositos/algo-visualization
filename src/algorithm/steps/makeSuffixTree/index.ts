import { addTransition } from "../../../controller";
import { AppendPairIndicesTransition, RemoveRepeatingPairsTransition } from "../../../transitions";
import {
    ShowArrayTransition,
    SortPairsByFirstElementTransition,
    SortPairsBySecondElementTransition,
    SplitIntoPairsTransition,
} from "../../../transitions";
import HighlightRepeatingPairsTransition from "../../../transitions/HighlightRepeatingPairsTransition";
import { Leaf, Root } from "../../class";
import { character } from "../../types";
import reindex from "./reindex";
import splitIntoPairs from "./splitIntoPairs";
import stableSort from "./stableSort";
import unique from "./unique";

export function makeSuffixTree(string: string): Root<string> {
    return suffixTree([...string]);
}

function suffixTree<T extends character>(word: T[]): Root<T> {
    let pairs = splitIntoPairs(word);
	addTransition(new ShowArrayTransition(pairs));

    // Тривиальный случай.
    if (word.length == 1) {
        const root = new Root<T>();
        root.edges.push(new Leaf(word, 0));
        return root;
    }

    addTransition(new SplitIntoPairsTransition(pairs));

    pairs = stableSort(pairs, (pair) => pair.second);
    addTransition(new SortPairsBySecondElementTransition(pairs));

    pairs = stableSort(pairs, (pair) => pair.first);
    addTransition(new SortPairsByFirstElementTransition(pairs));

    const _unique = unique(pairs);
    addTransition(new HighlightRepeatingPairsTransition(pairs, _unique));
    addTransition(new RemoveRepeatingPairsTransition(_unique));

    const compressed = reindex(pairs, _unique);
    addTransition(new AppendPairIndicesTransition(compressed));

    const tree = suffixTree(compressed);
    // TODO: transition
}
