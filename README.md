# n8n-nodes-dub

This is an n8n community node for integrating [Dub.co](https://dub.co/) link management into your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)   
[Operations](#operations)   
[Credentials](#credentials)   
[Resources](#resources)   
[Version history](#version-history)   

----

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Type `n8n-nodes-dub` into **npm Package Name**
4. Agree to the risks of using community nodes
5. Select **Install**

----

## Operations

### Links

- **Create** - Create a new short link
- **Get** - Retrieve a short link by ID, key+domain, or external ID
- **Update** - Update an existing short link
- **Delete** - Delete a short link
- **Upsert** - Create or update a short link
- **Bulk Create** - Create up to 100 short links in one request
- **Bulk Update** - Update up to 100 short links with identical data
- **Bulk Delete** - Delete up to 100 short links
- **Get Many** - List short links with pagination and filtering

----

## Credentials

To use this node, you need a Dub API token.

### Authentication

This node uses Bearer token authentication. You will need:

- **API Token** – Your Dub API access token from [dub.co/settings/tokens](https://dub.co/settings/tokens)

----

## Resources

- [Dub Homepage](https://dub.co/)
- [Dub API Documentation](https://dub.co/docs/api-reference/introduction)
- [n8n Community Nodes](https://docs.n8n.io/integrations/#community-nodes)

----

## Version history

- 0.0.2 – Added bulk operations and link management
- 0.0.1 – Initial release
