export var WorkflowContextFidelity;
(function (WorkflowContextFidelity) {
  WorkflowContextFidelity["Burst"] = "Burst";
  WorkflowContextFidelity["Activity"] = "Activity";
})(WorkflowContextFidelity || (WorkflowContextFidelity = {}));
export var WorkflowPersistenceBehavior;
(function (WorkflowPersistenceBehavior) {
  WorkflowPersistenceBehavior["Suspended"] = "Suspended";
  WorkflowPersistenceBehavior["WorkflowBurst"] = " WorkflowBurst";
  WorkflowPersistenceBehavior["WorkflowPassCompleted"] = "WorkflowPassCompleted";
  WorkflowPersistenceBehavior["ActivityExecuted"] = "ActivityExecuted";
})(WorkflowPersistenceBehavior || (WorkflowPersistenceBehavior = {}));
export var WorkflowStatus;
(function (WorkflowStatus) {
  WorkflowStatus["Idle"] = "Idle";
  WorkflowStatus["Running"] = "Running";
  WorkflowStatus["Finished"] = "Finished";
  WorkflowStatus["Suspended"] = "Suspended";
  WorkflowStatus["Faulted"] = "Faulted";
  WorkflowStatus["Cancelled"] = "Cancelled";
})(WorkflowStatus || (WorkflowStatus = {}));
export var OrderBy;
(function (OrderBy) {
  OrderBy["Started"] = "Started";
  OrderBy["LastExecuted"] = "LastExecuted";
  OrderBy["Finished"] = "Finished";
})(OrderBy || (OrderBy = {}));
export var ActivityTraits;
(function (ActivityTraits) {
  ActivityTraits[ActivityTraits["Action"] = 1] = "Action";
  ActivityTraits[ActivityTraits["Trigger"] = 2] = "Trigger";
  ActivityTraits[ActivityTraits["Job"] = 4] = "Job";
})(ActivityTraits || (ActivityTraits = {}));
export class SyntaxNames {
}
SyntaxNames.Literal = 'Literal';
SyntaxNames.JavaScript = 'JavaScript';
SyntaxNames.Liquid = 'Liquid';
SyntaxNames.Json = 'Json';
SyntaxNames.Variable = 'Variable';
SyntaxNames.Output = 'Output';
export const getVersionOptionsString = (versionOptions) => {
  if (!versionOptions)
    return '';
  return versionOptions.allVersions
    ? 'AllVersions'
    : versionOptions.isDraft
      ? 'Draft'
      : versionOptions.isLatest
        ? 'Latest'
        : versionOptions.isPublished
          ? 'Published'
          : versionOptions.isLatestOrPublished
            ? 'LatestOrPublished'
            : versionOptions.version.toString();
};
