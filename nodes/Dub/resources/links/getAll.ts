import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksGetAll = {
  operation: ["getAll"],
  resource: ["links"],
};

export const linksGetAllDescription: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: false,
    displayOptions: {
      show: showForLinksGetAll,
    },
    description: "Whether to return all results or only up to a given limit",
  },
  {
    displayName: "Limit",
    name: "limit",
    type: "number",
    default: 50,
    displayOptions: {
      show: {
        ...showForLinksGetAll,
        returnAll: [false],
      },
    },
    description: 'Max number of results to return',
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForLinksGetAll,
    },
    options: [
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        description: "Filter links by domain (e.g., ac.me)",
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
        description: "Filter links by folder ID",
      },
      {
        displayName: "Page",
        name: "page",
        type: "number",
        default: 1,
        description: "The page number for pagination (must be > 0)",
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: "Search Query",
        name: "search",
        type: "string",
        default: "",
        description:
          "Search query that matches against short link slug and destination URL",
      },
      {
        displayName: "Show Archived",
        name: "showArchived",
        type: "boolean",
        default: false,
        description: "Whether to include archived links in the response",
      },
      {
        displayName: "Sort By",
        name: "sortBy",
        type: "options",
        default: "createdAt",
        options: [
          {
            name: "Created At",
            value: "createdAt",
          },
          {
            name: "Clicks",
            value: "clicks",
          },
          {
            name: "Sale Amount",
            value: "saleAmount",
          },
          {
            name: "Last Clicked",
            value: "lastClicked",
          },
        ],
      },
      {
        displayName: "Sort Order",
        name: "sortOrder",
        type: "options",
        default: "desc",
        options: [
          {
            name: "Ascending",
            value: "asc",
          },
          {
            name: "Descending",
            value: "desc",
          },
        ],
      },
      {
        displayName: "Tag IDs",
        name: "tagIds",
        type: "string",
        default: "",
        description: "Filter links by tag IDs (comma-separated)",
      },
      {
        displayName: "Tag Names",
        name: "tagNames",
        type: "string",
        default: "",
        description:
          "Filter links by tag names, case-insensitive (comma-separated)",
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description: "Filter links by tenant ID within your system",
      },
      {
        displayName: "User ID",
        name: "userId",
        type: "string",
        default: "",
        description: "Filter links by user ID",
      },
    ],
  },
];

export async function linksGetAll(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const returnAll = this.getNodeParameter("returnAll", 0) as boolean;
  const limit = this.getNodeParameter("limit", 0) as number;
  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  const page = (additionalFields?.page as number) || 1;

  if (returnAll) {
    let allResults: IDataObject[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore) {
      const qs: IDataObject = {
        page: currentPage,
        pageSize: 100,
      };

      if (additionalFields) {
        if (additionalFields.domain) qs.domain = additionalFields.domain;
        if (additionalFields.tagIds) {
          qs.tagIds = (additionalFields.tagIds as string)
            .split(",")
            .map((id) => id.trim());
        }
        if (additionalFields.tagNames) {
          qs.tagNames = (additionalFields.tagNames as string)
            .split(",")
            .map((name) => name.trim());
        }
        if (additionalFields.folderId) qs.folderId = additionalFields.folderId;
        if (additionalFields.search) qs.search = additionalFields.search;
        if (additionalFields.userId) qs.userId = additionalFields.userId;
        if (additionalFields.tenantId) qs.tenantId = additionalFields.tenantId;
        if (additionalFields.showArchived) {
          qs.showArchived = additionalFields.showArchived;
        }
        if (additionalFields.sortBy) qs.sortBy = additionalFields.sortBy;
        if (additionalFields.sortOrder) {
          qs.sortOrder = additionalFields.sortOrder;
        }
      }

      const response = await dubRequest.call(this, {
        method: "GET",
        url: API_ENDPOINTS.LINKS_GET_ALL,
        qs,
      });

      const results = Array.isArray(response) ? response : [response];
      allResults = allResults.concat(results);

      if (results.length < 100) {
        hasMore = false;
      } else {
        currentPage++;
      }
    }

    return this.helpers.returnJsonArray(allResults);
  }

  const qs: IDataObject = {
    page,
    pageSize: limit,
  };

  if (additionalFields) {
    if (additionalFields.domain) qs.domain = additionalFields.domain;
    if (additionalFields.tagIds) {
      qs.tagIds = (additionalFields.tagIds as string)
        .split(",")
        .map((id) => id.trim());
    }
    if (additionalFields.tagNames) {
      qs.tagNames = (additionalFields.tagNames as string)
        .split(",")
        .map((name) => name.trim());
    }
    if (additionalFields.folderId) qs.folderId = additionalFields.folderId;
    if (additionalFields.search) qs.search = additionalFields.search;
    if (additionalFields.userId) qs.userId = additionalFields.userId;
    if (additionalFields.tenantId) qs.tenantId = additionalFields.tenantId;
    if (additionalFields.showArchived) {
      qs.showArchived = additionalFields.showArchived;
    }
    if (additionalFields.sortBy) qs.sortBy = additionalFields.sortBy;
    if (additionalFields.sortOrder) qs.sortOrder = additionalFields.sortOrder;
  }

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.LINKS_GET_ALL,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksGetAllDescription;
