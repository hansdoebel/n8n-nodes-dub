import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForCustomersUpdate = {
  operation: ["update"],
  resource: ["customers"],
};

export const customersUpdateDescription: INodeProperties[] = [
  {
    displayName: "Customer ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForCustomersUpdate,
    },
    description:
      "The customer unique identifier on Dub or their external ID (prefixed with ext_)",
    placeholder: "cust_123 or ext_customer_id",
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForCustomersUpdate,
    },
    options: [
      {
        displayName: "Avatar",
        name: "avatar",
        type: "string",
        default: "",
        description: "Avatar URL",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        description: "Customer country",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        default: "",
        description: "Customer email address",
        placeholder: "name@email.com",
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        default: "",
        description: "External system identifier",
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Customer name",
      },
    ],
  },
];

function buildCustomersUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = ["avatar", "country", "email", "externalId", "name"];

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

export async function customersUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter("id", 0) as string;
  const body = buildCustomersUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.CUSTOMERS_UPDATE(id),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default customersUpdateDescription;
