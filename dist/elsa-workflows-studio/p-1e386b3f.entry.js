import{r as e,h as a}from"./p-94a66dfc.js";import{M as t,ac as s,ad as l,g as r,a7 as n,v as i,q as o,ae as u,o as c,a5 as d,a6 as f,L as h,B as p,$ as x,af as g,a2 as v,ag as y,ah as w,a9 as m,ai as b,a8 as k,U as M,aj as I,ak as B,Q as C,R as A,N as D,al as S,am as W,an as j,ao as z,ap as Y,aq as H,a1 as L}from"./p-c4caec5c.js";import{c as F,d as $,i as O,b as q,e as U,g as R,a as V,f as _,u as N,z as Q}from"./p-04dc1c4d.js";import{c as T}from"./p-4bedee02.js";import{O as E,b as P}from"./p-b514879f.js";import{D as G}from"./p-3478a766.js";import{h as J}from"./p-884c4b95.js";import{h as K}from"./p-e4caa342.js";import"./p-25c0eb4f.js";var X=Math.ceil,Z=Math.max,ee=function(e,a,t,s){var l=-1,r=F,n=!0,i=e.length,o=[],h=a.length;if(!i)return o;t&&(a=u(a,c(t))),s?(r=$,n=!1):a.length>=200&&(r=f,n=!1,a=new d(a));e:for(;++l<i;){var p=e[l],x=null==t?p:t(p);if(p=s||0!==p?p:0,n&&x==x){for(var g=h;g--;)if(a[g]===x)continue e;o.push(p)}else r(a,x,s)||o.push(p)}return o},ae=h((function(e,a){return O(e)?ee(e,n(a,1,O,!0)):[]})),te=h((function(e,a){var t=x(a);return O(t)&&(t=void 0),O(e)?ee(e,n(a,1,O,!0),p(t)):[]})),se=h((function(e,a){var t=x(a);return O(t)&&(t=void 0),O(e)?ee(e,n(a,1,O,!0),void 0,t):[]})),le=function(e,a,t,s){for(var r=e.length,n=s?r:-1;(s?n--:++n<r)&&a(e[n],n,e););return t?l(e,s?0:n,s?n+1:r):l(e,s?n+1:0,s?r:n)},re=function(e,a,t,l){var r=e.length;for((t=s(t))<0&&(t=-t>r?0:r+t),(l=void 0===l||l>r?r:s(l))<0&&(l+=r),l=t>l?0:function(e){return e?g(s(e),0,4294967295):0}(l);t<l;)e[t++]=a;return e},ne=function(e){return e&&e.length?e[0]:void 0},ie=ne,oe=Math.max,ue=Math.min,ce=function(e,a,t){for(var s=t?$:F,l=e[0].length,r=e.length,n=r,i=Array(r),o=1/0,h=[];n--;){var p=e[n];n&&a&&(p=u(p,c(a))),o=ue(p.length,o),i[n]=!t&&(a||l>=120&&p.length>=120)?new d(n&&p):void 0}p=e[0];var x=-1,g=i[0];e:for(;++x<l&&h.length<o;){var v=p[x],y=a?a(v):v;if(v=t||0!==v?v:0,!(g?f(g,y):s(h,y,t))){for(n=r;--n;){var w=i[n];if(!(w?f(w,y):s(e[n],y,t)))continue e}g&&g.push(y),h.push(v)}}return h},de=function(e){return O(e)?e:[]},fe=h((function(e){var a=u(e,de);return a.length&&a[0]===e[0]?ce(a):[]})),he=h((function(e){var a=x(e),t=u(e,de);return a===x(t)?a=void 0:t.pop(),t.length&&t[0]===e[0]?ce(t,p(a)):[]})),pe=h((function(e){var a=x(e),t=u(e,de);return(a="function"==typeof a?a:void 0)&&t.pop(),t.length&&t[0]===e[0]?ce(t,void 0,a):[]})),xe=Array.prototype.join,ge=Math.max,ve=Math.min,ye=function(e,a,t,s){for(var l=t-1,r=e.length;++l<r;)if(s(e[l],a))return l;return-1},we=Array.prototype.splice,me=function(e,a,t,s){var l=s?ye:v,r=-1,n=a.length,i=e;for(e===a&&(a=o(a)),t&&(i=u(e,c(t)));++r<n;)for(var d=0,f=a[r],h=t?t(f):f;(d=l(i,h,d,s))>-1;)i!==e&&we.call(i,d,1),we.call(e,d,1);return e},be=function(e,a){return e&&e.length&&a&&a.length?me(e,a):e},ke=h(be),Me=Array.prototype.splice,Ie=function(e,a){for(var t=e?a.length:0,s=t-1;t--;){var l=a[t];if(t==s||l!==r){var r=l;m(l)?Me.call(e,l,1):(i=M(i=l,n=e),null==(n=I(n,i))||delete n[k(x(i))])}}var n,i;return e},Be=q((function(e,a){var t=null==e?0:e.length,s=function(e,a){for(var t=-1,s=a.length,l=Array(s),r=null==e;++t<s;)l[t]=r?void 0:b(e,a[t]);return l}(e,a);return Ie(e,u(a,(function(e){return m(e,t)?+e:e})).sort(B)),s})),Ce=Array.prototype.reverse,Ae=Math.floor,De=Math.min,Se=function(e,a,t,s){var l=0,r=null==e?0:e.length;if(0===r)return 0;for(var n=(a=t(a))!=a,i=null===a,o=C(a),u=void 0===a;l<r;){var c=Ae((l+r)/2),d=t(e[c]),f=void 0!==d,h=null===d,p=d==d,x=C(d);if(n)var g=s||p;else g=u?p&&(s||f):i?p&&f&&(s||!h):o?p&&f&&!h&&(s||!x):!h&&!x&&(s?d<=a:d<a);g?l=c+1:r=c}return De(r,4294967294)},We=function(e,a,t){var s=0,l=null==e?s:e.length;if("number"==typeof a&&a==a&&l<=2147483647){for(;s<l;){var r=s+l>>>1,n=e[r];null!==n&&!C(n)&&(t?n<=a:n<a)?s=r+1:l=r}return l}return Se(e,a,A,t)},je=function(e,a){for(var t=-1,s=e.length,l=0,r=[];++t<s;){var n=e[t],i=a?a(n):n;if(!t||!D(i,o)){var o=i;r[l++]=0===n?0:n}}return r},ze=h((function(e){var a=x(e);return O(a)&&(a=void 0),U(n(e,1,O,!0),p(a))})),Ye=h((function(e){var a=x(e);return a="function"==typeof a?a:void 0,U(n(e,1,O,!0),void 0,a)})),He=Math.max,Le=function(e){if(!e||!e.length)return[];var a=0;return e=S(e,(function(e){if(O(e))return a=He(e.length,a),!0})),W(a,(function(a){return u(e,j(a))}))},Fe=function(e,a){if(!e||!e.length)return[];var t=Le(e);return null==a?t:u(t,(function(e){return z(a,void 0,e)}))},$e=h((function(e,a){return O(e)?ee(e,a):[]})),Oe=function(e,a,t){var s=e.length;if(s<2)return s?U(e[0]):[];for(var l=-1,r=Array(s);++l<s;)for(var i=e[l],o=-1;++o<s;)o!=l&&(r[l]=ee(r[l]||i,e[o],a,t));return U(n(r,1),a,t)},qe=h((function(e){return Oe(S(e,O))})),Ue=h((function(e){var a=x(e);return O(a)&&(a=void 0),Oe(S(e,O),p(a))})),Re=h((function(e){var a=x(e);return a="function"==typeof a?a:void 0,Oe(S(e,O),void 0,a)})),Ve=h(Le),_e=h((function(e){var a=e.length,t=a>1?e[a-1]:void 0;return t="function"==typeof t?(e.pop(),t):void 0,Fe(e,t)})),Ne={chunk:function(e,a,r){a=(r?t(e,a,r):void 0===a)?1:Z(s(a),0);var n=null==e?0:e.length;if(!n||a<1)return[];for(var i=0,o=0,u=Array(X(n/a));i<n;)u[o++]=l(e,i,i+=a);return u},compact:function(e){for(var a=-1,t=null==e?0:e.length,s=0,l=[];++a<t;){var r=e[a];r&&(l[s++]=r)}return l},concat:function(){var e=arguments.length;if(!e)return[];for(var a=Array(e-1),t=arguments[0],s=e;s--;)a[s-1]=arguments[s];return r(i(t)?o(t):[t],n(a,1))},difference:ae,differenceBy:te,differenceWith:se,drop:function(e,a,t){var r=null==e?0:e.length;return r?(a=t||void 0===a?1:s(a),l(e,a<0?0:a,r)):[]},dropRight:function(e,a,t){var r=null==e?0:e.length;return r?(a=t||void 0===a?1:s(a),l(e,0,(a=r-a)<0?0:a)):[]},dropRightWhile:function(e,a){return e&&e.length?le(e,p(a),!0,!0):[]},dropWhile:function(e,a){return e&&e.length?le(e,p(a),!0):[]},fill:function(e,a,s,l){var r=null==e?0:e.length;return r?(s&&"number"!=typeof s&&t(e,a,s)&&(s=0,l=r),re(e,a,s,l)):[]},findIndex:Y,findLastIndex:H,first:ie,flatten:_,flattenDeep:function(e){return null!=e&&e.length?n(e,1/0):[]},flattenDepth:function(e,a){return null!=e&&e.length?(a=void 0===a?1:s(a),n(e,a)):[]},fromPairs:function(e){for(var a=-1,t=null==e?0:e.length,s={};++a<t;){var l=e[a];s[l[0]]=l[1]}return s},head:ne,indexOf:function(e,a,t){var l=null==e?0:e.length;if(!l)return-1;var r=null==t?0:s(t);return r<0&&(r=oe(l+r,0)),v(e,a,r)},initial:function(e){return null!=e&&e.length?l(e,0,-1):[]},intersection:fe,intersectionBy:he,intersectionWith:pe,join:function(e,a){return null==e?"":xe.call(e,a)},last:x,lastIndexOf:function(e,a,t){var l=null==e?0:e.length;if(!l)return-1;var r=l;return void 0!==t&&(r=(r=s(t))<0?ge(l+r,0):ve(r,l-1)),a==a?function(e,a,t){for(var s=t+1;s--;)if(e[s]===a)return s;return s}(e,a,r):y(e,w,r,!0)},nth:function(e,a){return e&&e.length?function(e,a){var t=e.length;if(t)return m(a+=a<0?t:0,t)?e[a]:void 0}(e,s(a)):void 0},pull:ke,pullAll:be,pullAllBy:function(e,a,t){return e&&e.length&&a&&a.length?me(e,a,p(t)):e},pullAllWith:function(e,a,t){return e&&e.length&&a&&a.length?me(e,a,void 0,t):e},pullAt:Be,remove:function(e,a){var t=[];if(!e||!e.length)return t;var s=-1,l=[],r=e.length;for(a=p(a);++s<r;){var n=e[s];a(n,s,e)&&(t.push(n),l.push(s))}return Ie(e,l),t},reverse:function(e){return null==e?e:Ce.call(e)},slice:function(e,a,r){var n=null==e?0:e.length;return n?(r&&"number"!=typeof r&&t(e,a,r)?(a=0,r=n):(a=null==a?0:s(a),r=void 0===r?n:s(r)),l(e,a,r)):[]},sortedIndex:function(e,a){return We(e,a)},sortedIndexBy:function(e,a,t){return Se(e,a,p(t))},sortedIndexOf:function(e,a){var t=null==e?0:e.length;if(t){var s=We(e,a);if(s<t&&D(e[s],a))return s}return-1},sortedLastIndex:function(e,a){return We(e,a,!0)},sortedLastIndexBy:function(e,a,t){return Se(e,a,p(t),!0)},sortedLastIndexOf:function(e,a){if(null!=e&&e.length){var t=We(e,a,!0)-1;if(D(e[t],a))return t}return-1},sortedUniq:function(e){return e&&e.length?je(e):[]},sortedUniqBy:function(e,a){return e&&e.length?je(e,p(a)):[]},tail:function(e){var a=null==e?0:e.length;return a?l(e,1,a):[]},take:function(e,a,t){return e&&e.length?(a=t||void 0===a?1:s(a),l(e,0,a<0?0:a)):[]},takeRight:function(e,a,t){var r=null==e?0:e.length;return r?(a=t||void 0===a?1:s(a),l(e,(a=r-a)<0?0:a,r)):[]},takeRightWhile:function(e,a){return e&&e.length?le(e,p(a),!1,!0):[]},takeWhile:function(e,a){return e&&e.length?le(e,p(a)):[]},union:N,unionBy:ze,unionWith:Ye,uniq:function(e){return e&&e.length?U(e):[]},uniqBy:function(e,a){return e&&e.length?U(e,p(a)):[]},uniqWith:function(e,a){return a="function"==typeof a?a:void 0,e&&e.length?U(e,void 0,a):[]},unzip:Le,unzipWith:Fe,without:$e,xor:qe,xorBy:Ue,xorWith:Re,zip:Ve,zipObject:Q,zipObjectDeep:function(e,a){return R(e||[],a||[],V)},zipWith:_e};const Qe=class{constructor(a){e(this,a),this.workflowBlueprints=[],this.workflowInstances={items:[],page:1,pageSize:50,totalCount:0},this.selectedOrderBy=E.Started,this.selectedWorkflowInstanceIds=[],this.page=0,this.pageSize=15}async componentWillLoad(){this.history.listen((e=>this.routeChanged(e))),this.applyQueryString(this.history.location.search),await this.loadWorkflowBlueprints(),await this.loadWorkflowInstances()}applyQueryString(e){var a;const t=J(e);this.selectedWorkflowId=t.workflow,this.selectedWorkflowStatus=t.status,this.selectedOrderBy=null!==(a=t.orderBy)&&void 0!==a?a:E.Started,this.page=t.page?parseInt(t.page):0,this.pageSize=t.pageSize?parseInt(t.pageSize):15}async loadWorkflowBlueprints(){const e=this.createClient(),a=await e.workflowRegistryApi.list(null,null,{allVersions:!0});this.workflowBlueprints=a.items}async loadWorkflowInstances(){const e=this.createClient();this.workflowInstances=await e.workflowInstancesApi.list(this.page,this.pageSize,this.selectedWorkflowId,this.selectedWorkflowStatus,this.selectedOrderBy,this.searchTerm)}createClient(){return T(this.serverUrl)}getLatestWorkflowBlueprintVersions(){const e=L.groupBy(this.workflowBlueprints,"id");return L.map(e,(e=>Ne.first(L.sortBy(e,"version","desc"))))}buildFilterUrl(e,a,t){const s={};return e&&(s.workflow=e),a&&(s.status=a),t&&(s.orderBy=t),this.page&&(s.page=this.page.toString()),this.pageSize&&(s.pageSize=this.pageSize.toString()),`/workflow-instances?${L.map(s,((e,a)=>`${a}=${e}`)).join("&")}`}getStatusColor(e){switch(e){default:case P.Idle:return"gray";case P.Running:return"rose";case P.Suspended:return"blue";case P.Finished:return"green";case P.Faulted:return"red";case P.Cancelled:return"yellow"}}updateSelectAllChecked(){this.selectAllChecked=this.workflowInstances.items.findIndex((e=>this.selectedWorkflowInstanceIds.findIndex((a=>a==e.id))<0))<0}async routeChanged(e){e.pathname.toLowerCase().indexOf("workflow-instances")<0||(this.applyQueryString(e.search),await this.loadWorkflowInstances())}onSelectAllCheckChange(e){const a=e.target.checked;this.selectAllChecked=a,this.selectedWorkflowInstanceIds=[],a&&(this.selectedWorkflowInstanceIds=this.workflowInstances.items.map((e=>e.id)))}onWorkflowInstanceCheckChange(e,a){this.selectedWorkflowInstanceIds=e.target.checked?[...this.selectedWorkflowInstanceIds,a.id]:this.selectedWorkflowInstanceIds.filter((e=>e!=a.id)),this.updateSelectAllChecked()}async onDeleteClick(e,a){if(!await this.confirmDialog.show("Delete Workflow Instance","Are you sure you wish to permanently delete this workflow instance?"))return;const t=this.createClient();await t.workflowInstancesApi.delete(a.id),await this.loadWorkflowInstances()}async onBulkDelete(){if(!await this.confirmDialog.show("Delete Selected Workflow Instances","Are you sure you wish to permanently delete all selected workflow instances?"))return;const e=this.createClient();await e.workflowInstancesApi.bulkDelete({workflowInstanceIds:this.selectedWorkflowInstanceIds}),this.selectedWorkflowInstanceIds=[],this.updateSelectAllChecked(),await this.loadWorkflowInstances(),this.page=0}async onBulkActionSelected(e){switch(e.detail.name){case"Delete":await this.onBulkDelete()}}async onSearch(e){e.preventDefault();const a=new FormData(e.currentTarget).get("searchTerm");this.searchTerm=a.toString(),await this.loadWorkflowInstances()}render(){const e=this.workflowInstances.items,t=this.workflowBlueprints;return a("div",null,a("div",{class:"elsa-relative elsa-z-10 elsa-flex-shrink-0 elsa-flex elsa-h-16 elsa-bg-white elsa-border-b elsa-border-gray-200"},a("div",{class:"elsa-flex-1 elsa-px-4 elsa-flex elsa-justify-between sm:elsa-px-6 lg:elsa-px-8"},a("div",{class:"elsa-flex-1 elsa-flex"},a("form",{class:"elsa-w-full elsa-flex md:ml-0",onSubmit:e=>this.onSearch(e)},a("label",{htmlFor:"search_field",class:"elsa-sr-only"},"Search"),a("div",{class:"elsa-relative elsa-w-full elsa-text-cool-gray-400 focus-within:elsa-text-cool-gray-600"},a("div",{class:"elsa-absolute elsa-inset-y-0 elsa-left-0 elsa-flex elsa-items-center elsa-pointer-events-none"},a("svg",{class:"elsa-h-5 elsa-w-5",fill:"currentColor",viewBox:"0 0 20 20"},a("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"}))),a("input",{name:"searchTerm",class:"elsa-block elsa-w-full elsa-h-full elsa-pl-8 elsa-pr-3 elsa-py-2 elsa-rounded-md elsa-text-cool-gray-900 elsa-placeholder-cool-gray-500 focus:elsa-placeholder-cool-gray-400 sm:elsa-text-sm elsa-border-0 focus:elsa-outline-none focus:elsa-ring-0",placeholder:"Search",type:"search"})))))),a("div",{class:"elsa-p-8 elsa-flex elsa-content-end elsa-justify-right elsa-bg-white elsa-space-x-4"},a("div",{class:"elsa-flex-shrink-0"},this.renderBulkActions()),a("div",{class:"elsa-flex-1"}," "),this.renderWorkflowFilter(),this.renderStatusFilter(),this.renderOrderByFilter()),a("div",{class:"elsa-mt-8 sm:elsa-block"},a("div",{class:"elsa-align-middle elsa-inline-block elsa-min-w-full elsa-border-b elsa-border-gray-200"},a("table",{class:"elsa-min-w-full"},a("thead",null,a("tr",{class:"elsa-border-t elsa-border-gray-200"},a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},a("input",{type:"checkbox",value:"true",checked:this.selectAllChecked,onChange:e=>this.onSelectAllCheckChange(e),class:"focus:elsa-ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300 elsa-rounded"})),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"ID"),a("th",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Correlation ID"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Workflow"),a("th",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-right elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Version"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Instance Name"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Status"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Created"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Finished"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Last Executed"),a("th",{class:"elsa-px-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-left elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"},"Faulted"),a("th",{class:"elsa-pr-6 elsa-py-3 elsa-border-b elsa-border-gray-200 elsa-bg-gray-50 elsa-text-xs elsa-leading-4 elsa-font-medium elsa-text-gray-500 elsa-uppercase elsa-tracking-wider"}))),a("tbody",{class:"elsa-bg-white elsa-divide-y elsa-divide-gray-100"},e.map((e=>{var s;const l=null!==(s=t.find((a=>a.id==e.definitionId&&a.version==e.version)))&&void 0!==s?s:{name:"Not Found",displayName:"(Workflow definition not found)"},r=l.displayName||l.name||"Untitled",n=this.getStatusColor(e.workflowStatus),i=`/workflow-instances/${e.id}`,o=e.name?e.name:"",u=this.selectedWorkflowInstanceIds.findIndex((a=>a===e.id))>=0,c=K(e.createdAt),d=e.finishedAt?K(e.finishedAt):null,f=e.lastExecutedAt?K(e.lastExecutedAt):null,h=e.faultedAt?K(e.faultedAt):null;return a("tr",null,a("td",{class:"elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900"},a("input",{type:"checkbox",value:e.id,checked:u,onChange:a=>this.onWorkflowInstanceCheckChange(a,e),class:"focus:elsa-ring-blue-500 elsa-h-4 elsa-w-4 elsa-text-blue-600 elsa-border-gray-300 elsa-rounded"})),a("td",{class:"elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900"},a("stencil-route-link",{url:i,anchorClass:"elsa-truncate hover:elsa-text-gray-600"},e.id)),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900"},e.correlationId?e.correlationId:""),a("td",{class:"elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900 elsa-text-left"},a("a",{href:`/workflow-registry/${e.definitionId}/viewer`,class:"elsa-truncate hover:elsa-text-gray-600"},r)),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-right elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-uppercase"},e.version),a("td",{class:"elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-font-medium elsa-text-gray-900 elsa-text-left"},a("stencil-route-link",{url:'"@($" workflow-registry/{workflowInstance.definitionId}/viewer")"',anchorClass:"elsa-truncate hover:elsa-text-gray-600"},o)),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-right"},a("div",{class:"elsa-flex elsa-items-center elsa-space-x-3 lg:elsa-pl-2"},a("div",{class:`flex-shrink-0 elsa-w-2-5 elsa-h-2-5 elsa-rounded-full elsa-bg-${n}-600`}),a("span",null,e.workflowStatus))),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-left"},c.format("DD-MM-YYYY HH:mm:ss")),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-left"},d?d.format("DD-MM-YYYY HH:mm:ss"):"-"),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-left"},f?f.format("DD-MM-YYYY HH:mm:ss"):"-"),a("td",{class:"hidden md:elsa-table-cell elsa-px-6 elsa-py-3 elsa-whitespace-no-wrap elsa-text-sm elsa-leading-5 elsa-text-gray-500 elsa-text-left"},h?h.format("DD-MM-YYYY HH:mm:ss"):"-"),a("td",{class:"elsa-pr-6"},a("elsa-context-menu",{history:this.history,menuItems:[{text:"View",anchorUrl:i,icon:a("svg",{class:"elsa-h-5 elsa-w-5 elsa-text-gray-500",width:"24",height:"24",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},a("path",{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"}),a("path",{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"}))},{text:"Delete",clickHandler:a=>this.onDeleteClick(a,e),icon:a("svg",{class:"elsa-h-5 elsa-w-5 elsa-text-gray-500",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},a("path",{stroke:"none",d:"M0 0h24v24H0z"}),a("line",{x1:"4",y1:"7",x2:"20",y2:"7"}),a("line",{x1:"10",y1:"11",x2:"10",y2:"17"}),a("line",{x1:"14",y1:"11",x2:"14",y2:"17"}),a("path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"}),a("path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"}))}]})))})))),a("elsa-pager",{page:this.page,pageSize:this.pageSize,totalCount:this.workflowInstances.totalCount,history:this.history})),a("elsa-confirm-dialog",{ref:e=>this.confirmDialog=e})))}renderBulkActions(){const e=a("svg",{class:"elsa-mr-3 elsa-h-5 elsa-w-5 elsa-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M13 10V3L4 14h7v7l9-11h-7z"}));return a("elsa-dropdown-button",{text:"Bulk Actions",items:[{text:"Delete",name:"Delete"}],icon:e,origin:G.TopLeft,onItemSelected:e=>this.onBulkActionSelected(e)})}renderWorkflowFilter(){const e=this.getLatestWorkflowBlueprintVersions(),t=this.selectedWorkflowId,s=e.find((e=>e.id==t)),l=t&&s?s.displayName||s.name:"Workflow",r=this.selectedWorkflowStatus,n=this.selectedOrderBy;let i=e.map((e=>({text:e.displayName&&e.displayName.length>0?e.displayName:e.name||"Untitled",value:e.id,url:this.buildFilterUrl(e.id,r,n),isSelected:e.id==t})));return i=[{text:"All",value:null,url:this.buildFilterUrl(null,r,n),isSelected:!t},...i],a("elsa-dropdown-button",{text:l,items:i,icon:a("svg",{class:"elsa-mr-3 elsa-h-5 elsa-w-5 elsa-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a("path",{stroke:"none",d:"M0 0h24v24H0z"}),a("rect",{x:"4",y:"4",width:"6",height:"6",rx:"1"}),a("rect",{x:"14",y:"4",width:"6",height:"6",rx:"1"}),a("rect",{x:"4",y:"14",width:"6",height:"6",rx:"1"}),a("rect",{x:"14",y:"14",width:"6",height:"6",rx:"1"})),origin:G.TopRight,onItemSelected:e=>this.selectedWorkflowId=e.detail.value})}renderStatusFilter(){const e=this.selectedWorkflowStatus,t=e||"Status",s=[null,P.Running,P.Suspended,P.Finished,P.Faulted,P.Cancelled,P.Idle].map((a=>({text:null!=a?a:"All",url:this.buildFilterUrl(this.selectedWorkflowId,a,this.selectedOrderBy),isSelected:a==e})));return a("elsa-dropdown-button",{text:t,items:s,icon:a("svg",{class:"elsa-mr-3 elsa-h-5 elsa-w-5 elsa-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a("circle",{cx:"12",cy:"12",r:"10"}),a("polygon",{points:"10 8 16 12 10 16 10 8"})),origin:G.TopRight})}renderOrderByFilter(){const e=this.selectedOrderBy,t=e?`Sort by: ${e}`:"Sort",s=[E.Finished,E.LastExecuted,E.Started].map((a=>({text:a,url:this.buildFilterUrl(this.selectedWorkflowId,this.selectedWorkflowStatus,a),isSelected:a==e})));return a("elsa-dropdown-button",{text:t,items:s,icon:a("svg",{class:"elsa-mr-3 elsa-h-5 elsa-w-5 elsa-text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},a("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"})),origin:G.TopRight})}};export{Qe as elsa_workflow_instance_list_screen}