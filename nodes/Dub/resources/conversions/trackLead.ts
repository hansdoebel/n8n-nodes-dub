import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForConversionsTrackLead = {
  operation: ["trackLead"],
  resource: ["conversions"],
};

export const conversionsTrackLeadDescription: INodeProperties[] = [
  {
    displayName: "Click ID",
    name: "clickId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackLead,
    },
    description:
      "The unique ID of the click that the lead conversion event is attributed to",
  },
  {
    displayName: "Event Name",
    name: "eventName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackLead,
    },
    description: "The name identifying the lead event (1-255 characters)",
  },
  {
    displayName: "Customer External ID",
    name: "customerExternalId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackLead,
    },
    description:
      "The unique ID of the customer in your system (1-100 characters)",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForConversionsTrackLead,
    },
    options: [
      {
        displayName: "Customer Avatar",
        name: "customerAvatar",
        type: "string",
        default: "",
        description: "Avatar URL",
      },
      {
        displayName: "Customer Email",
        name: "customerEmail",
        type: "string",
        default: "",
        description: "Customer email address",
      },
      {
        displayName: "Customer Name",
        name: "customerName",
        type: "string",
        default: "",
        description: "Customer display name (max 100 characters)",
      },
      {
        displayName: "Event Quantity",
        name: "eventQuantity",
        type: "number",
        default: "",
        description: "Numerical value associated with the event",
      },
      {
        displayName: "Metadata",
        name: "metadata",
        type: "string",
        default: "",
        description: "Additional data as JSON string (max 10,000 characters)",
      },
      {
        displayName: "Mode",
        name: "mode",
        type: "options",
        options: [
          {
            name: "Async",
            value: "async",
          },
          {
            name: "Wait",
            value: "wait",
          },
          {
            name: "Deferred",
            value: "deferred",
          },
        ],
        default: "async",
        description: "Request processing mode",
      },
    ],
  },
];

function buildConversionsTrackLeadBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.clickId = this.getNodeParameter("clickId", 0) as string;
  body.eventName = this.getNodeParameter("eventName", 0) as string;
  body.customerExternalId = this.getNodeParameter(
    "customerExternalId",
    0,
  ) as string;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = [
      "customerAvatar",
      "customerEmail",
      "customerName",
      "eventQuantity",
      "metadata",
      "mode",
    ];

    for (const field of fields) {
      if (
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        if (field === "metadata") {
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

export async function conversionsTrackLead(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildConversionsTrackLeadBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.CONVERSIONS_TRACK_LEAD,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default conversionsTrackLeadDescription;
