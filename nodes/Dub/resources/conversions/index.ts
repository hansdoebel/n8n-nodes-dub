import type { INodeProperties } from "n8n-workflow";
import {
  conversionsTrackLead,
  conversionsTrackLeadDescription,
} from "./trackLead";
import {
  conversionsTrackSale,
  conversionsTrackSaleDescription,
} from "./trackSale";

export { conversionsTrackLead, conversionsTrackSale };

export const conversionsDescription: INodeProperties[] = [
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["conversions"],
      },
    },
    options: [
      {
        name: "Track Lead",
        value: "trackLead",
        description: "Track a lead conversion event",
        action: "Track a lead",
      },
      {
        name: "Track Sale",
        value: "trackSale",
        description: "Track a sale conversion event",
        action: "Track a sale",
      },
    ],
    default: "trackLead",
  },
  ...conversionsTrackLeadDescription,
  ...conversionsTrackSaleDescription,
];
