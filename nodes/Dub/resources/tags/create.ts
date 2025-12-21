import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForTagsCreate = {
  operation: ["create"],
  resource: ["tags"],
};

export const tagsCreateDescription: INodeProperties[] = [
  {
    displayName: "Name",
    name: "name",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForTagsCreate,
    },
    description: "Tag name (1-50 characters)",
    placeholder: "My Tag",
  },
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
    displayOptions: {
      show: showForTagsCreate,
    },
    description: "Tag color (if omitted, a random color is assigned)",
  },
];

function buildTagsCreateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.name = this.getNodeParameter("name", 0) as string;

  const color = this.getNodeParameter("color", 0) as string;
  if (color) {
    body.color = color;
  }

  return body;
}

export async function tagsCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildTagsCreateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.TAGS_CREATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default tagsCreateDescription;
