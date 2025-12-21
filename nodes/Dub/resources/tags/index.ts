import type { INodeProperties } from "n8n-workflow";
import { tagsCreate, tagsCreateDescription } from "./create";
import { tagsGetAll, tagsGetAllDescription } from "./getAll";
import { tagsUpdate, tagsUpdateDescription } from "./update";

export { tagsCreate, tagsGetAll, tagsUpdate };

export const tagsDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["tags"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new tag",
        action: "Create a tag",
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get tags",
        description: "Get many tags",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a tag",
        description: "Update an existing tag",
      },
    ],
    default: "create",
  },
  ...tagsCreateDescription,
  ...tagsGetAllDescription,
  ...tagsUpdateDescription,
];
