[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# minelev-queue-api

## API

All calls requires a valid JSON Web Token

### `GET /queue`

Get next job from queue

### `POST /status/:id`

Update job with status

## Development

You will need the [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2) installed

1. Clone the repo: `git clone git@github.com:vtfk/minelev-queue-api.git`
1. Install dependencies: `npm i`
1. Add a `local.settings.json` file:
    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AzureWebJobsStorage": "",
        "MONGODB_CONNECTION": "mongodb+srv://<username>:<password>@<server>?retryWrites=true&w=majority",
        "MONGODB_COLLECTION": "documents",
        "MONGODB_NAME": "minelev-dev",
        "JWT_SECRET": "some-awfully-long-secret",
        "PAPERTRAIL_HOST": "<url>",
        "PAPERTRAIL_PORT": <port-number>,
        "PAPERTRAIL_HOSTNAME": "<hostname>",
        "NODE_ENV": "development"
      }
    }
    ```
1. Test function locally: `func start`
