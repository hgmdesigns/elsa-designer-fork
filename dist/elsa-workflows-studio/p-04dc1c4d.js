import{N as n,_ as r,a2 as a,a3 as t,a4 as u,a5 as o,a6 as s,m as i,b as e,L as f,a7 as c,i as v,U as l,a8 as d,a9 as p,aa as _,ab as b}from"./p-c4caec5c.js";var m=Object.prototype.hasOwnProperty,w=function(a,t,u){var o=a[t];m.call(a,t)&&n(o,u)&&(void 0!==u||t in a)||r(a,t,u)},j=function(n,r){return!(null==n||!n.length)&&a(n,r,0)>-1},g=function(n,r,a){for(var t=-1,u=null==n?0:n.length;++t<u;)if(a(r,n[t]))return!0;return!1},x=t&&1/u(new t([,-0]))[1]==1/0?function(n){return new t(n)}:function(){},y=function(n,r,a){var t=-1,i=j,e=n.length,f=!0,c=[],v=c;if(a)f=!1,i=g;else if(e>=200){var l=r?null:x(n);if(l)return u(l);f=!1,i=s,v=new o}else v=r?[]:c;n:for(;++t<e;){var d=n[t],p=r?r(d):d;if(d=a||0!==d?d:0,f&&p==p){for(var _=v.length;_--;)if(v[_]===p)continue n;r&&v.push(p),c.push(d)}else i(v,p,a)||(v!==c&&v.push(p),c.push(d))}return c},z=function(n){return i(n)&&e(n)},L=f((function(n){return y(c(n,1,z,!0))})),N=function(n){return null!=n&&n.length?c(n,1):[]},O=function(n,r,a,t){if(!v(n))return n;for(var u=-1,o=(r=l(r,n)).length,s=o-1,i=n;null!=i&&++u<o;){var e=d(r[u]),f=a;if("__proto__"===e||"constructor"===e||"prototype"===e)return n;if(u!=s){var c=i[e];void 0===(f=t?t(c,e,i):void 0)&&(f=v(c)?c:p(r[u+1])?[]:{})}w(i,e,f),i=i[e]}return n},U=function(n){return _(b(n,void 0,N),n+"")},h=function(n,r,a){for(var t=-1,u=n.length,o=r.length,s={};++t<u;)a(s,n[t],t<o?r[t]:void 0);return s},k=function(n,r){return h(n||[],r||[],w)};export{w as _,O as a,U as b,j as c,g as d,y as e,N as f,h as g,z as i,L as u,k as z}