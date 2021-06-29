import { Component, Host, h, Prop, Event } from '@stencil/core';
import { leave, toggle } from 'el-transition';
import { registerClickOutside } from "stencil-click-outside";
import Tunnel from '../../../../data/workflow-editor';
export class ElsaWorkflowPublishButton {
  closeMenu() {
    leave(this.menu);
  }
  toggleMenu() {
    toggle(this.menu);
  }
  onPublishClick() {
    this.publishClicked.emit();
    leave(this.menu);
  }
  onUnPublishClick(e) {
    e.preventDefault();
    this.unPublishClicked.emit();
    leave(this.menu);
  }
  async onExportClick(e) {
    e.preventDefault();
    this.exportClicked.emit();
    leave(this.menu);
  }
  async onImportClick(e) {
    this.fileInput.value = null;
    this.fileInput.click();
    leave(this.menu);
  }
  async onFileInputChange(e) {
    const files = this.fileInput.files;
    if (files.length == 0) {
      return;
    }
    this.importClicked.emit(files[0]);
  }
  render() {
    return (h(Host, { class: "elsa-block", ref: el => registerClickOutside(this, el, this.closeMenu) },
      h("span", { class: "elsa-relative elsa-z-0 elsa-inline-flex elsa-shadow-sm elsa-rounded-md" },
        this.publishing ? this.renderPublishingButton() : this.renderPublishButton(),
        h("span", { class: "-elsa-ml-px elsa-relative elsa-block" },
          h("button", { onClick: () => this.toggleMenu(), id: "option-menu", type: "button", class: "elsa-relative elsa-inline-flex elsa-items-center elsa-px-2 elsa-py-2 elsa-rounded-r-md elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-font-medium elsa-text-gray-500 hover:elsa-bg-gray-50 focus:elsa-z-10 focus:elsa-outline-none focus:elsa-ring-1 focus:elsa-ring-blue-500 focus:elsa-border-blue-500" },
            h("span", { class: "elsa-sr-only" }, "Open options"),
            h("svg", { class: "elsa-h-5 elsa-w-5", "x-description": "Heroicon name: solid/chevron-down", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
              h("path", { "fill-rule": "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", "clip-rule": "evenodd" }))),
          h("div", { ref: el => this.menu = el, "data-transition-enter": "elsa-transition elsa-ease-out elsa-duration-100", "data-transition-enter-start": "elsa-transform elsa-opacity-0 elsa-scale-95", "data-transition-enter-end": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave": "elsa-transition elsa-ease-in elsa-duration-75", "data-transition-leave-start": "elsa-transform elsa-opacity-100 elsa-scale-100", "data-transition-leave-end": "elsa-transform elsa-opacity-0 elsa-scale-95", class: "hidden origin-bottom-right elsa-absolute elsa-right-0 elsa-bottom-10 elsa-mb-2 -elsa-mr-1 elsa-w-56 elsa-rounded-md elsa-shadow-lg elsa-bg-white elsa-ring-1 elsa-ring-black elsa-ring-opacity-5" },
            h("div", { class: "elsa-divide-y elsa-divide-gray-100 focus:elsa-outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "option-menu" },
              h("div", { class: "elsa-py-1", role: "none" },
                h("a", { href: "#", onClick: e => this.onExportClick(e), class: "elsa-block elsa-px-4 elsa-py-2 elsa-text-sm elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900", role: "menuitem" }, "Export"),
                h("a", { href: "#", onClick: e => this.onImportClick(e), class: "elsa-block elsa-px-4 elsa-py-2 elsa-text-sm elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900", role: "menuitem" }, "Import")),
              this.renderUnpublishButton())))),
      h("input", { type: "file", class: "hidden", onChange: e => this.onFileInputChange(e), ref: el => this.fileInput = el })));
  }
  renderPublishButton() {
    return (h("button", { type: "button", onClick: () => this.onPublishClick(), class: "elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-rounded-l-md elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-font-medium elsa-text-gray-700 hover:elsa-bg-gray-50 focus:elsa-z-10 focus:elsa-outline-none focus:elsa-ring-1 focus:elsa-ring-blue-500 focus:elsa-border-blue-500" }, "Activate"));
  }
  renderPublishingButton() {
    return (h("button", { type: "button", disabled: true, class: "elsa-relative elsa-inline-flex elsa-items-center elsa-px-4 elsa-py-2 elsa-rounded-l-md elsa-border elsa-border-gray-300 elsa-bg-white elsa-text-sm elsa-font-medium elsa-text-gray-700 hover:elsa-bg-gray-50 focus:elsa-z-10 focus:elsa-outline-none focus:elsa-ring-1 focus:elsa-ring-blue-500 focus:elsa-border-blue-500" },
      h("svg", { class: "elsa-animate-spin -elsa-ml-1 elsa-mr-3 elsa-h-5 elsa-w-5 elsa-text-blue-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
        h("circle", { class: "elsa-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }),
        h("path", { class: "elsa-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
      "Activating"));
  }
  renderUnpublishButton() {
    if (!this.workflowDefinition.isPublished)
      return undefined;
    return (h("div", { class: "elsa-py-1", role: "none" },
      h("a", { href: "#", onClick: e => this.onUnPublishClick(e), class: "elsa-block elsa-px-4 elsa-py-2 elsa-text-sm elsa-text-gray-700 hover:elsa-bg-gray-100 hover:elsa-text-gray-900", role: "menuitem" }, "Deactivate")));
  }
  static get is() { return "elsa-workflow-publish-button"; }
  static get properties() { return {
    "workflowDefinition": {
      "type": "unknown",
      "mutable": false,
      "complexType": {
        "original": "WorkflowDefinition",
        "resolved": "WorkflowDefinition",
        "references": {
          "WorkflowDefinition": {
            "location": "import",
            "path": "../../../../models"
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
    "publishing": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "publishing",
      "reflect": false
    }
  }; }
  static get events() { return [{
      "method": "publishClicked",
      "name": "publishClicked",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "unPublishClicked",
      "name": "unPublishClicked",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "exportClicked",
      "name": "exportClicked",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "importClicked",
      "name": "importClicked",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "File",
        "resolved": "File",
        "references": {
          "File": {
            "location": "global"
          }
        }
      }
    }]; }
}
Tunnel.injectProps(ElsaWorkflowPublishButton, ['serverUrl']);
