import type { INodeProperties } from "n8n-workflow";
import { analyticsGet, analyticsGetDescription } from "./get";

export { analyticsGet };

export const analyticsDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["analytics"],
      },
    },
    options: [
      {
        name: "Get",
        value: "get",
        action: "Get analytics",
        description: "Retrieve analytics data",
      },
    ],
    default: "get",
  },
  ...analyticsGetDescription,
];
