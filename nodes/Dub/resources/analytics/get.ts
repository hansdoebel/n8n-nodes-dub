import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForAnalyticsGet = {
  operation: ["get"],
  resource: ["analytics"],
};

export const analyticsGetDescription: INodeProperties[] = [
  {
    displayName: "Event",
    name: "event",
    type: "options",
    options: [
      {
        name: "Clicks",
        value: "clicks",
      },
      {
        name: "Leads",
        value: "leads",
      },
      {
        name: "Sales",
        value: "sales",
      },
      {
        name: "Composite",
        value: "composite",
      },
    ],
    default: "clicks",
    displayOptions: {
      show: showForAnalyticsGet,
    },
    description: "Event type to retrieve analytics for",
  },
  {
    displayName: "Interval",
    name: "interval",
    type: "options",
    options: [
      {
        name: "1 Year",
        value: "1y",
      },
      {
        name: "24 Hours",
        value: "24h",
      },
      {
        name: "30 Days",
        value: "30d",
      },
      {
        name: "7 Days",
        value: "7d",
      },
      {
        name: "90 Days",
        value: "90d",
      },
      {
        name: "All Time",
        value: "all",
      },
      {
        name: "Month to Date",
        value: "mtd",
      },
      {
        name: "Quarter to Date",
        value: "qtd",
      },
      {
        name: "Year to Date",
        value: "ytd",
      },
    ],
    default: "30d",
    displayOptions: {
      show: showForAnalyticsGet,
    },
    description: "Time interval for analytics",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForAnalyticsGet,
    },
    options: [
      {
        displayName: "Browser",
        name: "browser",
        type: "string",
        default: "",
        description: "Filter by browser",
      },
      {
        displayName: "City",
        name: "city",
        type: "string",
        default: "",
        description: "Filter by city",
      },
      {
        displayName: "Continent",
        name: "continent",
        type: "string",
        default: "",
        description: "Filter by continent",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "",
        description: "Filter by country code",
      },
      {
        displayName: "Device",
        name: "device",
        type: "string",
        default: "",
        description: "Filter by device type (desktop, mobile, tablet)",
      },
      {
        displayName: "Domain",
        name: "domain",
        type: "string",
        default: "",
        description: "Filter by domain",
      },
      {
        displayName: "External ID",
        name: "externalId",
        type: "string",
        default: "",
        description: "Filter by external ID",
      },
      {
        displayName: "Folder ID",
        name: "folderId",
        type: "string",
        default: "",
        description: "Filter by folder ID",
      },
      {
        displayName: "Group By",
        name: "groupBy",
        type: "string",
        default: "count",
        description:
          "Aggregate by: count, timeseries, continents, regions, countries, cities, devices, browsers, OS, triggers, referers, referer_urls, top_folders, top_link_tags, top_domains, top_links, top_urls, top_base_urls, top_partners, top_groups, or UTM parameters",
      },
      {
        displayName: "Link ID",
        name: "linkId",
        type: "string",
        default: "",
        description: "Filter by link ID",
      },
      {
        displayName: "Operating System",
        name: "os",
        type: "string",
        default: "",
        description: "Filter by operating system",
      },
      {
        displayName: "Referer",
        name: "referer",
        type: "string",
        default: "",
        description: "Filter by referer",
      },
      {
        displayName: "Region",
        name: "region",
        type: "string",
        default: "",
        description: "Filter by region",
      },
      {
        displayName: "Tag IDs",
        name: "tagIds",
        type: "string",
        default: "",
        description: "Filter by tag IDs (comma-separated)",
      },
      {
        displayName: "Tag Names",
        name: "tagNames",
        type: "string",
        default: "",
        description: "Filter by tag names (comma-separated)",
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description: "Filter by tenant ID",
      },
      {
        displayName: "Trigger",
        name: "trigger",
        type: "string",
        default: "",
        description: "Filter by trigger type",
      },
      {
        displayName: "UTM Campaign",
        name: "utm_campaign",
        type: "string",
        default: "",
        description: "Filter by UTM campaign",
      },
      {
        displayName: "UTM Content",
        name: "utm_content",
        type: "string",
        default: "",
        description: "Filter by UTM content",
      },
      {
        displayName: "UTM Medium",
        name: "utm_medium",
        type: "string",
        default: "",
        description: "Filter by UTM medium",
      },
      {
        displayName: "UTM Source",
        name: "utm_source",
        type: "string",
        default: "",
        description: "Filter by UTM source",
      },
      {
        displayName: "UTM Term",
        name: "utm_term",
        type: "string",
        default: "",
        description: "Filter by UTM term",
      },
    ],
  },
];

function buildAnalyticsQueryString(this: IExecuteFunctions): IDataObject {
  const qs: IDataObject = {};

  qs.event = this.getNodeParameter("event", 0) as string;
  qs.interval = this.getNodeParameter("interval", 0) as string;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = [
      "browser",
      "city",
      "continent",
      "country",
      "device",
      "domain",
      "externalId",
      "folderId",
      "groupBy",
      "linkId",
      "os",
      "referer",
      "region",
      "tagIds",
      "tagNames",
      "tenantId",
      "trigger",
      "utm_campaign",
      "utm_content",
      "utm_medium",
      "utm_source",
      "utm_term",
    ];

    for (const field of fields) {
      if (
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        if (field === "tagIds" || field === "tagNames") {
          qs[field] = (additionalFields[field] as string)
            .split(",")
            .map((tag) => tag.trim());
        } else {
          qs[field] = additionalFields[field];
        }
      }
    }
  }

  return qs;
}

export async function analyticsGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const qs = buildAnalyticsQueryString.call(this);

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.ANALYTICS_GET,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default analyticsGetDescription;
