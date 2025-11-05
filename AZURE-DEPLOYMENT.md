# Azure Storage Deployment Guide

## Deploy Colfax Township Website to Azure Storage

### Prerequisites
- Azure subscription
- Azure CLI or Azure Storage Explorer

### Method 1: Azure Portal
1. Create Storage Account
2. Go to Static website (under Data management)
3. Enable static website hosting
4. Set index document: `index.html`
5. Upload all files to the `$web` container

### Method 2: Azure CLI
```bash
# Create resource group
az group create --name colfax-township-rg --location eastus

# Create storage account
az storage account create \
  --name colfaxtownshipweb \
  --resource-group colfax-township-rg \
  --location eastus \
  --sku Standard_LRS

# Enable static website
az storage blob service-properties update \
  --account-name colfaxtownshipweb \
  --static-website \
  --index-document index.html \
  --404-document 404.html

# Upload files
az storage blob upload-batch \
  --account-name colfaxtownshipweb \
  --destination '$web' \
  --source ./

# Get the website URL
az storage account show \
  --name colfaxtownshipweb \
  --resource-group colfax-township-rg \
  --query "primaryEndpoints.web" \
  --output tsv
```

### Method 3: GitHub Actions (Automated)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure Storage
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Azure Login
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Upload to Azure Storage
      uses: azure/CLI@v1
      with:
        inlineScript: |
          az storage blob upload-batch \
            --account-name colfaxtownshipweb \
            --destination '$web' \
            --source ./ \
            --overwrite
```

### File Structure for Upload
```
All files in c:\ColfaxTwnship\ should be uploaded:
├── index.html
├── about.html
├── board.html
├── building.html
├── events.html
├── meetings.html
├── projects.html
├── styles.css
├── script.js
├── assets/
│   ├── colfax-logo.png
│   └── noise-ordinance.txt
└── README.md
```

### Custom Domain (Optional)
1. Configure CNAME record: `www.colfaxtownship.org` -> `colfaxtownshipweb.z13.web.core.windows.net`
2. Enable custom domain in Storage Account
3. Add SSL certificate via Azure Front Door or CDN

### Estimated Costs
- Storage: ~$0.02/month for typical township website
- Bandwidth: ~$0.08/GB for data transfer
- Total: Usually under $5/month for small municipal sites

### Benefits Over Traditional Hosting
- 99.9% uptime SLA
- Global CDN distribution
- Automatic HTTPS
- No server maintenance
- Scales to handle traffic spikes
- Integrated with Azure security features

### Monitoring & Analytics
- Enable Azure Monitor for uptime monitoring
- Add Application Insights for visitor analytics
- Set up alerts for availability issues

### Backup Strategy
- Storage Account has built-in redundancy
- Enable versioning for file history
- Regular exports to secondary storage account