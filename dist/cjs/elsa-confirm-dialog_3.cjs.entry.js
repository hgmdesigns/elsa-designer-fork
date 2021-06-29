'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');
const index$1 = require('./index-169661bf.js');
const index$2 = require('./index-1d5f86ef.js');
const domUtils = require('./dom-utils-384f57f3.js');
const activeRouter = require('./active-router-0c298a50.js');
require('./state-tunnel-786a62ce.js');

const ElsaConfirmDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  async show(caption, message) {
    this.caption = caption;
    this.message = message;
    await this.dialog.show(true);
    return new Promise((fulfill, reject) => {
      this.fulFill = fulfill;
      this.reject = reject;
    });
  }
  async hide() {
    await this.dialog.hide(true);
  }
  async onDismissClick() {
    this.fulFill(false);
    await this.hide();
  }
  async onAcceptClick() {
    this.fulFill(true);
    this.fulFill = null;
    this.reject = null;
    await this.hide();
  }
  render() {
    return (index.h(index.Host, null, index.h("elsa-modal-dialog", { ref: el => this.dialog = el }, index.h("div", { slot: "content", class: "elsa-py-8 elsa-px-4" }, index.h("div", { class: "hidden sm:elsa-block elsa-absolute elsa-top-0 elsa-right-0 elsa-pt-4 elsa-pr-4" }, index.h("button", { type: "button", onClick: () => this.onDismissClick(), class: "elsa-bg-white elsa-rounded-md elsa-text-gray-400 hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-blue-500" }, index.h("span", { class: "elsa-sr-only" }, "Close"), index.h("svg", { class: "elsa-h-6 elsa-w-6", "x-description": "Heroicon name: outline/x", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M6 18L18 6M6 6l12 12" })))), index.h("div", { class: "sm:elsa-flex sm:elsa-items-start" }, index.h("div", { class: "elsa-mx-auto elsa-flex-shrink-0 elsa-flex elsa-items-center elsa-justify-center elsa-h-12 elsa-w-12 elsa-rounded-full elsa-bg-red-100 sm:elsa-mx-0 sm:elsa-h-10 sm:elsa-w-10" }, index.h("svg", { class: "elsa-h-6 elsa-w-6 elsa-text-red-600", "x-description": "Heroicon name: outline/exclamation", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }))), index.h("div", { class: "elsa-mt-3 elsa-text-center sm:elsa-mt-0 sm:elsa-ml-4 sm:elsa-text-left" }, index.h("h3", { class: "elsa-text-lg elsa-leading-6 elsa-font-medium elsa-text-gray-900", id: "modal-title" }, this.caption), index.h("div", { class: "elsa-mt-2" }, index.h("p", { class: "elsa-text-sm elsa-text-gray-500" }, this.message))))), index.h("div", { slot: "buttons" }, index.h("div", { class: "elsa-bg-gray-50 elsa-px-4 elsa-py-3 sm:elsa-px-6 sm:elsa-flex sm:elsa-flex-row-reverse" }, index.h("button", { type: "button", onClick: () => this.onAcceptClick(), class: "elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-transparent elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-red-600 elsa-text-base elsa-font-medium elsa-text-white hover:elsa-bg-red-700 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:elsa-ring-red-500 sm:elsa-ml-3 sm:elsa-w-auto sm:elsa-text-sm" }, "Yes"), index.h("button", { type: "button", onClick: () => this.onDismissClick(), class: "elsa-mt-3 elsa-w-full elsa-inline-flex elsa-justify-center elsa-rounded-md elsa-border elsa-border-gray-300 elsa-shadow-sm elsa-px-4 elsa-py-2 elsa-bg-white elsa-text-base elsa-font-medium elsa-text-gray-700 hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-ring-2 focus:elsa-ring-offset-2 focus:ring-indigo-500 sm:elsa-mt-0 sm:elsa-w-auto sm:elsa-text-sm" }, "No"))))));
  }
};

const ElsaContextMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.menuItems = [];
  }
  componentWillLoad() {
    if (!!this.history)
      this.navigate = this.history.push;
    else
      this.navigate = path => document.location.href = path;
  }
  closeContextMenu() {
    index$1.leave(this.contextMenu);
  }
  toggleMenu() {
    index$1.toggle(this.contextMenu);
  }
  async onMenuItemClick(e, menuItem) {
    e.preventDefault();
    if (!!menuItem.anchorUrl) {
      this.navigate(menuItem.anchorUrl);
    }
    else if (!!menuItem.clickHandler) {
      menuItem.clickHandler(e);
    }
    this.closeContextMenu();
  }
  render() {
    return (index.h("div", { class: "elsa-relative elsa-flex elsa-justify-end elsa-items-center", ref: el => index$2.registerClickOutside(this, el, this.closeContextMenu) }, index.h("button", { onClick: () => this.toggleMenu(), "aria-has-popup": "true", type: "button", class: "elsa-w-8 elsa-h-8 elsa-inline-flex elsa-items-center elsa-justify-center elsa-text-gray-400 elsa-rounded-full elsa-bg-transparent hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-text-gray-500 focus:elsa-bg-gray-100 elsa-transition elsa-ease-in-out elsa-duration-150" }, index.h("svg", { class: "elsa-w-5 elsa-h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, index.h("path", { d: "M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" }))), index.h("div", { ref: el => this.contextMenu = el, "data-transition-enter": "elsa-transition elsa-ease-out elsa-duration-100", "data-transition-enter-start": "elsa-transform elsa-opacity-0 elsa-scale-95", "data-transition-leave": "elsa-transition elsa-ease-in elsa-duration-75", "data-transition-leave-start": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave-end": "elsa-transform elsa-opacity-0 elsa-scale-95", class: "hidden elsa-z-10 elsa-mx-3 elsa-origin-top-right elsa-absolute elsa-right-7 elsa-top-0 elsa-w-48 elsa-mt-1 elsa-rounded-md elsa-shadow-lg" }, index.h("div", { class: "elsa-rounded-md elsa-bg-white elsa-shadow-xs", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "project-options-menu-0" }, this.menuItems.map(menuItem => {
      const anchorUrl = menuItem.anchorUrl || '#';
      return (index.h("div", { class: "elsa-py-1" }, index.h("a", { href: anchorUrl, onClick: e => this.onMenuItemClick(e, menuItem), class: "elsa-group elsa-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-text-sm elsa-leading-5 elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900 focus:elsa-outline-none focus:elsa-bg-gray-100 focus:elsa-text-gray-900", role: "menuitem" }, menuItem.icon ? index.h("span", { class: "elsa-mr-3 " }, menuItem.icon) : undefined, menuItem.text)));
    })))));
  }
};

const getUrl = (url, root) => {
  // Don't allow double slashes
  if (url.charAt(0) == '/' && root.charAt(root.length - 1) == '/') {
    return root.slice(0, root.length - 1) + url;
  }
  return root + url;
};
const RouteLink = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.unsubscribe = () => { return; };
    this.activeClass = 'link-active';
    this.exact = false;
    this.strict = true;
    /**
      *  Custom tag to use instead of an anchor
      */
    this.custom = 'a';
    this.match = null;
  }
  componentWillLoad() {
    this.computeMatch();
  }
  // Identify if the current route is a match.
  computeMatch() {
    if (this.location) {
      this.match = domUtils.matchPath(this.location.pathname, {
        path: this.urlMatch || this.url,
        exact: this.exact,
        strict: this.strict
      });
    }
  }
  handleClick(e) {
    if (domUtils.isModifiedEvent(e) || !this.history || !this.url || !this.root) {
      return;
    }
    e.preventDefault();
    return this.history.push(getUrl(this.url, this.root));
  }
  // Get the URL for this route link without the root from the router
  render() {
    let anchorAttributes = {
      class: {
        [this.activeClass]: this.match !== null,
      },
      onClick: this.handleClick.bind(this)
    };
    if (this.anchorClass) {
      anchorAttributes.class[this.anchorClass] = true;
    }
    if (this.custom === 'a') {
      anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex, 'aria-haspopup': this.ariaHaspopup, id: this.anchorId, 'aria-posinset': this.ariaPosinset, 'aria-setsize': this.ariaSetsize, 'aria-label': this.ariaLabel });
    }
    return (index.h(this.custom, Object.assign({}, anchorAttributes), index.h("slot", null)));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "location": ["computeMatch"]
  }; }
};
activeRouter.ActiveRouter.injectProps(RouteLink, [
  'history',
  'location',
  'root'
]);

exports.elsa_confirm_dialog = ElsaConfirmDialog;
exports.elsa_context_menu = ElsaContextMenu;
exports.stencil_route_link = RouteLink;
