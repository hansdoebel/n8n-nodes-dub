import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForTagsUpdate = {
  operation: ["update"],
  resource: ["tags"],
};

export const tagsUpdateDescription: INodeProperties[] = [
  {
    displayName: "Tag ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForTagsUpdate,
    },
    description: "The ID of the tag to update",
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForTagsUpdate,
    },
    options: [
      {
        displayName: "Color",
        name: "color",
        type: "options",
        options: [
          {
            name: "Blue",
            value: "blue",
          },
          {
            name: "Brown",
            value: "brown",
          },
          {
            name: "Green",
            value: "green",
          },
          {
            name: "Pink",
            value: "pink",
          },
          {
            name: "Purple",
            value: "purple",
          },
          {
            name: "Red",
            value: "red",
          },
          {
            name: "Yellow",
            value: "yellow",
          },
        ],
        default: "blue",
        description: "Tag color",
      },
      {
        displayName: "Name",
        name: "name",
        type: "string",
        default: "",
        description: "Tag name (1-50 characters)",
      },
    ],
  },
];

function buildTagsUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = ["color", "name"];

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

export async function tagsUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter("id", 0) as string;
  const body = buildTagsUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.TAGS_UPDATE(id),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default tagsUpdateDescription;
