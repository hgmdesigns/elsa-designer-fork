'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ca95b980.js');

const ElsaStudioHome = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const visualPath = index.getAssetPath('./assets/undraw_breaking_barriers_vnf3.svg');
    return (index.h("div", { class: "elsa-relative elsa-bg-gray-800 elsa-overflow-hidden elsa-h-screen" }, index.h("main", { class: "elsa-mt-16 sm:elsa-mt-24" }, index.h("div", { class: "elsa-mx-auto elsa-max-w-7xl" }, index.h("div", { class: "lg:elsa-grid lg:elsa-grid-cols-12 lg:elsa-gap-8" }, index.h("div", { class: "elsa-px-4 sm:elsa-px-6 sm:elsa-text-center md:elsa-max-w-2xl md:elsa-mx-auto lg:elsa-col-span-6 lg:elsa-text-left lg:flex lg:elsa-items-center" }, index.h("div", null, index.h("h1", { class: "elsa-mt-4 elsa-text-4xl elsa-tracking-tight elsa-font-extrabold elsa-text-white sm:elsa-mt-5 sm:elsa-leading-none lg:elsa-mt-6 lg:elsa-text-5xl xl:elsa-text-6xl" }, index.h("span", { class: "md:elsa-block" }, "Welcome to"), index.h("span", { class: "elsa-text-teal-400 md:elsa-block" }, "Elsa Workflows"), " ", index.h("span", null, "2.0")), index.h("p", { class: "elsa-mt-3 elsa-text-base elsa-text-gray-300 sm:elsa-mt-5 sm:elsa-text-xl lg:elsa-text-lg xl:elsa-text-xl" }, "Use the dashboard app to manage all the things."))), index.h("div", { class: "elsa-mt-16 sm:elsa-mt-24 lg:elsa-mt-0 lg:elsa-col-span-6" }, index.h("div", { class: "sm:elsa-max-w-md sm:elsa-w-full sm:elsa-mx-auto sm:elsa-rounded-lg sm:elsa-overflow-hidden" }, index.h("div", { class: "elsa-px-4 elsa-py-8 sm:elsa-px-10" }, index.h("img", { src: visualPath, alt: "", width: 400 })))))))));
  }
  static get assetsDirs() { return ["assets"]; }
};

exports.elsa_studio_home = ElsaStudioHome;
