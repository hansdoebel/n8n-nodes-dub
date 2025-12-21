import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForCustomersGet = {
  operation: ["get"],
  resource: ["customers"],
};

export const customersGetDescription: INodeProperties[] = [
  {
    displayName: "Customer ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForCustomersGet,
    },
    description:
      "The customer unique identifier on Dub or their external ID (prefixed with ext_)",
    placeholder: "cust_123 or ext_customer_id",
  },
  {
    displayName: "Include Expanded Fields",
    name: "includeExpandedFields",
    type: "boolean",
    default: false,
    displayOptions: {
      show: showForCustomersGet,
    },
    description:
      "Whether to include expanded fields like link, partner, and discount information",
  },
];

export async function customersGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter("id", 0) as string;
  const includeExpandedFields = this.getNodeParameter(
    "includeExpandedFields",
    0,
  ) as boolean;

  const qs: IDataObject = {};

  if (includeExpandedFields) {
    qs.includeExpandedFields = includeExpandedFields;
  }

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.CUSTOMERS_GET(id),
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default customersGetDescription;
