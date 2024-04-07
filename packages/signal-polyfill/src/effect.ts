// This function would usually live in a library/framework, not application code

import { Signal } from "./wrapper";

// NOTE: This scheduling logic is too basic to be useful. Do not copy/paste.
let pending = false;

let w = new Signal.subtle.Watcher(() => {
    if (!pending) {
        pending = true;
        queueMicrotask(() => {
            pending = false;
            for (let s of w.getPending()) s.get();
            w.watch();
        });
    }
});

// An effect effect Signal which evaluates to cb, which schedules a read of
// itself on the microtask queue whenever one of its dependencies might change
export function effect(cb: Function) {
    let destructor:any;
    let c = new Signal.Computed(() => { destructor?.(); destructor = cb(); });
    w.watch(c);
    c.get();
    return () => { destructor?.(); w.unwatch(c) };
}