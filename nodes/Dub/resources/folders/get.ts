import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForFoldersGet = {
  operation: ["get"],
  resource: ["folders"],
};

export const foldersGetDescription: INodeProperties[] = [
  {
    displayName: "Folder ID",
    name: "folderId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: showForFoldersGet,
    },
    description: "The ID of the folder to retrieve",
  },
];

export async function foldersGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const folderId = this.getNodeParameter("folderId", 0) as string;

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.FOLDERS_GET(folderId),
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default foldersGetDescription;
