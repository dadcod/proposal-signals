/**
 * CurrencyConverter is a custom HTML element that represents a currency converter component.
 * @extends HTMLElement
 */
class CurrencyConverter extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
            <style>
                div{display:flex; gap:12px; margin-top:12px;}
            </style>

            <p>Currency Converter Component</p>
            <span> Rate of USD/BGN is <span id="rate"></span> </span>
            <button id="update">Update rate</button>
            <div>
                <label for="currencyAmount">Enter amount in USD</label>
                <input id="currencyAmount" type="number" />
                <span id="result"></span>
                <span>Leva</span>
            </div>
            <div> converted = amount * baseRate</div>
            <div> c <= a * b</div>
        `;

    const button = this.shadowRoot.querySelector("#update");
    button.addEventListener("click", () => this.onUpdateCallback?.());
  }

  get inputElement() {
    return this.shadowRoot.getElementById("currencyAmount");
  }
  set inputInnerHtml(value) {
    this.shadowRoot.getElementById("currencyAmount").value = value;
  }

  get rateElement() {
    return this.shadowRoot.getElementById("rate");
  }
  set rateInnerHtml(rate) {
    this.shadowRoot.getElementById("rate").innerHTML = rate;
  }

  set resultInnerHtml(result) {
    this.shadowRoot.getElementById("result").innerHTML = result;
  }

  get onUpdateCallback() {
    return this._onUpdateCallback;
  }

  set onUpdateCallback(callback) {
    this._onUpdateCallback = callback;
  }
}

window.customElements.define("currency-converter", CurrencyConverter);
