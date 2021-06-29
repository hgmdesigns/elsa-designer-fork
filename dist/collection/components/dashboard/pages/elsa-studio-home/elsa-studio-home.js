import { Component, h, getAssetPath } from '@stencil/core';
export class ElsaStudioHome {
  render() {
    const visualPath = getAssetPath('./assets/undraw_breaking_barriers_vnf3.svg');
    return (h("div", { class: "elsa-relative elsa-bg-gray-800 elsa-overflow-hidden elsa-h-screen" },
      h("main", { class: "elsa-mt-16 sm:elsa-mt-24" },
        h("div", { class: "elsa-mx-auto elsa-max-w-7xl" },
          h("div", { class: "lg:elsa-grid lg:elsa-grid-cols-12 lg:elsa-gap-8" },
            h("div", { class: "elsa-px-4 sm:elsa-px-6 sm:elsa-text-center md:elsa-max-w-2xl md:elsa-mx-auto lg:elsa-col-span-6 lg:elsa-text-left lg:flex lg:elsa-items-center" },
              h("div", null,
                h("h1", { class: "elsa-mt-4 elsa-text-4xl elsa-tracking-tight elsa-font-extrabold elsa-text-white sm:elsa-mt-5 sm:elsa-leading-none lg:elsa-mt-6 lg:elsa-text-5xl xl:elsa-text-6xl" },
                  h("span", { class: "md:elsa-block" }, "Welcome to"),
                  h("span", { class: "elsa-text-teal-400 md:elsa-block" }, "Elsa Workflows"),
                  " ",
                  h("span", null, "2.0")),
                h("p", { class: "elsa-mt-3 elsa-text-base elsa-text-gray-300 sm:elsa-mt-5 sm:elsa-text-xl lg:elsa-text-lg xl:elsa-text-xl" }, "Use the dashboard app to manage all the things."))),
            h("div", { class: "elsa-mt-16 sm:elsa-mt-24 lg:elsa-mt-0 lg:elsa-col-span-6" },
              h("div", { class: "sm:elsa-max-w-md sm:elsa-w-full sm:elsa-mx-auto sm:elsa-rounded-lg sm:elsa-overflow-hidden" },
                h("div", { class: "elsa-px-4 elsa-py-8 sm:elsa-px-10" },
                  h("img", { src: visualPath, alt: "", width: 400 })))))))));
  }
  static get is() { return "elsa-studio-home"; }
  static get assetsDirs() { return ["assets"]; }
}
