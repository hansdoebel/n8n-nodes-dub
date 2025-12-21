import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForFoldersCreate = {
  operation: ["create"],
  resource: ["folders"],
};

export const foldersCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForFoldersCreate,
    },
    description: "The name of the folder (max 190 characters)",
    placeholder: "My Folder",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForFoldersCreate,
    },
    options: [
      {
        displayName: "Description",
        name: "description",
        type: "string",
        default: "",
        description: "The description of the folder (max 500 characters)",
      },
      {
        displayName: "Access Level",
        name: "accessLevel",
        type: "options",
        options: [
          {
            name: "Read",
            value: "read",
          },
          {
            name: "Write",
            value: "write",
          },
        ],
        default: "read",
        description: "The access level of the folder within the workspace",
      },
    ],
  },
];

function buildFoldersCreateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.name = this.getNodeParameter("name", 0) as string;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = ["description", "accessLevel"];

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

export async function foldersCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildFoldersCreateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.FOLDERS_CREATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default foldersCreateDescription;
