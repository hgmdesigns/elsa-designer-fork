let e,t,n=!1,l=!1,o=!1,s=!1,i=null,r=!1;const c="undefined"!=typeof window?window:{},a=c.document||{head:{}},f={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},u=e=>Promise.resolve(e),d=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),$={},p=(e,t,n)=>{n&&n.map((([n,l,o])=>{const s=e,i=w(t,o),r=h(n);f.ael(s,l,i,r),(t.o=t.o||[]).push((()=>f.rel(s,l,i,r)))}))},w=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){he(e)}},h=e=>0!=(2&e),y="http://www.w3.org/1999/xlink",m=new WeakMap,b=e=>"sc-"+e.$,v={},g=e=>"object"==(e=typeof e)||"function"===e,k=(e,t,...n)=>{let l=null,o=null,s=null,i=!1,r=!1,c=[];const a=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?a(l):null!=l&&"boolean"!=typeof l&&((i="function"!=typeof e&&!g(l))&&(l+=""),i&&r?c[c.length-1].p+=l:c.push(i?j(null,l):l),r=i)};if(a(n),t){t.key&&(o=t.key),t.name&&(s=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,O);const f=j(e,null);return f.h=t,c.length>0&&(f.m=c),f.v=o,f.g=s,f},j=(e,t)=>({t:0,k:e,p:t,j:null,m:null,h:null,v:null,g:null}),S={},O={forEach:(e,t)=>e.map(C).forEach(t),map:(e,t)=>e.map(C).map(t).map(M)},C=e=>({vattrs:e.h,vchildren:e.m,vkey:e.v,vname:e.g,vtag:e.k,vtext:e.p}),M=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),k(e.vtag,t,...e.vchildren||[])}const t=j(e.vtag,e.vtext);return t.h=e.vattrs,t.m=e.vchildren,t.v=e.vkey,t.g=e.vname,t},x=(e,t,n,l,o,s)=>{if(n!==l){let i=we(e,t),r=t.toLowerCase();if("class"===t){const t=e.classList,o=R(n),s=R(l);t.remove(...o.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!o.includes(e))))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(i||"o"!==t[0]||"n"!==t[1]){const c=g(l);if((i||c&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{let o=null==l?"":l;"list"===t?i=!1:null!=n&&e[t]==o||(e[t]=o)}}catch(e){}let a=!1;r!==(r=r.replace(/^xlink\:?/,""))&&(t=r,a=!0),null==l||!1===l?!1===l&&""!==e.getAttribute(t)||(a?e.removeAttributeNS(y,t):e.removeAttribute(t)):(!i||4&s||o)&&!c&&(l=!0===l?"":l,a?e.setAttributeNS(y,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):we(c,r)?r.slice(2):r[2]+t.slice(3),n&&f.rel(e,t,n,!1),l&&f.ael(e,t,l,!1)}},P=/\s/,R=e=>e?e.split(P):[],U=(e,t,n,l)=>{const o=11===t.j.nodeType&&t.j.host?t.j.host:t.j,s=e&&e.h||v,i=t.h||v;for(l in s)l in i||x(o,l,s[l],void 0,n,t.t);for(l in i)x(o,l,s[l],i[l],n,t.t)},L=(l,i,r)=>{let c,f,u,d=i.m[r],$=0;if(n||(o=!0,"slot"===d.k&&(d.t|=d.m?2:1)),null!==d.p)c=d.j=a.createTextNode(d.p);else if(1&d.t)c=d.j=a.createTextNode("");else{if(s||(s="svg"===d.k),c=d.j=a.createElementNS(s?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&d.t?"slot-fb":d.k),s&&"foreignObject"===d.k&&(s=!1),U(null,d,s),d.m)for($=0;$<d.m.length;++$)f=L(l,d,$),f&&c.appendChild(f);"svg"===d.k?s=!1:"foreignObject"===c.tagName&&(s=!0)}return c["s-hn"]=t,3&d.t&&(c["s-sr"]=!0,c["s-cr"]=e,c["s-sn"]=d.g||"",u=l&&l.m&&l.m[r],u&&u.k===d.k&&l.j&&T(l.j,!1)),c},T=(e,n)=>{f.t|=1;const l=e.childNodes;for(let e=l.length-1;e>=0;e--){const s=l[e];s["s-hn"]!==t&&s["s-ol"]&&(A(s).insertBefore(s,q(s)),s["s-ol"].remove(),s["s-ol"]=void 0,o=!0),n&&T(s,n)}f.t&=-2},E=(e,t,n,l,o,s)=>{let i,r=e["s-cr"]&&e["s-cr"].parentNode||e;for(;o<=s;++o)l[o]&&(i=L(null,n,o),i&&(l[o].j=i,r.insertBefore(i,q(t))))},W=(e,t,n,o,s)=>{for(;t<=n;++t)(o=e[t])&&(s=o.j,z(o),l=!0,s["s-ol"]?s["s-ol"].remove():T(s,!0),s.remove())},D=(e,t)=>e.k===t.k&&("slot"===e.k?e.g===t.g:e.v===t.v),q=e=>e&&e["s-ol"]||e,A=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,F=(e,t)=>{const n=t.j=e.j,l=e.m,o=t.m,i=t.k,r=t.p;let c;null===r?(s="svg"===i||"foreignObject"!==i&&s,"slot"===i||U(e,t,s),null!==l&&null!==o?((e,t,n,l)=>{let o,s,i=0,r=0,c=0,a=0,f=t.length-1,u=t[0],d=t[f],$=l.length-1,p=l[0],w=l[$];for(;i<=f&&r<=$;)if(null==u)u=t[++i];else if(null==d)d=t[--f];else if(null==p)p=l[++r];else if(null==w)w=l[--$];else if(D(u,p))F(u,p),u=t[++i],p=l[++r];else if(D(d,w))F(d,w),d=t[--f],w=l[--$];else if(D(u,w))"slot"!==u.k&&"slot"!==w.k||T(u.j.parentNode,!1),F(u,w),e.insertBefore(u.j,d.j.nextSibling),u=t[++i],w=l[--$];else if(D(d,p))"slot"!==u.k&&"slot"!==w.k||T(d.j.parentNode,!1),F(d,p),e.insertBefore(d.j,u.j),d=t[--f],p=l[++r];else{for(c=-1,a=i;a<=f;++a)if(t[a]&&null!==t[a].v&&t[a].v===p.v){c=a;break}c>=0?(s=t[c],s.k!==p.k?o=L(t&&t[r],n,c):(F(s,p),t[c]=void 0,o=s.j),p=l[++r]):(o=L(t&&t[r],n,r),p=l[++r]),o&&A(u.j).insertBefore(o,q(u.j))}i>f?E(e,null==l[$+1]?null:l[$+1].j,n,l,r,$):r>$&&W(t,i,f)})(n,l,t,o):null!==o?(null!==e.p&&(n.textContent=""),E(n,null,t,o,0,o.length-1)):null!==l&&W(l,0,l.length-1),s&&"svg"===i&&(s=!1)):(c=n["s-cr"])?c.parentNode.textContent=r:e.p!==r&&(n.data=r)},H=e=>{let t,n,l,o,s,i,r=e.childNodes;for(n=0,l=r.length;n<l;n++)if(t=r[n],1===t.nodeType){if(t["s-sr"])for(s=t["s-sn"],t.hidden=!1,o=0;o<l;o++)if(i=r[o].nodeType,r[o]["s-hn"]!==t["s-hn"]||""!==s){if(1===i&&s===r[o].getAttribute("slot")){t.hidden=!0;break}}else if(1===i||3===i&&""!==r[o].textContent.trim()){t.hidden=!0;break}H(t)}},N=[],V=e=>{let t,n,o,s,i,r,c=0,a=e.childNodes,f=a.length;for(;c<f;c++){if(t=a[c],t["s-sr"]&&(n=t["s-cr"])&&n.parentNode)for(o=n.parentNode.childNodes,s=t["s-sn"],r=o.length-1;r>=0;r--)n=o[r],n["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||(_(n,s)?(i=N.find((e=>e.S===n)),l=!0,n["s-sn"]=n["s-sn"]||s,i?i.O=t:N.push({O:t,S:n}),n["s-sr"]&&N.map((e=>{_(e.S,n["s-sn"])&&(i=N.find((e=>e.S===n)),i&&!e.O&&(e.O=i.O))}))):N.some((e=>e.S===n))||N.push({S:n}));1===t.nodeType&&V(t)}},_=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,z=e=>{e.h&&e.h.ref&&e.h.ref(null),e.m&&e.m.map(z)},B=e=>de(e).C,G=(e,t,n)=>{const l=B(e);return{emit:e=>I(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},I=(e,t,n)=>{const l=f.ce(t,n);return e.dispatchEvent(l),l},J=(e,t)=>{t&&!e.M&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.M=t)))},K=(e,t)=>{if(e.t|=16,!(4&e.t))return J(e,e.P),Me((()=>Q(e,t)));e.t|=512},Q=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>le(n,e,t))),e.u=null),l=le(n,"componentWillLoad")),l=oe(l,(()=>le(n,"componentWillRender"))),oe(l,(()=>X(e,n,t)))},X=async(e,t,n)=>{const l=e.C,o=l["s-rc"];n&&(e=>{const t=e.R;((e,t)=>{let n=b(t),l=be.get(n);if(e=11===e.nodeType?e:a,l)if("string"==typeof l){let t,o=m.get(e=e.head||e);o||m.set(e,o=new Set),o.has(n)||(t=a.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l])})(e.C.getRootNode(),t)})(e);Y(e,t),o&&(o.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>ee(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},Y=(s,r)=>{try{i=r,r=r.render&&r.render(),s.t&=-17,s.t|=2,((s,i)=>{const r=s.C,c=s.R,u=s.U||j(null,null),d=(e=>e&&e.k===S)(i)?i:k(null,null,i);if(t=r.tagName,c.L&&(d.h=d.h||{},c.L.map((([e,t])=>d.h[t]=r[e]))),d.k=null,d.t|=4,s.U=d,d.j=u.j=r,e=r["s-cr"],n=0!=(1&c.t),l=!1,F(u,d),f.t|=1,o){let e,t,n,l,o,s;V(d.j);let i=0;for(;i<N.length;i++)e=N[i],t=e.S,t["s-ol"]||(n=a.createTextNode(""),n["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=n,t));for(i=0;i<N.length;i++)if(e=N[i],t=e.S,e.O){for(l=e.O.parentNode,o=e.O.nextSibling,n=t["s-ol"];n=n.previousSibling;)if(s=n["s-nr"],s&&s["s-sn"]===t["s-sn"]&&l===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&l!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),l.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}l&&H(d.j),f.t&=-2,N.length=0})(s,r)}catch(e){he(e,s.C)}return i=null,null},Z=()=>i,ee=e=>{const t=e.C,n=e.i,l=e.P;64&e.t?le(n,"componentDidUpdate"):(e.t|=64,se(t),le(n,"componentDidLoad"),e.T(t),l||ne()),e.W(t),e.M&&(e.M(),e.M=void 0),512&e.t&&Oe((()=>K(e,!1))),e.t&=-517},te=e=>{{const t=de(e),n=t.C.isConnected;return n&&2==(18&t.t)&&K(t,!1),n}},ne=()=>{se(a.documentElement),Oe((()=>I(c,"appload",{detail:{namespace:"elsa-workflows-studio"}})))},le=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){he(e)}},oe=(e,t)=>e&&e.then?e.then(t):t(),se=e=>e.classList.add("hydrated"),ie=(e,t,n)=>{if(t.D){e.watchers&&(t.q=e.watchers);const l=Object.entries(t.D),o=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(o,e,{get(){return((e,t)=>de(this).A.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=de(e),s=o.C,i=o.A.get(t),r=o.t,c=o.i;if(n=((e,t)=>null==e||g(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.D[t][0]),!(8&r&&void 0!==i||n===i)&&(o.A.set(t,n),c)){if(l.q&&128&r){const e=l.q[t];e&&e.map((e=>{try{c[e](n,i,t)}catch(e){he(e,s)}}))}2==(18&r)&&K(o,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(o,e,{value(...t){const n=de(this);return n.F.then((()=>n.i[e](...t)))}})})),1&n){const n=new Map;o.attributeChangedCallback=function(e,t,l){f.jmp((()=>{const t=n.get(e);this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const o=l[1]||e;return n.set(o,e),512&l[0]&&t.L.push([e,o]),o}))}}return e},re=e=>{le(e,"connectedCallback")},ce=(e,t={})=>{const n=[],l=t.exclude||[],o=c.customElements,s=a.head,i=s.querySelector("meta[charset]"),r=a.createElement("style"),u=[];let $,w=!0;Object.assign(f,t),f.l=new URL(t.resourcesUrl||"./",a.baseURI).href,e.map((e=>e[1].map((t=>{const s={t:t[0],$:t[1],D:t[2],H:t[3]};s.D=t[2],s.H=t[3],s.L=[],s.q={};const i=s.$,r=class extends HTMLElement{constructor(e){super(e),pe(e=this,s)}connectedCallback(){$&&(clearTimeout($),$=null),w?u.push(this):f.jmp((()=>(e=>{if(0==(1&f.t)){const t=de(e),n=t.R,l=()=>{};if(1&t.t)p(e,t,n.H),re(t.i);else{t.t|=1,12&n.t&&(e=>{const t=e["s-cr"]=a.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){J(t,t.P=n);break}}n.D&&Object.entries(n.D).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=me(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(n.q=o.watchers,ie(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(e){he(e)}t.t&=-9,t.t|=128,e(),re(t.i)}if(o.style){let e=o.style;const t=b(n);if(!be.has(t)){const l=()=>{};((e,t,n)=>{let l=be.get(e);d&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,be.set(e,l)})(t,e,!!(1&n.t)),l()}}}const s=t.P,i=()=>K(t,!0);s&&s["s-rc"]?s["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){f.jmp((()=>(()=>{if(0==(1&f.t)){const e=de(this),t=e.i;e.o&&(e.o.map((e=>e())),e.o=void 0),le(t,"disconnectedCallback"),le(t,"componentDidUnload")}})()))}componentOnReady(){return de(this).N}};s.V=e[0],l.includes(i)||o.get(i)||(n.push(i),o.define(i,ie(r,s,1)))})))),r.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",r.setAttribute("data-styles",""),s.insertBefore(r,i?i.nextSibling:s.firstChild),w=!1,u.length?u.map((e=>e.connectedCallback())):f.jmp((()=>$=setTimeout(ne,30)))},ae=e=>{const t=new URL(e,f.l);return t.origin!==c.location.origin?t.href:t.pathname},fe=(e,t)=>t in $?$[t]:"window"===t?c:"document"===t?a:"isServer"!==t&&"isPrerender"!==t&&("isClient"===t||("resourcesUrl"===t||"publicPath"===t?ae("."):"queue"===t?{write:Me,read:Ce,tick:{then:e=>Oe(e)}}:void 0)),ue=new WeakMap,de=e=>ue.get(e),$e=(e,t)=>ue.set(t.i=e,t),pe=(e,t)=>{const n={t:0,C:e,R:t,A:new Map};return n.F=new Promise((e=>n.W=e)),n.N=new Promise((e=>n.T=e)),e["s-p"]=[],e["s-rc"]=[],p(e,n,t.H),ue.set(e,n)},we=(e,t)=>t in e,he=(e,t)=>(0,console.error)(e,t),ye=new Map,me=e=>{const t=e.$.replace(/-/g,"_"),n=e.V,l=ye.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(ye.set(n,e),e[t])),he)},be=new Map,ve=[],ge=[],ke=(e,t)=>n=>{e.push(n),r||(r=!0,t&&4&f.t?Oe(Se):f.raf(Se))},je=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){he(e)}e.length=0},Se=()=>{je(ve),je(ge),(r=ve.length>0)&&f.raf(Se)},Oe=e=>u().then(e),Ce=ke(ve,!1),Me=ke(ge,!0);export{S as H,Z as a,ce as b,G as c,ae as d,fe as e,te as f,B as g,k as h,u as p,$e as r}