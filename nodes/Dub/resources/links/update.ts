import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksUpdate = {
  operation: ["update"],
  resource: ["links"],
};

export const linksUpdateDescription: INodeProperties[] = [
  {
    displayName: "Link ID",
    name: "linkId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForLinksUpdate,
    },
    description: 'The unique ID of the short link to update',
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForLinksUpdate,
    },
    options: [
      {
        displayName: "Android URL",
        name: "android",
        type: "string",
        default: "",
        description: 'The Android destination URL for device targeting (max 32,000 characters)',
      },
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false,
        description: 'Whether the short link is archived',
      },
      {
        displayName: "Comments",
        name: "comments",
        type: "string",
        default: "",
        description: 'Comments for the short link',
      },
      {
        displayName: "Custom Slug",
        name: "key",
        type: "string",
        default: "",
        description: 'The short link slug (max 190 characters)',
        placeholder: "my-link",
      },
      {
        displayName: "Description (OG)",
        name: "description",
        type: "string",
        default: "",
        description: 'The custom link preview description (og:description)',
      },
      {
        displayName: "Destination URL",
        name: "url",
        type: "string",
        default: "",
        description: 'The destination URL of the short link (max 32,000 characters)',
        placeholder: "https://example.com",
      },
      {
        displayName: "Do Index",
        name: "doIndex",
        type: "boolean",
        default: false,
        description: 'Whether to allow search engines to index your short link',
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        description: 'The domain of the short link without protocol (max 190 characters)',
        placeholder: "dub.sh",
      },
      {
        displayName: "Expired URL",
        name: "expiredUrl",
        type: "string",
        default: "",
        description: 'The URL to redirect to when the short link has expired (max 32,000 characters)',
      },
      {
        displayName: "Expires At",
        name: "expiresAt",
        type: "dateTime",
        default: "",
        description: 'The date and time when the short link expires (ISO-8601 format)',
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        default: "",
        description: 'The ID of the link in your database (1-255 characters)',
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
        description: 'The unique ID of existing folder to assign the short link to',
      },
      {
        displayName: "Geo Targeting",
        name: "geo",
        type: "string",
        default: "",
        description: 'Geo targeting as JSON object mapping country codes to destination URLs',
      },
      {
        displayName: "Image (OG)",
        name: "image",
        type: "string",
        default: "",
        description:
          "The custom link preview image (og:image). Can be Base64-encoded or URL.",
      },
      {
        displayName: "iOS URL",
        name: "ios",
        type: "string",
        default: "",
        description: 'The iOS destination URL for device targeting (max 32,000 characters)',
      },
      {
        displayName: "Partner ID",
        name: "partnerId",
        type: "string",
        default: "",
        description: 'The ID of the partner the short link is associated with',
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        default: "",
        description: 'The password required to access the destination URL',
        typeOptions: {
          password: true,
        },
      },
      {
        displayName: "Program ID",
        name: "programId",
        type: "string",
        default: "",
        description: 'The ID of the program the short link is associated with',
      },
      {
        displayName: "Proxy",
        name: "proxy",
        type: "boolean",
        default: false,
        description: 'Whether the short link uses Custom Link Previews feature',
      },
      {
        displayName: "Referral Tag",
        name: "ref",
        type: "string",
        default: "",
        description: 'The referral tag of the short link',
      },
      {
        displayName: "Rewrite",
        name: "rewrite",
        type: "boolean",
        default: false,
        description: 'Whether the short link uses link cloaking',
      },
      {
        displayName: "Tag IDs",
        name: "tagIds",
        type: "string",
        default: "",
        description: 'IDs of tags assigned to the short link (comma-separated)',
      },
      {
        displayName: "Tag Names",
        name: "tagNames",
        type: "string",
        default: "",
        description: 'Tag names assigned to the short link, case-insensitive (comma-separated)',
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description: 'The ID of the tenant that created the link (max 255 characters)',
      },
      {
        displayName: "Title (OG)",
        name: "title",
        type: "string",
        default: "",
        description: 'The custom link preview title (og:title)',
      },
      {
        displayName: "Track Conversion",
        name: "trackConversion",
        type: "boolean",
        default: false,
        description: 'Whether to track conversions for the short link',
      },
      {
        displayName: "UTM Campaign",
        name: "utm_campaign",
        type: "string",
        default: "",
        description: 'UTM campaign parameter value',
      },
      {
        displayName: "UTM Content",
        name: "utm_content",
        type: "string",
        default: "",
        description: 'UTM content parameter value',
      },
      {
        displayName: "UTM Medium",
        name: "utm_medium",
        type: "string",
        default: "",
        description: 'UTM medium parameter value',
      },
      {
        displayName: "UTM Source",
        name: "utm_source",
        type: "string",
        default: "",
        description: 'UTM source parameter value',
      },
      {
        displayName: "UTM Term",
        name: "utm_term",
        type: "string",
        default: "",
        description: 'UTM term parameter value',
      },
      {
        displayName: "Video (OG)",
        name: "video",
        type: "string",
        default: "",
        description: 'The custom link preview video (og:video)',
      },
    ],
  },
];

function buildLinksUpdateBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = [
      "url",
      "domain",
      "key",
      "externalId",
      "tenantId",
      "programId",
      "partnerId",
      "trackConversion",
      "archived",
      "tagIds",
      "tagNames",
      "folderId",
      "comments",
      "expiresAt",
      "expiredUrl",
      "password",
      "proxy",
      "title",
      "description",
      "image",
      "video",
      "rewrite",
      "ios",
      "android",
      "geo",
      "doIndex",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ref",
    ];

    for (const field of fields) {
      if (
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        if (field === "tagIds" || field === "tagNames") {
          body[field] = (additionalFields[field] as string)
            .split(",")
            .map((tag) => tag.trim());
        } else if (field === "geo") {
          try {
            body[field] = JSON.parse(additionalFields[field] as string);
          } catch {
            body[field] = additionalFields[field];
          }
        } else {
          body[field] = additionalFields[field];
        }
      }
    }
  }

  return body;
}

export async function linksUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const linkId = this.getNodeParameter("linkId", 0) as string;
  const body = buildLinksUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.LINKS_UPDATE(linkId),
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksUpdateDescription;
