import "./style.css";

import { Signal } from "./signal/wrapper";
import { effect } from "./signal/effect";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"">Counter</button>
    </div>
    <div id="value"></div>
    <div id="parity"></div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

document
  .querySelector<HTMLButtonElement>("#counter")!
  .addEventListener("click", () => counter.set(counter.get() + 1));

const counter = new Signal.State(0);
const isEven = new Signal.Computed(() => (counter.get() & 1) == 0);
const parity = new Signal.Computed(() => (isEven.get() ? "even" : "odd"));

effect(() => {
  document.querySelector<HTMLDivElement>("#parity")!.innerText = parity.get();
});
