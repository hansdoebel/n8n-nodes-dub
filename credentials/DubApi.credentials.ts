import type {
  IAuthenticateGeneric,
  Icon,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

import { API_ENDPOINTS } from "../nodes/Dub/utils/constants";

export class DubApi implements ICredentialType {
  name = "dubApi";

  displayName = "Dub API";

  documentationUrl = "https://dub.co/docs/api-reference/tokens";

  icon: Icon = {
    light: "file:../icons/dub.svg",
    dark: "file:../icons/dub.dark.svg",
  };

  properties: INodeProperties[] = [
    {
      displayName: "Access Token",
      name: "accessToken",
      type: "string",
      typeOptions: { password: true },
      required: true,
      default: "",
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        Authorization: "=Bearer {{$credentials.accessToken}}",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: API_ENDPOINTS.BASE_URL,
      url: API_ENDPOINTS.LINKS_GET_ALL,
    },
  };
}
