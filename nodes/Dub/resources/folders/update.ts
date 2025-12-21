import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForFoldersUpdate = {
  operation: ["update"],
  resource: ["folders"],
};

export const foldersUpdateDescription: INodeProperties[] = [
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForFoldersUpdate,
    },
    description: "The ID of the folder to update",
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForFoldersUpdate,
    },
    options: [
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "The name of the folder (max 190 characters)",
      },
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

function buildFoldersUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = ["name", "description", "accessLevel"];

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

export async function foldersUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const folderId = this.getNodeParameter("folderId", 0) as string;
  const body = buildFoldersUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.FOLDERS_UPDATE(folderId),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default foldersUpdateDescription;
