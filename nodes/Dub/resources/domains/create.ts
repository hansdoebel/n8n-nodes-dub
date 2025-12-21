import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForDomainsCreate = {
  operation: ["create"],
  resource: ["domains"],
};

export const domainsCreateDescription: INodeProperties[] = [
  {
    displayName: "Domain Slug",
    name: "slug",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForDomainsCreate,
    },
    description: "Domain name (1-190 characters)",
    placeholder: "acme.com",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForDomainsCreate,
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

function buildDomainsCreateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.slug = this.getNodeParameter("slug", 0) as string;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
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
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        body[field] = additionalFields[field];
      }
    }
  }

  return body;
}

export async function domainsCreate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildDomainsCreateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.DOMAINS_CREATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default domainsCreateDescription;
