import type { INodeProperties } from "n8n-workflow";
import { customersGet, customersGetDescription } from "./get";
import { customersGetAll, customersGetAllDescription } from "./getAll";
import { customersUpdate, customersUpdateDescription } from "./update";
import { customersDelete, customersDeleteDescription } from "./delete";

export { customersDelete, customersGet, customersGetAll, customersUpdate };

export const customersDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["customers"],
      },
    },
    options: [
      {
        name: "Delete",
        value: "delete",
        action: "Delete a customer",
        description: "Delete a customer",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a customer",
        description: "Get a specific customer",
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get customers",
        description: "Get many customers",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a customer",
        description: "Update an existing customer",
      },
    ],
    default: "get",
  },
  ...customersDeleteDescription,
  ...customersGetDescription,
  ...customersGetAllDescription,
  ...customersUpdateDescription,
];
