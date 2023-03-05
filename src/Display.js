class Display {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.loading = document.querySelector(this.container.getAttribute("data-loading")).innerHTML;
    }

    Load(path, url, builder) {
        this.container.innerHTML = this.loading ? this.loading : "";

        GET(path, null, (data) => {
            GETPage(url, (html) => {
                this.container.innerHTML = html;
                builder(this.container, data);
            });
        });
    }
}

class DisplayPanel extends HTMLElement {
    Load(path, url, builder) {
        let loading = document.querySelector(this.dataset.loading);
        this.innerHTML = loading ? loading.innerHTML : "";

        GET(path, null, (data) => {
            this.data = data;
            GETPage(url, (html) => {
                this.innerHTML = html;
                builder(this);
            });
        });
    }
}

customElements.define("display-panel", DisplayPanel);