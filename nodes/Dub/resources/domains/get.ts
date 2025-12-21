import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForDomainsGet = {
  operation: ["get"],
  resource: ["domains"],
};

export const domainsGetDescription: INodeProperties[] = [
  {
    displayName: "Domain Slug",
    name: "slug",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForDomainsGet,
    },
    description: "The domain slug to retrieve",
    placeholder: "acme.com",
  },
];

export async function domainsGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const slug = this.getNodeParameter("slug", 0) as string;

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.DOMAINS_GET(slug),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default domainsGetDescription;
