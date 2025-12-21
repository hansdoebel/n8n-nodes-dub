import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForFoldersDelete = {
  operation: ["delete"],
  resource: ["folders"],
};

export const foldersDeleteDescription: INodeProperties[] = [
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForFoldersDelete,
    },
    description: "The ID of the folder to delete",
  },
];

export async function foldersDelete(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const folderId = this.getNodeParameter("folderId", 0) as string;

  const response = await dubRequest.call(this, {
    method: "DELETE",
    url: API_ENDPOINTS.FOLDERS_DELETE(folderId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default foldersDeleteDescription;
