# GCP APIs that need to be enabled
- Cloud Build API
- Cloud Run API

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

The Service Account should have these roles
- Cloud Run Admin
- Cloud Run Service Agent
- Cloud Build Editor
- Artifact Registry Admin
- Storage Admin
- Service Account User

## `RUNNING_SERVICE_GCP_SERVICE_ACCOUNT`
This is just the name/principal/email address of the Service Account that the
deployed service should run as, e.g:

```
blah-api@blah.iam.gserviceaccount.com
```

The Service Account should have these roles
- Storage Object Admin (for the GCS bucket)


# AWS config
We're using these services:
- S3: to store the built frontend assets
- CloudFront: to give us a HTTPS-enabled CDN for the objects in S3

IAM Policy required for the users to do these deploys:
```json
{
  "Version": "2012-10-17",
    "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
      "s3:GetObjectAcl",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject",
      "cloudfront:CreateInvalidation",
      "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::pertraits.techotom.com/*",
      "arn:aws:s3:::dev-pertraits.techotom.com/*",
      "arn:aws:s3:::pertraits.techotom.com",
      "arn:aws:s3:::dev-pertraits.techotom.com",
      "arn:aws:cloudfront::883060936904:distribution/E2ZCDJODKD2KF4",
      "arn:aws:cloudfront::883060936904:distribution/E3NFJXULZ0HLRV"
      ]
    }
  ]
}
```
