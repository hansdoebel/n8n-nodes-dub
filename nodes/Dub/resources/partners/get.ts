import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForPartnersGet = {
  operation: ["get"],
  resource: ["partners"],
};

export const partnersGetDescription: INodeProperties[] = [
  {
    displayName: "Get By",
    name: "getBy",
    type: "options",
    options: [
      {
        name: "Email",
        value: "email",
      },
      {
        name: "Partner ID",
        value: "partnerId",
      },
      {
        name: "Tenant ID",
        value: "tenantId",
      },
    ],
    default: "email",
    displayOptions: {
      show: showForPartnersGet,
    },
    description: "Get partner by",
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["partners"],
        getBy: ["email"],
      },
    },
    placeholder: "partner@example.com",
  },
  {
    displayName: "Partner ID",
    name: "partnerId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["partners"],
        getBy: ["partnerId"],
      },
    },
  },
  {
    displayName: "Tenant ID",
    name: "tenantId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["get"],
        resource: ["partners"],
        getBy: ["tenantId"],
      },
    },
  },
];

export async function partnersGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const getBy = this.getNodeParameter("getBy", 0) as string;

  const qs: IDataObject = {};

  if (getBy === "email") {
    qs.email = this.getNodeParameter("email", 0) as string;
  } else if (getBy === "partnerId") {
    qs.partnerId = this.getNodeParameter("partnerId", 0) as string;
  } else if (getBy === "tenantId") {
    qs.tenantId = this.getNodeParameter("tenantId", 0) as string;
  }

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.PARTNERS_GET,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default partnersGetDescription;
