import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksBulkDelete = {
  operation: ["bulkDelete"],
  resource: ["links"],
};

export const linksBulkDeleteDescription: INodeProperties[] = [
  {
    displayName: "Link IDs",
    name: "linkIds",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForLinksBulkDelete,
    },
    description: 'Comma-separated list of link IDs to delete (max 100). Non-existing IDs will be ignored.',
    placeholder: "id1, id2, id3",
  },
];

export async function linksBulkDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const linkIds = this.getNodeParameter("linkIds", 0) as string;

  const ids = linkIds.split(",").map((id) => id.trim());

  if (ids.length > 100) {
    throw new Error("Maximum 100 link IDs allowed per request");
  }

  const response = await dubRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.LINKS_BULK_DELETE,
    qs: {
      linkIds: ids.join(","),
    },
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksBulkDeleteDescription;
