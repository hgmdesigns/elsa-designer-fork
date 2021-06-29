import { Component, h, Prop } from '@stencil/core';
import { injectHistory } from "@stencil/router";
import { parseQuery, queryToString } from "../../../utils/utils";
export class ElsaPager {
  componentWillLoad() {
    this.basePath = !!this.location ? this.location.pathname : document.location.pathname;
  }
  navigate(path) {
    if (this.history) {
      this.history.push(path);
      return;
    }
    document.location.pathname = path;
  }
  onNavigateClick(e) {
    const anchor = e.currentTarget;
    e.preventDefault();
    this.navigate(`${anchor.pathname}${anchor.search}`);
  }
  render() {
    const page = this.page;
    const pageSize = this.pageSize;
    const totalCount = this.totalCount;
    const basePath = this.basePath;
    const from = page * pageSize + 1;
    const to = Math.min(from + pageSize, totalCount);
    const pageCount = Math.round(((totalCount - 1) / pageSize) + 0.5);
    const maxPageButtons = 10;
    const fromPage = Math.max(0, page - maxPageButtons / 2);
    const toPage = Math.min(pageCount, fromPage + maxPageButtons);
    const self = this;
    const currentQuery = parseQuery(this.history.location.search);
    currentQuery['pageSize'] = pageSize;
    const getNavUrl = (page) => {
      const query = Object.assign(Object.assign({}, currentQuery), { 'page': page });
      return `${basePath}?${queryToString(query)}`;
    };
    const renderPreviousButton = function () {
      if (page <= 0)
        return;
      return h("a", { href: `${getNavUrl(page - 1)}`, onClick: e => self.onNavigateClick(e), class: "elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-gray-300 elsa-text-sm elsa-leading-5 elsa-font-medium elsa-rounded-md elsa-text-gray-700 elsa-bg-white hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-shadow-outline-blue focus:elsa-border-blue-300 active:elsa-bg-gray-100 active:elsa-text-gray-700 elsa-transition elsa-ease-in-out elsa-duration-150" }, "Previous");
    };
    const renderNextButton = function () {
      if (page >= pageCount)
        return;
      return h("a", { href: `/${getNavUrl(page + 1)}`, onClick: e => self.onNavigateClick(e), class: "elsa-ml-3 elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-gray-300 elsa-text-sm elsa-leading-5 elsa-font-medium elsa-rounded-md elsa-text-gray-700 elsa-bg-white hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-shadow-outline-blue focus:elsa-border-blue-300 active:elsa-bg-gray-100 active:elsa-text-gray-700 elsa-transition elsa-ease-in-out elsa-duration-150" }, "Next");
    };
    const renderChevronLeft = function () {
      if (page <= 0)
        return;
      return (h("a", { href: `${getNavUrl(page - 1)}`, onClick: e => self.onNavigateClick(e), class: "elsa-relative elsa-inline-flex elsa-items-center elsa-px-2 elsa-py-2 elsa-rounded-l-md elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-500 hover:elsa-text-gray-400 focus:elsa-z-10 focus:elsa-outline-none focus:elsa-border-blue-300 focus:elsa-shadow-outline-blue active:elsa-bg-gray-100 active:elsa-text-gray-500 elsa-transition elsa-ease-in-out elsa-duration-150", "aria-label": "Previous" },
        h("svg", { class: "elsa-h-5 elsa-w-5", "x-description": "Heroicon name: chevron-left", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" },
          h("path", { "fill-rule": "evenodd", d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z", "clip-rule": "evenodd" }))));
    };
    const renderChevronRight = function () {
      if (page >= pageCount - 1)
        return;
      return (h("a", { href: `${getNavUrl(page + 1)}`, onClick: e => self.onNavigateClick(e), class: "-elsa-ml-px elsa-relative elsa-inline-flex elsa-items-center elsa-px-2 elsa-py-2 elsa-rounded-r-md elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-500 hover:elsa-text-gray-400 focus:elsa-z-10 focus:elsa-outline-none focus:elsa-border-blue-300 focus:elsa-shadow-outline-blue active:elsa-bg-gray-100 active:elsa-text-gray-500 elsa-transition elsa-ease-in-out elsa-duration-150", "aria-label": "Next" },
        h("svg", { class: "elsa-h-5 elsa-w-5", "x-description": "Heroicon name: chevron-right", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" },
          h("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))));
    };
    const renderPagerButtons = function () {
      const buttons = [];
      for (let i = fromPage; i < toPage; i++) {
        const isCurrent = page == i;
        const isFirst = i == fromPage;
        const isLast = i == toPage - 1;
        const leftRoundedClass = isFirst && isCurrent ? 'elsa-rounded-l-md' : '';
        const rightRoundedClass = isLast && isCurrent ? 'elsa-rounded-r-md' : '';
        if (isCurrent) {
          buttons.push(h("span", { class: `-elsa-ml-px elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-gray-300 elsa-text-sm elsa-leading-5 elsa-font-medium elsa-bg-blue-600 elsa-text-white ${leftRoundedClass} ${rightRoundedClass}` }, i + 1));
        }
        else {
          buttons.push(h("a", { href: `${getNavUrl(i)}`, onClick: e => self.onNavigateClick(e), class: `-elsa-ml-px elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-700 hover:elsa-text-gray-500 focus:elsa-z-10 focus:elsa-outline-none active:elsa-bg-gray-100 active:elsa-text-gray-700 elsa-transition elsa-ease-in-out elsa-duration-150 ${leftRoundedClass}` }, i + 1));
        }
      }
      return buttons;
    };
    return (h("div", { class: "elsa-bg-white elsa-px-4 elsa-py-3 elsa-flex elsa-items-center elsa-justify-between elsa-border-t elsa-border-gray-200 sm:elsa-px-6" },
      h("div", { class: "elsa-flex-1 elsa-flex elsa-justify-between sm:elsa-hidden" },
        renderPreviousButton(),
        renderNextButton()),
      h("div", { class: "hidden sm:elsa-flex-1 sm:elsa-flex sm:elsa-items-center sm:elsa-justify-between" },
        h("div", null,
          h("p", { class: "elsa-text-sm elsa-leading-5 elsa-text-gray-700 elsa-space-x-0-5" },
            h("span", null, "Showing"),
            h("span", { class: "elsa-font-medium" }, from),
            h("span", null, "to"),
            h("span", { class: "elsa-font-medium" }, to),
            h("span", null, "of"),
            h("span", { class: "elsa-font-medium" }, totalCount),
            h("span", null, "results"))),
        h("div", null,
          h("nav", { class: "elsa-relative elsa-z-0 elsa-inline-flex elsa-shadow-sm" },
            renderChevronLeft(),
            renderPagerButtons(),
            renderChevronRight())))));
  }
  static get is() { return "elsa-pager"; }
  static get properties() { return {
    "page": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "page",
      "reflect": false
    },
    "pageSize": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "page-size",
      "reflect": false
    },
    "totalCount": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "total-count",
      "reflect": false
    },
    "location": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "LocationSegments",
        "resolved": "LocationSegments",
        "references": {
          "LocationSegments": {
            "location": "import",
            "path": "@stencil/router"
          }
        }
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      }
    },
    "history": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "RouterHistory",
        "resolved": "RouterHistory",
        "references": {
          "RouterHistory": {
            "location": "import",
            "path": "@stencil/router"
          }
        }
      },
      "required": false,
      "optional": true,
      "docs": {
        "tags": [],
        "text": ""
      }
    }
  }; }
}
injectHistory(ElsaPager);