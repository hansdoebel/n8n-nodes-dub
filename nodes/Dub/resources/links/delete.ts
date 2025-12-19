import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksDelete = {
  operation: ["delete"],
  resource: ["links"],
};

export const linksDeleteDescription: INodeProperties[] = [
  {
    displayName: "Link ID",
    name: "linkId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForLinksDelete,
    },
    description: "The ID of the link to delete",
  },
];

export async function linksDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const linkId = this.getNodeParameter("linkId", 0) as string;

  const response = await dubRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.LINKS_DELETE(linkId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksDeleteDescription;
