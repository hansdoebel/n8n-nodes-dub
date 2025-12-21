import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForTagsGetAll = {
  operation: ["getAll"],
  resource: ["tags"],
};

export const tagsGetAllDescription: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: true,
    displayOptions: {
      show: showForTagsGetAll,
    },
    description: "Whether to return all results or only up to a given limit",
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tags"],
        returnAll: [false],
      },
    },
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
  },
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["tags"],
        returnAll: [false],
      },
    },
    description: "Page number for pagination",
    typeOptions: {
      minValue: 1,
    },
  },
];

export async function tagsGetAll(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const returnAll = this.getNodeParameter("returnAll", 0) as boolean;

  const qs: IDataObject = {};

  if (!returnAll) {
    qs.limit = this.getNodeParameter("limit", 0) as number;
    qs.page = this.getNodeParameter("page", 0) as number;
  }

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.TAGS_GET_ALL,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default tagsGetAllDescription;
