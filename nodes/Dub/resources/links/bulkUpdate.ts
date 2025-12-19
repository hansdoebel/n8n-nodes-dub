import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksBulkUpdate = {
  operation: ["bulkUpdate"],
  resource: ["links"],
};

export const linksBulkUpdateDescription: INodeProperties[] = [
  {
    displayName: "Link Selection",
    name: "linkSelection",
    type: "options",
    required: true,
    default: "linkIds",
    displayOptions: {
      show: showForLinksBulkUpdate,
    },
    options: [
      {
        name: "By Link IDs",
        value: "linkIds",
        description: "Update links by their unique IDs",
      },
      {
        name: "By External IDs",
        value: "externalIds",
        description: "Update links by their external IDs from your database",
      },
    ],
  },
  {
    displayName: "Link IDs",
    name: "linkIds",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksBulkUpdate,
        linkSelection: ["linkIds"],
      },
    },
    description: "Comma-separated list of link IDs to update (max 100)",
    placeholder: "id1, id2, id3",
  },
  {
    displayName: "External IDs",
    name: "externalIds",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksBulkUpdate,
        linkSelection: ["externalIds"],
      },
    },
    description: "Comma-separated list of external IDs to update (max 100)",
    placeholder: "ext_id1, ext_id2, ext_id3",
  },
  {
    displayName: 'Update Fields',
    name: "updateData",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForLinksBulkUpdate,
    },
    options: [
      {
        displayName: "Android URL",
        name: "android",
        type: "string",
        default: "",
        description:
          "The Android destination URL for device targeting (max 32,000 characters)",
      },
      {
        displayName: "Archived",
        name: "archived",
        type: "boolean",
        default: false,
        description: "Whether the links are archived",
      },
      {
        displayName: "Comments",
        name: "comments",
        type: "string",
        default: "",
        description: "Comments for the links",
      },
      {
        displayName: "Description (OG)",
        name: "description",
        type: "string",
        default: "",
        description: "The custom link preview description (og:description)",
      },
      {
        displayName: "Destination URL",
        name: "url",
        type: "string",
        default: "",
        description:
          "The destination URL of the short links (max 32,000 characters)",
      },
      {
        displayName: "Do Index",
        name: "doIndex",
        type: "boolean",
        default: false,
        description:
          "Whether to allow search engines to index your short links",
      },
      {
        displayName: "Expired URL",
        name: "expiredUrl",
        type: "string",
        default: "",
        description:
          "The URL to redirect to when the short links have expired (max 32,000 characters)",
      },
      {
        displayName: "Expires At",
        name: "expiresAt",
        type: "dateTime",
        default: "",
        description:
          "The date and time when the short links expire (ISO-8601 format)",
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
        description:
          "The unique ID of existing folder to assign the short links to",
      },
      {
        displayName: "Geo Targeting",
        name: "geo",
        type: "string",
        default: "",
        description:
          "Geo targeting as JSON object mapping country codes to destination URLs",
      },
      {
        displayName: "Image (OG)",
        name: "image",
        type: "string",
        default: "",
        description: 'The custom link preview image (og:image). Can be Base64-encoded or URL.',
      },
      {
        displayName: "iOS URL",
        name: "ios",
        type: "string",
        default: "",
        description:
          "The iOS destination URL for device targeting (max 32,000 characters)",
      },
      {
        displayName: "Partner ID",
        name: "partnerId",
        type: "string",
        default: "",
        description: "Associate the links with a specific partner",
      },
      {
        displayName: "Password",
        name: "password",
        type: "string",
        default: "",
        description: "The password required to access the destination URLs",
        typeOptions: {
          password: true,
        },
      },
      {
        displayName: "Program ID",
        name: "programId",
        type: "string",
        default: "",
        description: "Associate the links with a specific program",
      },
      {
        displayName: "Proxy",
        name: "proxy",
        type: "boolean",
        default: false,
        description: "Whether the short links use Custom Link Previews feature",
      },
      {
        displayName: "Referral Tag",
        name: "ref",
        type: "string",
        default: "",
        description: "The referral tag of the short links",
      },
      {
        displayName: "Rewrite",
        name: "rewrite",
        type: "boolean",
        default: false,
        description: "Whether the short links use link cloaking",
      },
      {
        displayName: "Tag IDs",
        name: "tagIds",
        type: "string",
        default: "",
        description:
          "IDs of tags assigned to the short links (comma-separated)",
      },
      {
        displayName: "Tag Names",
        name: "tagNames",
        type: "string",
        default: "",
        description:
          "Tag names assigned to the short links, case-insensitive (comma-separated)",
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description:
          "The ID of the tenant that created the links (max 255 characters)",
      },
      {
        displayName: "Title (OG)",
        name: "title",
        type: "string",
        default: "",
        description: "The custom link preview title (og:title)",
      },
      {
        displayName: "Track Conversion",
        name: "trackConversion",
        type: "boolean",
        default: false,
        description: "Whether to track conversions for the short links",
      },
      {
        displayName: "UTM Campaign",
        name: "utm_campaign",
        type: "string",
        default: "",
        description: "UTM campaign parameter value",
      },
      {
        displayName: "UTM Content",
        name: "utm_content",
        type: "string",
        default: "",
        description: "UTM content parameter value",
      },
      {
        displayName: "UTM Medium",
        name: "utm_medium",
        type: "string",
        default: "",
        description: "UTM medium parameter value",
      },
      {
        displayName: "UTM Source",
        name: "utm_source",
        type: "string",
        default: "",
        description: "UTM source parameter value",
      },
      {
        displayName: "UTM Term",
        name: "utm_term",
        type: "string",
        default: "",
        description: "UTM term parameter value",
      },
      {
        displayName: "Video (OG)",
        name: "video",
        type: "string",
        default: "",
        description: "The custom link preview video (og:video)",
      },
    ],
  },
];

