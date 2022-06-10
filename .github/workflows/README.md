# Secrets you need in GitHub Actions

## `GH_ACTIONS_GCP_ACCESS_KEY`
The base64 encoded JSON key for the Service Account user on GCP that has perms
to deploy to Google Cloud Run.

To get the value
- go to the [Service
  Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) section
  of GCP
- create a Service Account
- open the details for the account
- go to the Keys tab
- create a new key
- choose JSON type
- it'll be downloaded to your machine
- encode the downloaded file
    ```bash
    cat path/to/key-1234.json | base64 -w0
    ```
- the output of that command is the value for this secret

The Service Account should have these perms
- Cloud Run Admin

## `RUNNING_SERVICE_GCP_SERVICE_ACCOUNT`
This is just the name/principal/email address of the Service Account that the
deployed service should run as, e.g:

```
blah-api@blah.iam.gserviceaccount.com
```

The Service Account should have these perms
- Storage Object Creator (for the GCS bucket)
