import type { INodeProperties } from "n8n-workflow";
import { commissionsGetAll, commissionsGetAllDescription } from "./getAll";
import { commissionsUpdate, commissionsUpdateDescription } from "./update";

export { commissionsGetAll, commissionsUpdate };

export const commissionsDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["commissions"],
      },
    },
    options: [
      {
        name: "Get Many",
        value: "getAll",
        action: "Get commissions",
        description: "Get many commissions",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a commission",
        description: "Update an existing commission",
      },
    ],
    default: "getAll",
  },
  ...commissionsGetAllDescription,
  ...commissionsUpdateDescription,
];
