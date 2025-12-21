import type { INodeProperties } from "n8n-workflow";
import { foldersCreate, foldersCreateDescription } from "./create";
import { foldersGet, foldersGetDescription } from "./get";
import { foldersUpdate, foldersUpdateDescription } from "./update";
import { foldersDelete, foldersDeleteDescription } from "./delete";

export { foldersCreate, foldersDelete, foldersGet, foldersUpdate };

export const foldersDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["folders"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new folder",
        action: "Create a folder",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a folder",
        description: "Delete a folder",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a folder",
        description: "Get a specific folder",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a folder",
        description: "Update an existing folder",
      },
    ],
    default: "create",
  },
  ...foldersCreateDescription,
  ...foldersGetDescription,
  ...foldersUpdateDescription,
  ...foldersDeleteDescription,
];
