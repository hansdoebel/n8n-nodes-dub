import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForCustomersDelete = {
  operation: ["delete"],
  resource: ["customers"],
};

export const customersDeleteDescription: INodeProperties[] = [
  {
    displayName: "Customer ID",
    name: "id",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForCustomersDelete,
    },
    description:
      "The customer unique identifier on Dub or their external ID (prefixed with ext_)",
    placeholder: "cust_123 or ext_customer_id",
  },
];

export async function customersDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const id = this.getNodeParameter("id", 0) as string;

  const response = await dubRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.CUSTOMERS_DELETE(id),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default customersDeleteDescription;
