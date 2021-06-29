import axios from "axios";
import * as collection from 'lodash/collection';
import { getVersionOptionsString } from "../models";
export const createElsaClient = function (serverUrl) {
  const config = {
    baseURL: serverUrl
  };
  const httpClient = axios.create(config);
  return {
    activitiesApi: {
      list: async () => {
        const response = await httpClient.get('v1/activities');
        return response.data;
      }
    },
    workflowDefinitionsApi: {
      list: async (page, pageSize, versionOptions) => {
        const versionOptionsString = getVersionOptionsString(versionOptions);
        const response = await httpClient.get(`v1/workflow-definitions?version=${versionOptionsString}`);
        return response.data;
      },
      getByDefinitionAndVersion: async (definitionId, versionOptions) => {
        const versionOptionsString = getVersionOptionsString(versionOptions);
        const response = await httpClient.get(`v1/workflow-definitions/${definitionId}/${versionOptionsString}`);
        return response.data;
      },
      save: async (request) => {
        const response = await httpClient.patch(`v1/workflow-definitions/${request.workflowDefinitionId}`, request);
        return response.data;
      },
      delete: async (definitionId) => {
        await httpClient.delete(`v1/workflow-definitions/${definitionId}`);
      },
      retract: async (workflowDefinitionId) => {
        const response = await httpClient.post(`v1/workflow-definitions/${workflowDefinitionId}/retract`);
        return response.data;
      },
      export: async (workflowDefinitionId, versionOptions) => {
        const versionOptionsString = getVersionOptionsString(versionOptions);
        const response = await httpClient.post(`v1/workflow-definitions/${workflowDefinitionId}/${versionOptionsString}/export`, null, {
          responseType: 'blob'
        });
        const contentDispositionHeader = response.headers["content-disposition"]; // Only available if the Elsa Server exposes the "Content-Disposition" header.
        const fileName = contentDispositionHeader ? contentDispositionHeader.split(";")[1].split("=")[1] : `workflow-definition-${workflowDefinitionId}.json`;
        const data = response.data;
        return {
          fileName: fileName,
          data: data
        };
      },
      import: async (workflowDefinitionId, file) => {
        const formData = new FormData();
        formData.append("file", file);
        const response = await httpClient.post(`v1/workflow-definitions/${workflowDefinitionId}/import`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      }
    },
    webhookDefinitionsApi: {
      list: async (page, pageSize) => {
        const response = await httpClient.get(`v1/webhook-definitions`);
        return response.data;
      },
      getByWebhookId: async (webhookId) => {
        const response = await httpClient.get(`v1/webhook-definitions/${webhookId}`);
        return response.data;
      },
      save: async (request) => {
        const response = await httpClient.post('v1/webhook-definitions', request);
        return response.data;
      },
      update: async (request) => {
        const response = await httpClient.put('v1/webhook-definitions', request);
        return response.data;
      },
      delete: async (webhookId) => {
        await httpClient.delete(`v1/webhook-definitions/${webhookId}`);
      },
    },
    workflowRegistryApi: {
      list: async (page, pageSize, versionOptions) => {
        const versionOptionsString = getVersionOptionsString(versionOptions);
        const response = await httpClient.get(`v1/workflow-registry?version=${versionOptionsString}`);
        return response.data;
      },
      get: async (id, versionOptions) => {
        const versionOptionsString = getVersionOptionsString(versionOptions);
        const response = await httpClient.get(`v1/workflow-registry/${id}/${versionOptionsString}`);
        return response.data;
      }
    },
    workflowInstancesApi: {
      list: async (page, pageSize, workflowDefinitionId, workflowStatus, orderBy, searchTerm) => {
        const queryString = {};
        if (!!workflowDefinitionId)
          queryString['workflow'] = workflowDefinitionId;
        if (workflowStatus != null)
          queryString['status'] = workflowStatus;
        if (!!orderBy)
          queryString['orderBy'] = orderBy;
        if (!!searchTerm)
          queryString['searchTerm'] = searchTerm;
        if (!!page)
          queryString['page'] = page;
        if (!!pageSize)
          queryString['pageSize'] = pageSize;
        const queryStringItems = collection.map(queryString, (v, k) => `${k}=${v}`);
        const queryStringText = queryStringItems.length > 0 ? `?${queryStringItems.join('&')}` : '';
        const response = await httpClient.get(`v1/workflow-instances${queryStringText}`);
        return response.data;
      },
      get: async (id) => {
        const response = await httpClient.get(`v1/workflow-instances/${id}`);
        return response.data;
      },
      delete: async (id) => {
        await httpClient.delete(`v1/workflow-instances/${id}`);
      },
      bulkDelete: async (request) => {
        const response = await httpClient.delete(`v1/workflow-instances/bulk`, {
          data: request
        });
        return response.data;
      }
    },
    workflowExecutionLogApi: {
      get: async (workflowInstanceId, page, pageSize) => {
        const queryString = {};
        if (!!page)
          queryString['page'] = page;
        if (!!pageSize)
          queryString['pageSize'] = pageSize;
        const queryStringItems = collection.map(queryString, (v, k) => `${k}=${v}`);
        const queryStringText = queryStringItems.length > 0 ? `?${queryStringItems.join('&')}` : '';
        const response = await httpClient.get(`v1/workflow-instances/${workflowInstanceId}/execution-log${queryStringText}`);
        return response.data;
      }
    },
    scriptingApi: {
      getJavaScriptTypeDefinitions: async (workflowDefinitionId, context) => {
        context = context || '';
        const response = await httpClient.get(`v1/scripting/javascript/type-definitions/${workflowDefinitionId}?t=${new Date().getTime()}&context=${context}`);
        return response.data;
      }
    },
    designerApi: {
      runtimeSelectItemsApi: {
        get: async (providerTypeName, context) => {
          const response = await httpClient.post('v1/designer/runtime-select-list-items', { providerTypeName: providerTypeName, context: context });
          return response.data;
        }
      }
    },
    activityStatsApi: {
      get: async (workflowInstanceId, activityId) => {
        const response = await httpClient.get(`v1/workflow-instances/${workflowInstanceId}/activity-stats/${activityId}`);
        return response.data;
      }
    },
    workflowStorageProvidersApi: {
      list: async () => {
        const response = await httpClient.get('v1/workflow-storage-providers');
        return response.data;
      }
    }
  };
};
