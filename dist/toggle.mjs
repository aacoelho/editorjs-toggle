(function(){"use strict";try{if(typeof document!="undefined"){var e=document.createElement("style");e.appendChild(document.createTextNode('.cdx-toggle{margin:1em auto;color:#000}.cdx-toggle:before{content:"";position:absolute;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0iIzAwMDAwMCIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0xODEuNjYsMTMzLjY2bC04MCw4MEE4LDgsMCwwLDEsODgsMjA4VjQ4YTgsOCwwLDAsMSwxMy42Ni01LjY2bDgwLDgwQTgsOCwwLDAsMSwxODEuNjYsMTMzLjY2WiI+PC9wYXRoPjwvc3ZnPg==);background-size:contain;background-repeat:no-repeat;width:20px;height:20px;top:4px;left:0;animation:rotate .3s ease-in-out 0s;animation-fill-mode:forwards}.cdx-toggle .cdx-toggle__title{font-size:20px;margin-bottom:12px;margin-left:30px;outline:none!important}.cdx-toggle .cdx-toggle__text{font-size:16px;color:#333;outline:none!important;margin-left:30px}@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(90deg)}}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
var n = Object.defineProperty;
var d = (s, t, e) => t in s ? n(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var i = (s, t, e) => (d(s, typeof t != "symbol" ? t + "" : t, e), e);
class h {
  constructor({ data: t, config: e, api: l, block: r, readOnly: a }) {
    i(this, "api");
    i(this, "block");
    i(this, "readOnly");
    i(this, "_data");
    i(this, "config");
    i(this, "nodes");
    i(this, "titlePlaceholder");
    i(this, "textPlaceholder");
    this.data = t, this.config = e, this.api = l, this.block = r, this.readOnly = a, this.titlePlaceholder = e.titlePlaceholder || "Add title or question", this.textPlaceholder = e.textPlaceholder || "Add text or answer", this.nodes = {
      wrapper: null,
      title: null,
      text: null
    };
  }
  get classes() {
    return {
      wrapper: "cdx-toggle",
      title: "cdx-toggle__title",
      text: "cdx-toggle__text"
    };
  }
  set data(t) {
    this._data = Object.assign({}, {
      title: t.title || "",
      text: t.text || ""
    });
  }
  get data() {
    return this._data;
  }
  render() {
    return this.nodes.wrapper = this.make("div", this.classes.wrapper), this.nodes.title = this.make("div", this.classes.title, {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this._data.title || ""
    }), this.nodes.title.dataset.placeholder = this.titlePlaceholder, this.nodes.wrapper.appendChild(this.nodes.title), this.nodes.text = this.make("div", this.classes.text, {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this._data.text || ""
    }), this.nodes.text.dataset.placeholder = this.textPlaceholder, this.nodes.wrapper.appendChild(this.nodes.text), this.nodes.wrapper;
  }
  save() {
    var t, e;
    return {
      title: this.getCleanContent(((t = this.nodes.title) == null ? void 0 : t.innerHTML) || ""),
      text: this.getCleanContent(((e = this.nodes.text) == null ? void 0 : e.innerHTML) || "")
    };
  }
  validate(t) {
    var e, l;
    return !!(((e = t.title) == null ? void 0 : e.trim()) || ((l = t.text) == null ? void 0 : l.trim()));
  }
  static get sanitize() {
    return {
      title: !0,
      text: !0
    };
  }
  static get toolbox() {
    return {
      title: "Toggle",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>'
    };
  }
  static get enableLineBreaks() {
    return !0;
  }
  static get isReadOnlySupported() {
    return !0;
  }
  getCleanContent(t) {
    return t ? t.replace(/^<br\/?>$/i, "").replace(/^<p><br\/?>?<\/p>$/i, "").replace(/^<div><br\/?>?<\/div>$/i, "").replace(/^\s*$/, "") : "";
  }
  make(t, e = [], l = {}) {
    const r = document.createElement(t);
    Array.isArray(e) ? r.classList.add(...e) : e && r.classList.add(e);
    for (const a in l)
      r[a] = l[a];
    return r;
  }
}
export {
  h as default
};
