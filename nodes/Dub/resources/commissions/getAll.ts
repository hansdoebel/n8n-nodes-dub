import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForCommissionsGetAll = {
  operation: ["getAll"],
  resource: ["commissions"],
};

export const commissionsGetAllDescription: INodeProperties[] = [
  {
    displayName: "Return All",
    name: "returnAll",
    type: "boolean",
    default: true,
    displayOptions: {
      show: showForCommissionsGetAll,
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
        operation: ["getAll"],
        resource: ["commissions"],
        returnAll: [false],
      },
    },
    description: "Max number of results to return",
    typeOptions: {
      minValue: 1,
      maxValue: 100,
    },
  },
  {
    displayName: "Page",
    name: "page",
    type: "number",
    default: 1,
    displayOptions: {
      show: {
        operation: ["getAll"],
        resource: ["commissions"],
        returnAll: [false],
      },
    },
    description: "Page number for pagination",
    typeOptions: {
      minValue: 1,
    },
  },
  {
    displayName: "Additional Fields",
    name: "additionalFields",
    type: "collection",
    placeholder: "Add Field",
    default: {},
    displayOptions: {
      show: showForCommissionsGetAll,
    },
    options: [
      {
        displayName: "Custom End Date",
        name: "end",
        type: "dateTime",
        default: "",
        description: "Custom end date for filtering commissions",
      },
      {
        displayName: "Custom Start Date",
        name: "start",
        type: "dateTime",
        default: "",
        description: "Custom start date for filtering commissions",
      },
      {
        displayName: "Customer ID",
        name: "customerId",
        type: "string",
        default: "",
        description: "Filter by associated customer",
      },
      {
        displayName: "Group ID",
        name: "groupId",
        type: "string",
        default: "",
        description: "Filter by partner group",
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
        description: "Predefined time interval for filtering",
      },
      {
        displayName: "Invoice ID",
        name: "invoiceId",
        type: "string",
        default: "",
        description: "Filter by invoice",
      },
      {
        displayName: "Partner ID",
        name: "partnerId",
        type: "string",
        default: "",
        description: "Filter by partner",
      },
      {
        displayName: "Payout ID",
        name: "payoutId",
        type: "string",
        default: "",
        description: "Filter by payout association",
      },
      {
        displayName: "Sort By",
        name: "sortBy",
        type: "options",
        options: [
          {
            name: "Amount",
            value: "amount",
          },
          {
            name: "Created At",
            value: "createdAt",
          },
        ],
        default: "createdAt",
        description: "Field to sort by",
      },
      {
        displayName: "Sort Order",
        name: "sortOrder",
        type: "options",
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
        default: "desc",
        description: "Sort direction",
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Canceled",
            value: "canceled",
          },
          {
            name: "Duplicate",
            value: "duplicate",
          },
          {
            name: "Fraud",
            value: "fraud",
          },
          {
            name: "Paid",
            value: "paid",
          },
          {
            name: "Pending",
            value: "pending",
          },
          {
            name: "Processed",
            value: "processed",
          },
          {
            name: "Refunded",
            value: "refunded",
          },
        ],
        default: "pending",
        description: "Filter by commission status",
      },
      {
        displayName: "Tenant ID",
        name: "tenantId",
        type: "string",
        default: "",
        description: "Filter by partner unique database identifier",
      },
      {
        displayName: "Timezone",
        name: "timezone",
        type: "string",
        default: "",
        description: "Timezone for date filtering",
      },
      {
        displayName: "Type",
        name: "type",
        type: "options",
        options: [
          {
            name: "Click",
            value: "click",
          },
          {
            name: "Custom",
            value: "custom",
          },
          {
            name: "Lead",
            value: "lead",
          },
          {
            name: "Sale",
            value: "sale",
          },
        ],
        default: "click",
        description: "Filter by commission type",
      },
    ],
  },
];

function buildCommissionsQueryString(this: IExecuteFunctions): IDataObject {
  const qs: IDataObject = {};

  const returnAll = this.getNodeParameter("returnAll", 0) as boolean;

  if (!returnAll) {
    qs.pageSize = this.getNodeParameter("limit", 0) as number;
    qs.page = this.getNodeParameter("page", 0) as number;
  }

  const additionalFields = this.getNodeParameter(
    "additionalFields",
    0,
  ) as IDataObject;

  if (additionalFields) {
    const fields = [
      "customerId",
      "end",
      "groupId",
      "interval",
      "invoiceId",
      "partnerId",
      "payoutId",
      "sortBy",
      "sortOrder",
      "start",
      "status",
      "tenantId",
      "timezone",
      "type",
    ];

    for (const field of fields) {
      if (
        additionalFields[field] !== undefined && additionalFields[field] !== ""
      ) {
        qs[field] = additionalFields[field];
      }
    }
  }

  return qs;
}

export async function commissionsGetAll(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const qs = buildCommissionsQueryString.call(this);

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.COMMISSIONS_GET_ALL,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default commissionsGetAllDescription;
