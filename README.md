# nammatham-v2-azure-functions-starter

## Local Dev

Prep Azure Functions Config on local, create `local.settings.json`

```json
{
"IsEncrypted": false,
"Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
    },
"ConnectionStrings": {}
}
```

then run local

```
yarn dev
```

## Run Azure Functions Worker on Local

```
yarn start
```

## Deploy to Azure functions
```
yarn build
func azure functionapp publish [Azure-Function-name]
```