import { a1 as collection } from './collection-ba33bbb1.js';

Array.prototype.distinct = function () {
  return [...new Set(this)];
};
if (!Array.prototype.last) {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };
}
function getChildActivities(workflowModel, parentId) {
  if (parentId == null) {
    const targetIds = new Set(workflowModel.connections.map(x => x.targetId));
    return workflowModel.activities.filter(x => !targetIds.has(x.activityId));
  }
  else {
    const targetIds = new Set(workflowModel.connections.filter(x => x.sourceId === parentId).map(x => x.targetId));
    return workflowModel.activities.filter(x => targetIds.has(x.activityId));
  }
}
function getInboundConnections(workflowModel, activityId) {
  return workflowModel.connections.filter(x => x.targetId === activityId);
}
function getOutboundConnections(workflowModel, activityId) {
  return workflowModel.connections.filter(x => x.sourceId === activityId);
}
function removeActivity(workflowModel, activityId) {
  const inboundConnections = getInboundConnections(workflowModel, activityId);
  const outboundConnections = getOutboundConnections(workflowModel, activityId);
  const connectionsToRemove = [...inboundConnections, ...outboundConnections];
  return Object.assign(Object.assign({}, workflowModel), { activities: workflowModel.activities.filter(x => x.activityId != activityId), connections: workflowModel.connections.filter(x => connectionsToRemove.indexOf(x) < 0) });
}
function removeConnection(workflowModel, sourceId, outcome) {
  return Object.assign(Object.assign({}, workflowModel), { connections: workflowModel.connections.filter(x => !(x.sourceId === sourceId && x.outcome === outcome)) });
}
function findActivity(workflowModel, activityId) {
  return workflowModel.activities.find(x => x.activityId === activityId);
}
function addConnection(workflowModel, ...args) {
  const connection = typeof (args) == 'object' ? args : { sourceId: args[0], targetId: args[1], outcome: args[3] };
  return Object.assign(Object.assign({}, workflowModel), { connections: [...workflowModel.connections, connection] });
}
function setActivityModelProperty(activityModel, name, expression, syntax) {
  setProperty(activityModel.properties, name, expression, syntax);
}
function setProperty(properties, name, expression, syntax) {
  let property = properties.find(x => x.name == name);
  if (!syntax)
    syntax = 'Literal';
  if (!property) {
    const expressions = {};
    expressions[syntax] = expression;
    property = { name: name, expressions: expressions, syntax: syntax };
    properties.push(property);
  }
  else {
    property.expressions[syntax] = expression;
    property.syntax = syntax;
  }
}
function getOrCreateProperty(activity, name, defaultExpression, defaultSyntax) {
  let property = activity.properties.find(x => x.name == name);
  if (!property) {
    const expressions = {};
    let syntax = defaultSyntax ? defaultSyntax() : undefined;
    if (!syntax)
      syntax = 'Literal';
    expressions[syntax] = defaultExpression ? defaultExpression() : undefined;
    property = { name: name, expressions: expressions, syntax: null };
    activity.properties.push(property);
  }
  return property;
}
function parseJson(json) {
  if (!json)
    return null;
  try {
    return JSON.parse(json);
  }
  catch (e) {
    console.warn(`Error parsing JSON: ${e}`);
  }
  return undefined;
}
function parseQuery(queryString) {
  if (!queryString)
    return {};
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}
function queryToString(query) {
  const q = query || {};
  return collection.map(q, (v, k) => `${k}=${v}`).join('&');
}
function mapSyntaxToLanguage(syntax) {
  switch (syntax) {
    case 'Json':
      return 'json';
    case 'JavaScript':
      return 'javascript';
    case 'Liquid':
      return 'handlebars';
    case 'Literal':
    default:
      return 'plaintext';
  }
}
function durationToString(duration) {
  return !!duration ? duration.asHours() > 1
    ? `${duration.asHours().toFixed(3)} h`
    : duration.asMinutes() > 1
      ? `${duration.asMinutes().toFixed(3)} m`
      : duration.asSeconds() > 1
        ? `${duration.asSeconds().toFixed(3)} s`
        : `${duration.asMilliseconds()} ms`
    : null;
}
function clip(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export { getOutboundConnections as a, addConnection as b, getChildActivities as c, removeConnection as d, getOrCreateProperty as e, findActivity as f, getInboundConnections as g, parseQuery as h, clip as i, durationToString as j, mapSyntaxToLanguage as m, parseJson as p, queryToString as q, removeActivity as r, setActivityModelProperty as s };
