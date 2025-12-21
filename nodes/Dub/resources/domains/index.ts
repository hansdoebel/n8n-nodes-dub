import type { INodeProperties } from "n8n-workflow";
import { domainsCreate, domainsCreateDescription } from "./create";
import { domainsGet, domainsGetDescription } from "./get";
import { domainsUpdate, domainsUpdateDescription } from "./update";
import { domainsDelete, domainsDeleteDescription } from "./delete";

export { domainsCreate, domainsDelete, domainsGet, domainsUpdate };

export const domainsDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["domains"],
      },
    },
    options: [
      {
        name: "Create",
        value: "create",
        description: "Create a new domain",
        action: "Create a domain",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a domain",
        description: "Delete a domain",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a domain",
        description: "Get a specific domain",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a domain",
        description: "Update an existing domain",
      },
    ],
    default: "create",
  },
  ...domainsCreateDescription,
  ...domainsGetDescription,
  ...domainsUpdateDescription,
  ...domainsDeleteDescription,
];
