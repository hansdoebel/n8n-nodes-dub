import type { INodeProperties } from "n8n-workflow";
import { partnersCreate, partnersCreateDescription } from "./create";
import { partnersGet, partnersGetDescription } from "./get";
import { partnersGetAll, partnersGetAllDescription } from "./getAll";
import { partnersUpdate, partnersUpdateDescription } from "./update";

export { partnersCreate, partnersGet, partnersGetAll, partnersUpdate };

export const partnersDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["partners"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new partner",
        action: "Create a partner",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a partner",
        description: "Get a specific partner",
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get partners",
        description: "Get many partners",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a partner",
        description: "Update an existing partner",
      },
    ],
    default: "create",
  },
  ...partnersCreateDescription,
  ...partnersGetDescription,
  ...partnersGetAllDescription,
  ...partnersUpdateDescription,
];
