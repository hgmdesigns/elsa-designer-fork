import{r as e,h as s,H as t}from"./p-94a66dfc.js";import{e as a}from"./p-2484a96d.js";import{a1 as l}from"./p-c4caec5c.js";import{b as i,W as n,S as r}from"./p-b514879f.js";import{a as o,s as c,E as d,W as h}from"./p-665c8054.js";import{c as x}from"./p-4bedee02.js";import{r as u}from"./p-dfca8bd9.js";import{h as y}from"./p-e4caa342.js";import{i as p,j as v}from"./p-884c4b95.js";import"./p-25c0eb4f.js";import"./p-db67fce4.js";const m=class{constructor(t){e(this,t),this.activityContextMenuState={shown:!1,x:0,y:0,activity:null},this.getActivityBorderColor=e=>{const s=this.workflowInstance,t=s?s.fault:null,a=(s.activityData[e.activityId]||{})._Lifecycle||{};return t&&t.faultedActivityId==e.activityId?"red":a.Executed?"green":a.Executing?"blue":null},this.renderActivityStatsButton=e=>{const s=this.workflowInstance,t=s?s.fault:null,a=(s.activityData[e.activityId]||{})._Lifecycle||{};let l;return l=t&&t.faultedActivityId==e.activityId?'<svg class="elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <circle cx="12" cy="12" r="10"/>\n                <line x1="12" y1="8" x2="12" y2="12"/>\n                <line x1="12" y1="16" x2="12.01" y2="16"/>\n              </svg>':a.Executed?'<svg class="elsa-h-6 elsa-w-6 elsa-text-green-500"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <circle cx="12" cy="12" r="10" /> \n                <line x1="12" y1="16" x2="12" y2="12" /> \n                <line x1="12" y1="8" x2="12.01" y2="8" />\n              </svg>':a.Executing?'<svg class="elsa-h-6 elsa-w-6 elsa-text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <circle cx="12" cy="12" r="10" /> \n                <line x1="12" y1="16" x2="12" y2="12" /> \n                <line x1="12" y1="8" x2="12.01" y2="8" />\n              </svg>':'<svg class="h-6 w-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                <circle cx="12" cy="12" r="10" />\n                <line x1="12" y1="16" x2="12" y2="12" />\n                <line x1="12" y1="8" x2="12.01" y2="8" />\n              </svg>',`<div class="context-menu-wrapper elsa-flex-shrink-0">\n            <button aria-haspopup="true"\n                    class="elsa-w-8 elsa-h-8 elsa-inline-flex elsa-items-center elsa-justify-center elsa-text-gray-400 elsa-rounded-full elsa-bg-transparent hover:elsa-text-gray-500 focus:elsa-outline-none focus:elsa-text-gray-500 focus:elsa-bg-gray-100 elsa-transition elsa-ease-in-out elsa-duration-150">\n              ${l}\n            </button>\n          </div>`},this.renderActivityPerformanceMenu=()=>{const e=this.activityStats;return s("div",{"data-transition-enter":"elsa-transition elsa-ease-out elsa-duration-100","data-transition-enter-start":"elsa-transform elsa-opacity-0 elsa-scale-95","data-transition-enter-end":"elsa-transform elsa-opacity-100 elsa-scale-100","data-transition-leave":"elsa-transition elsa-ease-in elsa-duration-75","data-transition-leave-start":"elsa-transform elsa-opacity-100 elsa-scale-100","data-transition-leave-end":"elsa-transform elsa-opacity-0 elsa-scale-95",class:(this.activityContextMenuState.shown?"":"hidden")+" elsa-absolute elsa-z-10 elsa-mt-3 elsa-px-2 elsa-w-screen elsa-max-w-xl sm:elsa-px-0",style:{left:`${this.activityContextMenuState.x+64}px`,top:this.activityContextMenuState.y-256+"px"},ref:e=>u(this,e,(()=>{this.handleContextMenuChange(0,0,!1,null)}))},s("div",{class:"elsa-rounded-lg elsa-shadow-lg elsa-ring-1 elsa-ring-black elsa-ring-opacity-5 elsa-overflow-hidden"},e?s("div",null,s("div",null,s("table",{class:"elsa-min-w-full elsa-divide-y elsa-divide-gray-200 elsa-border-b elsa-border-gray-200"},s("thead",{class:"elsa-bg-gray-50"},s("tr",null,s("th",{scope:"col",class:"elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider"},"Event"),s("th",{scope:"col",class:"elsa-px-6 elsa-py-3 elsa-text-left elsa-text-xs elsa-font-medium elsa-text-gray-500 elsa-text-right elsa-tracking-wider"},"Count"))),s("tbody",{class:"elsa-bg-white elsa-divide-y elsa-divide-gray-200"},e.eventCounts.length>0?e.eventCounts.map((e=>s("tr",null,s("td",{class:"elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900"},e.eventName),s("td",{class:"elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-text-gray-500"},e.count)))):s("tr",null,s("td",{colSpan:2,class:"elsa-px-6 elsa-py-4 elsa-whitespace-nowrap elsa-text-sm elsa-font-medium elsa-text-gray-900"},"No events record for this activity."))))),e.eventCounts.length>0?s("div",{class:"elsa-relative elsa-grid elsa-gap-6 elsa-bg-white px-5 elsa-py-6 sm:elsa-gap-8 sm:elsa-p-8"},(()=>{if(!e.fault)return;const t=this.workflowInstance.fault,a=e=>s("div",null,s("div",{class:"elsa-mb-4"},s("strong",{class:"elsa-block elsa-font-bold"},e.type),e.message),e.innerException?s("div",{class:"elsa-ml-4"},a(e.innerException)):void 0);return[s("div",{class:"-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-red-600",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},s("circle",{cx:"12",cy:"12",r:"10"}),s("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),s("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Fault"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},a(t.exception),s("pre",{class:"elsa-overflow-x-scroll elsa-max-w-md",onClick:e=>p(e.currentTarget)},JSON.stringify(t,null,1))))),s("a",{href:"#",class:"-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},s("path",{stroke:"none",d:"M0 0h24v24H0z"}),s("rect",{x:"4",y:"5",width:"16",height:"16",rx:"2"}),s("line",{x1:"16",y1:"3",x2:"16",y2:"7"}),s("line",{x1:"8",y1:"3",x2:"8",y2:"7"}),s("line",{x1:"4",y1:"11",x2:"20",y2:"11"}),s("line",{x1:"11",y1:"15",x2:"12",y2:"15"}),s("line",{x1:"12",y1:"15",x2:"12",y2:"18"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Faulted At"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},y(this.workflowInstance.faultedAt).format("DD-MM-YYYY HH:mm:ss"))))]})(),(()=>{if(!e.fault)return[s("a",{href:"#",class:"-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-indigo-500",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},s("path",{stroke:"none",d:"M0 0h24v24H0z"}),s("circle",{cx:"12",cy:"12",r:"9"}),s("polyline",{points:"12 7 12 12 15 15"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Average Execution Time"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},v(y.duration(e.averageExecutionTime))))),s("a",{href:"#",class:"-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-green-500",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},s("path",{stroke:"none",d:"M0 0h24v24H0z"}),s("circle",{cx:"12",cy:"12",r:"9"}),s("polyline",{points:"12 7 12 12 15 15"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Fastest Execution Time"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},v(y.duration(e.fastestExecutionTime))))),s("a",{href:"#",class:"-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-yellow-500",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},s("path",{stroke:"none",d:"M0 0h24v24H0z"}),s("circle",{cx:"12",cy:"12",r:"9"}),s("polyline",{points:"12 7 12 12 15 15"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Slowest Execution Time"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},v(y.duration(e.slowestExecutionTime))))),s("a",{href:"#",class:"-elsa-m-3 elsa-p-3 elsa-flex elsa-items-start elsa-rounded-lg hover:elsa-bg-gray-50 elsa-transition elsa-ease-in-out elsa-duration-150"},s("svg",{class:"elsa-flex-shrink-0 elsa-h-6 elsa-w-6 elsa-text-blue-600",width:"24",height:"24",viewBox:"0 0 24 24","stroke-width":"2",stroke:"currentColor",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},s("path",{stroke:"none",d:"M0 0h24v24H0z"}),s("rect",{x:"4",y:"5",width:"16",height:"16",rx:"2"}),s("line",{x1:"16",y1:"3",x2:"16",y2:"7"}),s("line",{x1:"8",y1:"3",x2:"8",y2:"7"}),s("line",{x1:"4",y1:"11",x2:"20",y2:"11"}),s("line",{x1:"11",y1:"15",x2:"12",y2:"15"}),s("line",{x1:"12",y1:"15",x2:"12",y2:"18"})),s("div",{class:"elsa-ml-4"},s("p",{class:"elsa-text-base elsa-font-medium elsa-text-gray-900"},"Last Executed At"),s("p",{class:"elsa-mt-1 elsa-text-sm elsa-text-gray-500"},y(e.lastExecutedAt).format("DD-MM-YYYY HH:mm:ss"))))]})()):void 0):s("div",{class:"elsa-p-6 elsa-bg-white"},"Loading...")))},o.initialize()}async getServerUrl(){return this.serverUrl}async workflowInstanceIdChangedHandler(e){const s=e;let t={id:null,definitionId:null,version:null,workflowStatus:i.Idle,variables:{data:{}},blockingActivities:[],scheduledActivities:[],scopes:[],currentActivity:{activityId:""}},a={id:null,version:1,activities:[],connections:[],persistenceBehavior:n.WorkflowBurst,customAttributes:{data:{}},persistWorkflow:!1,isLatest:!1,isPublished:!1,loadWorkflowContext:!1,isSingleton:!1,saveWorkflowContext:!1,variables:{data:{}},activityType:null,type:null,subType:null,action:null,event:null,properties:{data:{}},propertyStorageProviders:{}};const l=x(this.serverUrl);if(s&&s.length>0)try{t=await l.workflowInstancesApi.get(s),a=await l.workflowRegistryApi.get(t.definitionId,{version:t.version})}catch(e){console.warn("The specified workflow definition does not exist. Creating a new one.")}this.updateModels(t,a)}async serverUrlChangedHandler(e){e&&e.length>0&&await this.loadActivityDescriptors()}async componentWillLoad(){await this.serverUrlChangedHandler(this.serverUrl),await this.workflowInstanceIdChangedHandler(this.workflowInstanceId)}componentDidLoad(){this.designer||(this.designer=this.el.querySelector("elsa-designer-tree"),this.designer.model=this.workflowModel)}async loadActivityDescriptors(){const e=x(this.serverUrl);c.activityDescriptors=await e.activitiesApi.list()}updateModels(e,s){this.workflowInstance=e,this.workflowBlueprint=s,this.workflowModel=this.mapWorkflowModel(s)}mapWorkflowModel(e){return{activities:e.activities.filter((s=>s.parentId==e.id||!s.parentId)).map(this.mapActivityModel),connections:e.connections.map(this.mapConnectionModel),persistenceBehavior:e.persistenceBehavior}}mapActivityModel(e){const s=c.activityDescriptors.find((s=>s.type==e.type)),t=l.map(e.properties.data,((e,t)=>{const a=s.inputProperties.find((e=>e.name==t)).defaultSyntax||r.Literal,l={};return l[a]=e,{name:t,expressions:l,syntax:a}}));return{activityId:e.id,description:e.description,displayName:e.displayName||e.name||e.type,name:e.name,activityType:e.activityType,type:e.type,subType:e.subType,properties:t,outcomes:[...s.outcomes],persistWorkflow:e.persistWorkflow,saveWorkflowContext:e.saveWorkflowContext,loadWorkflowContext:e.loadWorkflowContext,propertyStorageProviders:e.propertyStorageProviders}}mapConnectionModel(e){return{sourceId:e.sourceActivityId,targetId:e.targetActivityId,outcome:e.outcome}}handleContextMenuChange(e,s,t,a){this.activityContextMenuState={shown:t,x:e,y:s,activity:a}}onShowWorkflowSettingsClick(){a.emit(d.ShowWorkflowSettings)}onRecordSelected(e){const s=e.detail,t=s?this.workflowBlueprint.activities.find((e=>e.id===s.activityId)):null;this.selectedActivityId=null!=t?null!=t.parentId?t.parentId:t.id:null}async onActivitySelected(e){this.selectedActivityId=e.detail.activityId,await this.journal.selectActivityRecord(this.selectedActivityId)}async onActivityDeselected(e){this.selectedActivityId==e.detail.activityId&&(this.selectedActivityId=null),await this.journal.selectActivityRecord(this.selectedActivityId)}async onActivityContextMenuButtonClicked(e){if(this.activityContextMenuState=e.detail,this.activityStats=null,!e.detail.shown)return;const s=x(this.serverUrl);this.activityStats=await s.activityStatsApi.get(this.workflowInstanceId,e.detail.activity.activityId)}render(){const e=c.activityDescriptors;return s(t,{class:"elsa-flex elsa-flex-col elsa-w-full elsa-relative",ref:e=>this.el=e},this.renderCanvas(),s("elsa-workflow-instance-journal",{ref:e=>this.journal=e,workflowInstanceId:this.workflowInstanceId,serverUrl:this.serverUrl,activityDescriptors:e,workflowBlueprint:this.workflowBlueprint,workflowModel:this.workflowModel,onRecordSelected:e=>this.onRecordSelected(e)}))}renderCanvas(){return s("div",{class:"elsa-flex-1 elsa-flex"},s("elsa-designer-tree",{model:this.workflowModel,class:"elsa-flex-1",ref:e=>this.designer=e,mode:h.Instance,activityContextMenuButton:this.renderActivityStatsButton,activityBorderColor:this.getActivityBorderColor,activityContextMenu:this.activityContextMenuState,selectedActivityIds:[this.selectedActivityId],onActivitySelected:e=>this.onActivitySelected(e),onActivityDeselected:e=>this.onActivityDeselected(e),onActivityContextMenuButtonClicked:e=>this.onActivityContextMenuButtonClicked(e)}),this.renderActivityPerformanceMenu())}static get watchers(){return{workflowInstanceId:["workflowInstanceIdChangedHandler"],serverUrl:["serverUrlChangedHandler"]}}};export{m as elsa_workflow_instance_viewer_screen}