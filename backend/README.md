# For developers
## Steps
- do the stuff [here][0]
  - create a bucket in Google Cloud Storage
  - create a Service Account
  - grant that Service Account
    - Storage Object Creator
    - Storage Object Viewer
  - create a JSON key for that Service Account
- `mv ~/Downloads/[service-account-key].json ./secrets/gcp-key.json`
- `docker-compose up --build`
- open http://localhost:33000
- create a new item. This will be immediately sync'd to GCS. You can delete the
  stack and recreate it and the DB will be restored with your new item

## Ideas
- could run two separate services
  reader.example.com
  writer.example.com
  ...so the app can send requests to the right spot and we allow scaling on the
  reader service

## Links
- [node-sqlite3 docs](https://github.com/TryGhost/node-sqlite3/wiki/API)
- [litestream docker example](https://github.com/benbjohnson/litestream-docker-example)
- [minio docker guide](https://docs.min.io/docs/minio-docker-quickstart-guide.html)


[0]: https://litestream.io/guides/gcs/#create-a-service-account
