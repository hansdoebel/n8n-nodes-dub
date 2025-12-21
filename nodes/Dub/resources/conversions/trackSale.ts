import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForConversionsTrackSale = {
  operation: ["trackSale"],
  resource: ["conversions"],
};

export const conversionsTrackSaleDescription: INodeProperties[] = [
  {
    displayName: "Click ID",
    name: "clickId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackSale,
    },
    description:
      "The unique ID of the click that the sale conversion event is attributed to",
  },
  {
    displayName: "Event Name",
    name: "eventName",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackSale,
    },
    description: "The name identifying the sale event (1-255 characters)",
  },
  {
    displayName: "Customer External ID",
    name: "customerExternalId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForConversionsTrackSale,
    },
    description:
      "The unique ID of the customer in your system (1-100 characters)",
  },
  {
    displayName: "Amount",
    name: "amount",
    type: "number",
    required: true,
    default: 0,
    displayOptions: {
      show: showForConversionsTrackSale,
    },
    description: "Sale amount in cents",
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForConversionsTrackSale,
    },
    options: [
      {
        displayName: "Currency",
        name: "currency",
        type: "string",
        default: "",
        description: "Currency code (e.g., USD)",
      },
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

function buildConversionsTrackSaleBody(this: IExecuteFunctions): IDataObject {
  const body: IDataObject = {};

  body.clickId = this.getNodeParameter("clickId", 0) as string;
  body.eventName = this.getNodeParameter("eventName", 0) as string;
  body.customerExternalId = this.getNodeParameter(
    "customerExternalId",
    0,
  ) as string;
  body.amount = this.getNodeParameter("amount", 0) as number;

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = [
      "currency",
      "customerAvatar",
      "customerEmail",
      "customerName",
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

export async function conversionsTrackSale(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const body = buildConversionsTrackSaleBody.call(this);

  const response = await dubRequest.call(this, {
    method: "POST",
    url: API_ENDPOINTS.CONVERSIONS_TRACK_SALE,
    body,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default conversionsTrackSaleDescription;
