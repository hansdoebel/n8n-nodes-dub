import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForPartnersUpdate = {
  operation: ["update"],
  resource: ["partners"],
};

export const partnersUpdateDescription: INodeProperties[] = [
  {
    displayName: "Update By",
    name: "updateBy",
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
      show: showForPartnersUpdate,
    },
    description: "Identify partner to update by",
  },
  {
    displayName: "Email",
    name: "email",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        operation: ["update"],
        resource: ["partners"],
        updateBy: ["email"],
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
        operation: ["update"],
        resource: ["partners"],
        updateBy: ["partnerId"],
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
        operation: ["update"],
        resource: ["partners"],
        updateBy: ["tenantId"],
      },
    },
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForPartnersUpdate,
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        description: "2-letter ISO country code",
        placeholder: "US",
      },
      {
        displayName: "Group ID",
        name: "groupId",
        type: "string",
        default: "",
        description: "Assign to partner groups",
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Partner full name",
      },
    ],
  },
];

function buildPartnersUpdateBody(
  this: IExecuteFunctions,
  updateBy: string,
): IDataObject {
  const body: IDataObject = {};

  if (updateBy === "email") {
    body.email = this.getNodeParameter("email", 0) as string;
  } else if (updateBy === "partnerId") {
    body.partnerId = this.getNodeParameter("partnerId", 0) as string;
  } else if (updateBy === "tenantId") {
    body.tenantId = this.getNodeParameter("tenantId", 0) as string;
  }

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = ["country", "groupId", "name"];

    for (const field of fields) {
      if (
        updateFields[field] !== undefined && updateFields[field] !== ""
      ) {
        body[field] = updateFields[field];
      }
    }
  }

  return body;
}

export async function partnersUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const updateBy = this.getNodeParameter("updateBy", 0) as string;
  const body = buildPartnersUpdateBody.call(this, updateBy);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.PARTNERS_UPDATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default partnersUpdateDescription;
