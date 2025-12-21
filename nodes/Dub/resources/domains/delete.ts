import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForDomainsDelete = {
  operation: ["delete"],
  resource: ["domains"],
};

export const domainsDeleteDescription: INodeProperties[] = [
  {
    displayName: "Domain Slug",
    name: "slug",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForDomainsDelete,
    },
    description: "The domain slug to delete (this action is irreversible)",
    placeholder: "acme.com",
  },
];

export async function domainsDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const slug = this.getNodeParameter("slug", 0) as string;

  const response = await dubRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.DOMAINS_DELETE(slug),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default domainsDeleteDescription;
