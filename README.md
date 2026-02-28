<h1 align="center">
  <br>
  n8n-nodes-dub
  <br>
</h1>

<p align="center">
	<img alt="NPM Version" src="https://img.shields.io/npm/v/n8n-nodes-dub">
	<img alt="GitHub License" src="https://img.shields.io/github/license/hansdoebel/n8n-nodes-dub">
	<img alt="NPM Downloads" src="https://img.shields.io/npm/dm/n8n-nodes-dub">
	<img alt="NPM Last Update" src="https://img.shields.io/npm/last-update/n8n-nodes-dub">
	<img alt="Static Badge" src="https://img.shields.io/badge/n8n-2.9.4-EA4B71?logo=n8n">
</p>

<p align="center">
  <a href="#installation">Installation</a> |
  <a href="#credentials">Credentials</a> |
  <a href="#resources">Resources</a> |
  <a href="#development">Development</a> |
  <a href="#license">License</a>
</p>

---

n8n community node for integrating [Dub](https://dub.co) link management into your n8n workflows.

## Installation

1. Make a new workflow or open an existing one
2. Open the nodes panel by selecting **+** or pressing **Tab**
3. Search for **Dub**
4. Select **Install** to install the node for your instance

## Credentials

1. **Obtain an API token** from [dub.co/settings/tokens](https://dub.co/settings/tokens)
2. **Create new credentials** in n8n by selecting Dub API
3. **Enter your API token** in the token field

## Resources

<details>
<summary><strong>Analytics</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Get | Retrieve analytics for a link, domain, or workspace |

</details>

<details>
<summary><strong>Commissions</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Get Many | Retrieve a list of commissions for a program |
| Update | Update an existing commission amount |

</details>

<details>
<summary><strong>Conversions</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Track Lead | Record a lead conversion for a short link |
| Track Sale | Record a sale conversion for a short link |

</details>

<details>
<summary><strong>Customers</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Get | Retrieve a specific customer by ID |
| Get Many | Retrieve a paginated list of customers |
| Update | Update customer information |
| Delete | Delete a customer from the workspace |

</details>

<details>
<summary><strong>Domains</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Create | Create a custom domain for the workspace |
| Get | Retrieve a specific domain by slug |
| Update | Update domain settings and configurations |
| Delete | Delete a domain from the workspace |

</details>

<details>
<summary><strong>Folders</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Create | Create a folder for organizing links |
| Get | Retrieve a specific folder by ID |
| Update | Update folder properties |
| Delete | Delete a folder from the workspace |

</details>

<details>
<summary><strong>Links</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Create | Create a new short link |
| Get | Get a specific short link by ID, key, or external ID |
| Get Many | Get a paginated list of short links |
| Update | Update an existing short link |
| Delete | Delete a short link |
| Create or Update | Create or update a short link based on external ID |
| Bulk Create | Create multiple short links in a single request |
| Bulk Update | Update multiple short links with identical data |
| Bulk Delete | Delete multiple short links in a single request |

</details>

<details>
<summary><strong>Partners</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Create | Create or register a new partner in your program |
| Get | Get a specific partner by email, partner ID, or tenant ID |
| Get Many | Get a paginated list of all partners |
| Update | Update partner information |

</details>

<details>
<summary><strong>Tags</strong></summary>

| Operation | Description |
| --------- | ----------- |
| Create | Create a tag for organizing links |
| Get Many | Get a paginated list of all tags |
| Update | Update tag properties |

</details>

## Development

```bash
git clone https://github.com/hansdoebel/n8n-nodes-dub.git
cd n8n-nodes-dub
npm install
npm run build
npm run lint
```

## License

[MIT](LICENSE.md)

<p align="center">
  <a href="https://github.com/hansdoebel/n8n-nodes-dub">GitHub</a> |
  <a href="https://github.com/hansdoebel/n8n-nodes-dub/issues">Issues</a> |
  <a href="https://dub.co/docs">Dub Docs</a>
</p>
