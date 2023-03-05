class PickerPanel extends HTMLElement {
    constructor() {
        super();

        this.index = -1;
        this.items = [];
        this.data = [];
    }


    connectedCallback() {
        this.addEventListener("keydown", (e) => {

            let i = -1;
            switch (e.which) {
                case 38: //up
                    i = this.index - 1;
                    break;
                case 40: //down
                    i = this.index + 1;
                    break;
            }

            if (i != -1) {
                event.preventDefault();
                if (!e.shiftKey)
                    this.SelectedIndex = i;
                else {
                    //SELECT Multiple
                }
            }
        });
    }

    get SelectedItem() {
        return this.items[this.index];
    }

    set SelectedIndex(index) {
        if (index > -1 && index < this.items.length) {
            this.index = index;

            let selected = this.getElementsByClassName('selected');
            for (let i = 0; i < selected.length; i++)
                selected[i].classList.remove('selected');

            this.SelectedItem.classList.add('selected');
            //this.SelectedItem.scrollIntoView(true);

            this.dispatchEvent(new CustomEvent("SelectionChange", { detail: this.SelectedItem.Data }));
        }
    }

    get SelectedIndex() {
        return this.index;
    }

    Update(options = {}) {

        let items = this.data;

        let compare = (a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        }

        if (options.sort) {
            if (options.desc) {
                items = items.sort((a, b) => compare(b[options.sort], a[options.sort]));
            }
            else {
                items = items.sort((a, b) => compare(a[options.sort], b[options.sort]));
            }
        }

        if (options.filter)
            items = items.filter(options.filter)

        this.innerHTML = "";
        for (let i in items) {
            let item = new PickerItem(items[i]);

            item.innerHTML = this.template.innerHTML;
            this.builder(item);


            this.Add(item);
        }
    }

    Load(path, builder, options = {}) {
        this.builder = builder;
        this.template = document.querySelector(this.dataset.item);
        let loading = document.querySelector(this.dataset.loading);

        this.innerHTML = loading ? loading.innerHTML : "";

        GET(path, null, (items) => {

            this.data = items;

            this.Update(options);
        });
    }

    Add(item) {
        item.addEventListener("click", () => {
            this.SelectedIndex = this.items.indexOf(item);
        });

        this.appendChild(item)
        this.items.push(item)
    }

    Remove(index = this.index) {
        let item = this.items.splice(index, 1)[0];
        item.classList.remove("selected");
        this.removeChild(item);

        return item;
    }
}

class PickerItem extends HTMLElement {
    constructor(data) {
        super();

        this.data = data;
    }

    set Data(data) {
        this.data = data;
    }

    get Data() {
        return this.data;
    }
}

class PickerSort extends HTMLElement {
    constructor() {
        super();
        this.sort;
        this.order;
        this.groups = {};
    }

    connectedCallback() {
        this.classList.add("dropdown");

        this.button = document.createElement("button");
        this.button.classList.add("btn", "btn-success", "btn-sm", "dropdown-toggle");
        this.button.dataset.toggle = "dropdown";
        this.button.type = "button";
        this.button.innerText = "Sort";
        this.appendChild(this.button);

        this.menu = document.createElement("div");
        this.menu.classList.add("dropdown-menu");
        this.appendChild(this.menu);
    }

    Load(data) {

        for (let d of data) {
            let e = document.createElement(d.type);

            if (d.text) e.innerText = d.text;
            if (e instanceof HTMLHeadingElement) e.classList.add("dropdown-header");
            if (e instanceof HTMLDivElement) e.classList.add("dropdown-divider");
            if (e instanceof HTMLAnchorElement) {
                if (!this.groups[d.group]) this.groups[d.group] = [];
                this.groups[d.group].push(e);

                if (d.active) e.classList.add("active");
                e.classList.add("dropdown-item", "small");

                e.addEventListener("click", () => {
                    this.groups[d.group].forEach((g) => g.classList.remove("active"));
                    e.classList.add("active");
                })
            }

            this.menu.appendChild(e);
        }
    }
}

customElements.define("picker-panel", PickerPanel);
customElements.define("picker-item", PickerItem);
customElements.define("picker-sort", PickerSort);