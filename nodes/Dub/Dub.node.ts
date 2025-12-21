import {
  type IExecuteFunctions,
  type INodeExecutionData,
  type INodeType,
  type INodeTypeDescription,
  NodeConnectionTypes,
  NodeOperationError,
} from "n8n-workflow";
import { API_ENDPOINTS } from "./utils/constants";
import {
  linksBulkCreate,
  linksBulkDelete,
  linksBulkUpdate,
  linksCreate,
  linksDelete,
  linksDescription,
  linksGet,
  linksGetAll,
  linksUpdate,
  linksUpsert,
} from "./resources/links";
import {
  foldersCreate,
  foldersDelete,
  foldersDescription,
  foldersGet,
  foldersUpdate,
} from "./resources/folders";
import {
  domainsCreate,
  domainsDelete,
  domainsDescription,
  domainsGet,
  domainsUpdate,
} from "./resources/domains";
import {
  partnersCreate,
  partnersDescription,
  partnersGet,
  partnersGetAll,
  partnersUpdate,
} from "./resources/partners";

export class Dub implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Dub",
    name: "dub",
    icon: {
      light: "file:../../icons/dub.svg",
      dark: "file:../../icons/dub.dark.svg",
    },
    group: ["transform"],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Interact with the Dub API",
    defaults: {
      name: "Dub",
    },
    usableAsTool: true,
    inputs: [NodeConnectionTypes.Main],
    outputs: [NodeConnectionTypes.Main],
    credentials: [{ name: "dubApi", required: true }],
    requestDefaults: {
      baseURL: API_ENDPOINTS.BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    },
    properties: [
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Domain",
            value: "domains",
          },
          {
            name: "Folder",
            value: "folders",
          },
          {
            name: "Link",
            value: "links",
          },
          {
            name: "Partner",
            value: "partners",
          },
        ],
        default: "links",
      },
      ...domainsDescription,
      ...foldersDescription,
      ...linksDescription,
      ...partnersDescription,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const resource = this.getNodeParameter("resource", 0) as string;
    const operation = this.getNodeParameter("operation", 0) as string;

    await this.getCredentials("dubApi");

    const handlers: Record<
      string,
      Record<string, (this: IExecuteFunctions) => Promise<INodeExecutionData[]>>
    > = {
      domains: {
        create: domainsCreate,
        get: domainsGet,
        update: domainsUpdate,
        delete: domainsDelete,
      },
      folders: {
        create: foldersCreate,
        get: foldersGet,
        update: foldersUpdate,
        delete: foldersDelete,
      },
      links: {
        create: linksCreate,
        get: linksGet,
        getAll: linksGetAll,
        update: linksUpdate,
        delete: linksDelete,
        upsert: linksUpsert,
        bulkCreate: linksBulkCreate,
        bulkUpdate: linksBulkUpdate,
        bulkDelete: linksBulkDelete,
      },
      partners: {
        create: partnersCreate,
        get: partnersGet,
        getAll: partnersGetAll,
        update: partnersUpdate,
      },
    };

    try {
      const handler = handlers[resource]?.[operation];
      if (!handler) {
        throw new NodeOperationError(
          this.getNode(),
          `Unsupported operation "${operation}" for resource "${resource}"`,
        );
      }

      const res = await handler.call(this);
      return [res];
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new NodeOperationError(this.getNode(), error.message);
      }
      throw new NodeOperationError(this.getNode(), `${error}`);
    }
  }
}
