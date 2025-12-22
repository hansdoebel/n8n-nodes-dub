# n8n-nodes-dub

> [!NOTE]
> **Disclaimer:** Unofficial community node. Not affiliated with, endorsed by, or supported by Dub.co or n8n. Trademarks belong to their respective owners. Use at your own risk; no warranty is provided. For support, please use this repository’s [Issues](https://github.com/hansdoebel/n8n-nodes-dub/issues).

This is an n8n community node for integrating [Dub.co](https://dub.co/) link management into your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)   
[Operations](#operations)   
[Credentials](#credentials)   
[Resources](#resources)   
[Version history](#version-history)   

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Type `n8n-nodes-dub` into **npm Package Name**
4. Agree to the risks of using community nodes
5. Select **Install**

## Operations

<details>
<summary><b>Analytics</b></summary>

### Get

Retrieve analytics for a link, domain, or the authenticated workspace with advanced filtering and grouping options.

**Parameters:**
- Event: clicks (default), leads, sales, or composite
- Interval: 24h, 7d, 30d (default), 90d, 1y, mtd, qtd, ytd, all
- Filters: device, browser, OS, location, referer, UTM parameters, and more
- Grouping: count, timeseries, continents, regions, countries, cities, devices, browsers, top links, and more

**Requires:** Pro plan or higher

</details>

<details>
<summary><b>Commissions</b></summary>

### Get Many

Retrieve a list of commissions for a program with filtering and pagination.

**Filters:**
- Commission type: click, lead, sale, custom
- Status: pending, processed, paid, refunded, duplicate, fraud, canceled
- Partner: partnerId, tenantId, groupId
- Customer and invoice references

**Sorting:** By createdAt or amount (ascending/descending)

**Requires:** Business plan or higher

### Update

Update an existing commission amount. Useful for handling refunds or fraudulent transactions.

**Parameters:**
- Commission ID (required)
- Amount (optional)

**Requires:** Business plan or higher

</details>

<details>
<summary><b>Conversions</b></summary>

### Track Lead

Record a lead conversion for a short link with automatic deduplication based on customerExternalId and eventName.

**Parameters:**
- Click ID (required)
- Event Name (required)
- Customer External ID (required)
- Mode: async (default), wait, or deferred
- Additional: customer details, event quantity, metadata

**Requires:** Business plan or higher

### Track Sale

Record a sale conversion for a short link with automatic deduplication.

**Parameters:**
- Click ID (required)
- Event Name (required)
- Customer External ID (required)
- Amount in cents (required)
- Mode: async (default), wait, or deferred
- Additional: currency, customer details, metadata

**Requires:** Business plan or higher

</details>

<details>
<summary><b>Customers</b></summary>

### Get

Retrieve a specific customer by ID or external ID (prefixed with ext_).

**Parameters:**
- Customer ID (required)
- Include expanded fields (optional) - includes link, partner, and discount information

### Get Many

Retrieve a paginated list of all customers for the authenticated workspace.

**Pagination:**
- Return all or limit to specific count (default: 50, max: 100)
- Page number for navigation

### Update

Update customer information including name, email, avatar, country, and external ID.

**Parameters:**
- Customer ID (required)
- Update fields: name, email, avatar, country, externalId

### Delete

Delete a customer from the workspace.

**Parameters:**
- Customer ID (required)

</details>

<details>
<summary><b>Domains</b></summary>

### Create

Create a custom domain for the authenticated workspace.

**Parameters:**
- Domain slug (required) - e.g., example.com
- Color (optional)
- Placeholder URL (optional)
- Expired URL (optional)
- Not found URL (optional)
- Logo URL (optional)
- Deep linking configs (optional) - Apple App Site Association, Asset Links

### Get

Retrieve a specific domain by its slug.

**Parameters:**
- Domain slug (required)

### Update

Update domain settings and configurations.

**Update fields:** archived, color, logo, placeholder, expired URL, not found URL, deep linking configs

### Delete

Delete a domain from the workspace. This action is irreversible.

**Parameters:**
- Domain slug (required)

</details>

<details>
<summary><b>Folders</b></summary>

### Create

Create a folder for organizing links.

**Parameters:**
- Name (required) - max 190 characters
- Description (optional) - max 500 characters
- Access level (optional) - read or write

### Get

Retrieve a specific folder by its ID.

**Parameters:**
- Folder ID (required)

### Update

Update folder properties.

**Update fields:** name, description, access level

### Delete

Delete a folder from the workspace.

**Parameters:**
- Folder ID (required)

</details>

<details>
<summary><b>Links</b></summary>

### Create

Create a new short link with destination URL and optional customizations.

**Parameters:**
- Destination URL (required)
- Custom slug (optional)
- Domain (optional)
- Tags (optional)
- Folder ID (optional)
- Additional customizations: OG metadata, device targeting, geo-targeting, UTM parameters, password protection, and more

### Get

Get a specific short link by ID, key+domain combination, or external ID.

**Parameters:**
- Retrieve by: linkId, key+domain, or externalId

### Get Many

Get a paginated list of short links with filtering and sorting options.

**Filters:** domain, folder, tags, search query, date range
**Sorting:** createdAt, clicks, saleAmount, lastClicked

### Update

Update an existing short link's properties.

**Update fields:** destination URL, custom slug, tags, OG metadata, device/geo targeting, expiration, and more

### Delete

Delete a short link.

**Parameters:**
- Link ID (required)

### Create or Update

Create a new short link or update an existing one based on external ID.

**Parameters:**
- External ID (required)
- Same parameters as Create operation

### Bulk Create

Create multiple short links in a single request (maximum 100).

**Parameters:** Array of link objects with creation parameters

### Bulk Update

Update multiple short links with identical data (maximum 100).

**Parameters:** 
- Array of link IDs
- Update fields to apply to all

### Bulk Delete

Delete multiple short links in a single request (maximum 100).

**Parameters:** Array of link IDs to delete

</details>

<details>
<summary><b>Partners</b></summary>

### Create

Create or register a new partner in your program.

**Parameters:**
- Email (required)
- Name (optional)
- Country (optional) - 2-letter ISO code
- Group ID (optional)
- Tenant ID (optional)

**Requires:** Advanced plan or higher

### Get

Get a specific partner by email, partner ID, or tenant ID.

**Parameters:**
- Get by: email, partnerId, or tenantId

**Requires:** Advanced plan or higher

### Get Many

Get a paginated list of all partners enrolled in your program.

**Pagination:**
- Return all or limit to specific count (default: 50, max: 100)
- Page number for navigation

**Requires:** Advanced plan or higher

### Update

Update partner information.

**Update by:** email, partnerId, or tenantId

**Update fields:** name, country, groupId

**Requires:** Advanced plan or higher

</details>

<details>
<summary><b>Tags</b></summary>

### Create

Create a tag for organizing links.

**Parameters:**
- Name (required) - 1-50 characters
- Color (optional) - blue (default), red, yellow, green, purple, brown, pink

### Get Many

Get a paginated list of all tags in the workspace.

**Pagination:**
- Return all or limit to specific count (default: 50, max: 100)
- Page number for navigation

### Update

Update tag properties.

**Update fields:** name, color

</details>


## Credentials

To use this node, you need a Dub API token.

### Authentication

This node uses Bearer token authentication. You will need:

- **API Token** – Your Dub API access token from [dub.co/settings/tokens](https://dub.co/settings/tokens)


## Resources

- [Dub Homepage](https://dub.co/)
- [Dub API Documentation](https://dub.co/docs/api-reference/introduction)
- [n8n Community Nodes](https://docs.n8n.io/integrations/#community-nodes)
- [n8n Documentation for LLMs](https://docs.n8n.io/llms.txt)

## Version history

- 0.0.3 – Added Analytics, Commissions, Customers, Conversions, Domains, Folders, Partners, and Tags resources
- 0.0.2 – Added bulk operations and link management
- 0.0.1 – Initial release
