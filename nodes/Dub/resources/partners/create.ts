import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForPartnersCreate = {
  operation: ["create"],
  resource: ["partners"],
};

export const partnersCreateDescription: INodeProperties[] = [
  {
    displayName: "Email",
    name: "email",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForPartnersCreate,
    },
    description: "Partner email address",
    placeholder: "partner@example.com",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForPartnersCreate,
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
        description: "Partner full name (email used if omitted)",
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description: "Your system partner identifier",
      },
    ],
  },
];

function buildPartnersCreateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.email = this.getNodeParameter("email", 0) as string;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = ["country", "groupId", "name", "tenantId"];

    for (const field of fields) {
      if (
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        body[field] = additionalFields[field];
      }
    }
  }

  return body;
}

export async function partnersCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildPartnersCreateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.PARTNERS_CREATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default partnersCreateDescription;
