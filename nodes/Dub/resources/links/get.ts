import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../../utils/constants";
import { dubRequest } from "../../utils/helpers";

const showForLinksGet = {
  operation: ["get"],
  resource: ["links"],
};

export const linksGetDescription: INodeProperties[] = [
  {
    displayName: "Get By",
    name: "getBy",
    type: "options",
    required: true,
    default: "key",
    displayOptions: {
      show: showForLinksGet,
    },
    options: [
      {
        name: "Key + Domain",
        value: "key",
        description: "Retrieve a link by its key/slug and domain",
      },
      {
        name: "Link ID",
        value: "linkId",
        description: "Retrieve a link by its unique ID",
      },
      {
        name: "External ID",
        value: "externalId",
        description: "Retrieve a link by its external ID",
      },
    ],
  },
  {
    displayName: "Key",
    name: "key",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksGet,
        getBy: ["key"],
      },
    },
    description:
      "The key of the link to retrieve (e.g., for d.to/github, the key is github)",
    placeholder: "github",
  },
  {
    displayName: "Domain",
    name: "domain",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksGet,
        getBy: ["key"],
      },
    },
    description:
      "The domain of the link (e.g., for d.to/github, the domain is d.to)",
    placeholder: "d.to",
  },
  {
    displayName: "Link ID",
    name: "linkId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksGet,
        getBy: ["linkId"],
      },
    },
    description: "The unique ID of the short link",
    placeholder: "clux0rgak00011...",
  },
  {
    displayName: "External ID",
    name: "externalId",
    type: "string",
    required: true,
    default: "",
    displayOptions: {
      show: {
        ...showForLinksGet,
        getBy: ["externalId"],
      },
    },
    description: "The ID of the link in your database",
    placeholder: "123456",
  },
];

export async function linksGet(
  this: IExecuteFunctions,
): Promise<INodeExecutionData[]> {
  const getBy = this.getNodeParameter("getBy", 0) as string;

  const qs: IDataObject = {};

  if (getBy === "key") {
    const key = this.getNodeParameter("key", 0) as string;
    const domain = this.getNodeParameter("domain", 0) as string;

    qs.key = key;
    qs.domain = domain;
  } else if (getBy === "linkId") {
    const linkId = this.getNodeParameter("linkId", 0) as string;
    qs.linkId = linkId;
  } else if (getBy === "externalId") {
    const externalId = this.getNodeParameter("externalId", 0) as string;
    qs.externalId = externalId;
  }

  const response = await dubRequest.call(this, {
    method: "GET",
    url: API_ENDPOINTS.LINKS_GET,
    qs,
  });

  return this.helpers.returnJsonArray(
    Array.isArray(response) ? response : [response],
  );
}

export default linksGetDescription;
