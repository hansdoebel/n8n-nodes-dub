import type { INodeProperties } from "n8n-workflow";
import { linksCreate, linksCreateDescription } from "./create";
import { linksGet, linksGetDescription } from "./get";
import { linksGetAll, linksGetAllDescription } from "./getAll";
import { linksUpdate, linksUpdateDescription } from "./update";
import { linksDelete, linksDeleteDescription } from "./delete";
import { linksUpsert, linksUpsertDescription } from "./upsert";
import { linksBulkCreate, linksBulkCreateDescription } from "./bulkCreate";
import { linksBulkUpdate, linksBulkUpdateDescription } from "./bulkUpdate";
import { linksBulkDelete, linksBulkDeleteDescription } from "./bulkDelete";

export {
  linksBulkCreate,
  linksBulkDelete,
  linksBulkUpdate,
  linksCreate,
  linksDelete,
  linksGet,
  linksGetAll,
  linksUpdate,
  linksUpsert,
};

export const linksDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["links"],
      },
    },
    options: [
      {
        name: "Bulk Create",
        value: "bulkCreate",
        description: "Bulk create up to 100 short links",
        action: "Bulk create links",
      },
      {
        name: "Bulk Delete",
        value: "bulkDelete",
        description: "Bulk delete up to 100 short links",
        action: "Bulk delete links",
      },
      {
        name: "Bulk Update",
        value: "bulkUpdate",
        description: "Bulk update up to 100 short links with identical data",
        action: "Bulk update links",
      },
      {
        name: "Create",
        value: "create",
        description: "Create a new short link",
        action: "Create a link",
      },
      {
        name: "Create or Update",
        value: "upsert",
        action: "Upsert a link",
        description:
          "Create a new record, or update the current one if it already exists (upsert)",
      },
      {
        name: "Delete",
        value: "delete",
        action: "Delete a link",
        description: "Delete a short link",
      },
      {
        name: "Get",
        value: "get",
        action: "Get a link",
        description: "Get a specific short link",
      },
      {
        name: "Get Many",
        value: "getAll",
        action: "Get links",
        description: "Get many short links",
      },
      {
        name: "Update",
        value: "update",
        action: "Update a link",
        description: "Update an existing short link",
      },
    ],
    default: "create",
  },
  ...linksCreateDescription,
  ...linksGetDescription,
  ...linksGetAllDescription,
  ...linksUpdateDescription,
  ...linksDeleteDescription,
  ...linksUpsertDescription,
  ...linksBulkCreateDescription,
  ...linksBulkUpdateDescription,
  ...linksBulkDeleteDescription,
];
