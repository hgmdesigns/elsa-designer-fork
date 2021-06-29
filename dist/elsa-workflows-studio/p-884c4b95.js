import{a1 as n}from"./p-c4caec5c.js";function t(n,t){if(null==t){const t=new Set(n.connections.map((n=>n.targetId)));return n.activities.filter((n=>!t.has(n.activityId)))}{const e=new Set(n.connections.filter((n=>n.sourceId===t)).map((n=>n.targetId)));return n.activities.filter((n=>e.has(n.activityId)))}}function e(n,t){return n.connections.filter((n=>n.targetId===t))}function r(n,t){return n.connections.filter((n=>n.sourceId===t))}function c(n,t){const c=[...e(n,t),...r(n,t)];return Object.assign(Object.assign({},n),{activities:n.activities.filter((n=>n.activityId!=t)),connections:n.connections.filter((n=>c.indexOf(n)<0))})}function o(n,t,e){return Object.assign(Object.assign({},n),{connections:n.connections.filter((n=>!(n.sourceId===t&&n.outcome===e)))})}function s(n,t){return n.activities.find((n=>n.activityId===t))}function i(n,...t){const e="object"==typeof t?t:{sourceId:t[0],targetId:t[1],outcome:t[3]};return Object.assign(Object.assign({},n),{connections:[...n.connections,e]})}function u(n,t,e,r){!function(n,t,e,r){let c=n.find((n=>n.name==t));if(r||(r="Literal"),c)c.expressions[r]=e,c.syntax=r;else{const o={};o[r]=e,c={name:t,expressions:o,syntax:r},n.push(c)}}(n.properties,t,e,r)}function a(n,t,e,r){let c=n.properties.find((n=>n.name==t));if(!c){const o={};let s=r?r():void 0;s||(s="Literal"),o[s]=e?e():void 0,c={name:t,expressions:o,syntax:null},n.properties.push(c)}return c}function f(n){if(!n)return null;try{return JSON.parse(n)}catch(n){console.warn(`Error parsing JSON: ${n}`)}}function l(n){if(!n)return{};const t={},e=("?"===n[0]?n.substr(1):n).split("&");for(let n=0;n<e.length;n++){const r=e[n].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"")}return t}function d(t){return n.map(t||{},((n,t)=>`${t}=${n}`)).join("&")}function p(n){switch(n){case"Json":return"json";case"JavaScript":return"javascript";case"Liquid":return"handlebars";case"Literal":default:return"plaintext"}}function j(n){return n?n.asHours()>1?`${n.asHours().toFixed(3)} h`:n.asMinutes()>1?`${n.asMinutes().toFixed(3)} m`:n.asSeconds()>1?`${n.asSeconds().toFixed(3)} s`:`${n.asMilliseconds()} ms`:null}function m(n){const t=document.createRange();t.selectNodeContents(n);const e=window.getSelection();e.removeAllRanges(),e.addRange(t)}Array.prototype.distinct=function(){return[...new Set(this)]},Array.prototype.last||(Array.prototype.last=function(){return this[this.length-1]});export{r as a,i as b,t as c,o as d,a as e,s as f,e as g,l as h,m as i,j,p as m,f as p,d as q,c as r,u as s}