import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForDomainsUpdate = {
  operation: ["update"],
  resource: ["domains"],
};

export const domainsUpdateDescription: INodeProperties[] = [
  {
    displayName: "Domain Slug",
    name: "slug",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForDomainsUpdate,
    },
    description: "The domain slug to update",
    placeholder: "acme.com",
  },
  {
    displayName: "Update Fields",
    name: "updateFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForDomainsUpdate,
    },
    options: [
      {
        displayName: "Apple App Site Association",
        name: "appleAppSiteAssociation",
        type: "string",
        default: "",
        description: "IOS deep linking configuration",
      },
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false,
        description: "Whether the domain is archived",
      },
      {
        displayName: "Asset Links",
        name: "assetLinks",
        type: "string",
        default: "",
        description: "Android deep linking configuration",
      },
      {
        displayName: "Expired URL",
        name: "expiredUrl",
        type: "string",
        default: "",
        description: "Redirect URL when links expire (max 32,000 characters)",
      },
      {
        displayName: "Logo",
        name: "logo",
        type: "string",
        default: "",
        description: "Domain logo URL",
      },
      {
        displayName: "Not Found URL",
        name: "notFoundUrl",
        type: "string",
        default: "",
        description:
          "Redirect URL for non-existent links (max 32,000 characters)",
      },
      {
        displayName: "Placeholder",
        name: "placeholder",
        type: "string",
        default: "",
        description: "Example URL for teammates (max 100 characters)",
        placeholder: "https://example.com",
      },
    ],
  },
];

function buildDomainsUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const updateFields = this.getNodeParameter(
    "updateFields",
    0,
  ) as IDataObject;

  if (updateFields) {
    const fields = [
      "archived",
      "appleAppSiteAssociation",
      "assetLinks",
      "expiredUrl",
      "logo",
      "notFoundUrl",
      "placeholder",
    ];

    for (const field of fields) {
      if (
        updateFields[field] !== undefined && updateFields[field] !== ""
      ) {
        body[field] = updateFields[field];
      }
    }
  }

  return body;
}

export async function domainsUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const slug = this.getNodeParameter("slug", 0) as string;
  const body = buildDomainsUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.DOMAINS_UPDATE(slug),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default domainsUpdateDescription;
