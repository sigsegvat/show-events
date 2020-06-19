import template from './component.html';
import css from './component.css'

class LinkElement extends HTMLElement {
    constructor() {
        super();
        let shadow = this.attachShadow({mode: 'closed'});
        shadow.innerHTML = template
        let htmlStyleElement = document.createElement("style");
        htmlStyleElement.append(css)
        shadow.append(htmlStyleElement)
    }

    connectedCallback() {

    }

}

customElements.define("my-link", LinkElement);