function buildLinksBulkUpdateBody(this: IExecuteFunctions): IDataObject {
  const linkSelection = this.getNodeParameter("linkSelection", 0) as string;
  const updateData = this.getNodeParameter("updateData", 0) as IDataObject;

  const body: IDataObject = {
    data: {},
  };

  if (linkSelection === "linkIds") {
    const linkIds = this.getNodeParameter("linkIds", 0) as string;
    body.linkIds = linkIds.split(",").map((id) => id.trim());
  } else {
    const externalIds = this.getNodeParameter("externalIds", 0) as string;
    body.externalIds = externalIds.split(",").map((id) => id.trim());
  }

  const data = body.data as IDataObject;
  const fields = [
    "url",
    "comments",
    "archived",
    "tenantId",
    "programId",
    "partnerId",
    "tagIds",
    "tagNames",
    "folderId",
    "expiresAt",
    "expiredUrl",
    "password",
    "proxy",
    "title",
    "description",
    "image",
    "video",
    "rewrite",
    "doIndex",
    "ios",
    "android",
    "geo",
    "trackConversion",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
  ];

  for (const field of fields) {
    if (updateData[field] !== undefined && updateData[field] !== "") {
      if (field === "tagIds" || field === "tagNames") {
        data[field] = (updateData[field] as string)
          .split(",")
          .map((tag) => tag.trim());
      } else if (field === "geo") {
        try {
          data[field] = JSON.parse(updateData[field] as string);
        } catch {
          data[field] = updateData[field];
        }
      } else {
        data[field] = updateData[field];
      }
    }
  }

  return body;
}

export async function linksBulkUpdate(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildLinksBulkUpdateBody.call(this);

  const response = await dubRequest.call(this, {
    method: "PATCH",
    url: API_ENDPOINTS.LINKS_BULK_UPDATE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksBulkUpdateDescription;
