import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForCommissionsUpdate = {
  operation: ["update"],
  resource: ["commissions"],
};

export const commissionsUpdateDescription: INodeProperties[] = [
  {
    displayName: "Commission ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForCommissionsUpdate,
    },
    description: "The ID of the commission to update",
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForCommissionsUpdate,
    },
    options: [
      {
        displayName: "Amount",
        name: "amount",
        type: "number",
        default: "",
        description:
          "Commission amount (useful for handling refunds or adjustments)",
      },
    ],
  },
];

function buildCommissionsUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = ["amount"];

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

export async function commissionsUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter("id", 0) as string;
  const body = buildCommissionsUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.COMMISSIONS_UPDATE(id),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default commissionsUpdateDescription;
