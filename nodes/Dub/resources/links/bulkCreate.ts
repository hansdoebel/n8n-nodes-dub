import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksBulkCreate = {
  operation: ["bulkCreate"],
  resource: ["links"],
};

export const linksBulkCreateDescription: INodeProperties[] = [
  {
    displayName: "Links",
    name: "links",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForLinksBulkCreate,
    },
    description:
      "JSON array of link objects to create (max 100 links per request). Each object requires a URL field.",
    typeOptions: {
      rows: 10,
    },
  },
];

function buildLinksBulkCreateBody(this: IExecuteFunctions): IDataObject[] {
  const linksInput = this.getNodeParameter("links", 0) as string;

  let links: IDataObject[] = [];

  try {
    const parsed = JSON.parse(linksInput);
    links = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    throw new Error("Invalid JSON format for links array");
  }

  if (!Array.isArray(links)) {
    throw new Error("Links must be an array");
  }

  if (links.length > 100) {
    throw new Error("Maximum 100 links allowed per request");
  }

  for (const link of links) {
    if (!link.url) {
      throw new Error("Each link object must have a url field");
    }

    if (link.tags && typeof link.tags === "string") {
      link.tags = link.tags.split(",").map((tag: string) => tag.trim());
    }

    if (link.tagIds && typeof link.tagIds === "string") {
      link.tagIds = link.tagIds.split(",").map((id: string) => id.trim());
    }

    if (link.tagNames && typeof link.tagNames === "string") {
      link.tagNames = link.tagNames.split(",").map((name: string) =>
        name.trim()
      );
    }

    if (link.geo && typeof link.geo === "string") {
      try {
        link.geo = JSON.parse(link.geo);
      } catch {
        // Invalid JSON for geo, keep as string
      }
    }
  }

  return links;
}

export async function linksBulkCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildLinksBulkCreateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.LINKS_BULK_CREATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksBulkCreateDescription;
