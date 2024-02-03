import { useContext } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { CounterContext, TabContext } from "../contexts/context.js";
import { Counter } from "./Counter.jsx";
import { useMemo } from "react";

export function CounterList() {
    const counterData = useContext(CounterContext);
    const visibleTab = useContext(TabContext);
    const updateTitle = useDocumentTitle("Clicks: " + counterData.map((counter) => {
        return counter.total;
    }).join(', '));
    const filteredCounterData = useMemo(() => {
        return counterData.filter(counter => { return counter.tab === visibleTab });
    }, [counterData, visibleTab]);
    return (
        <section>
            { counterData.map((counter) => (
                <Counter counter={counter} key={counter.id} />
            ))}
        </section>
    )
}

