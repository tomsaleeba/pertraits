#!/bin/bash
set -eux
echo "working dir=$PWD"

cat <<HEREDOC > /etc/litestream.yml
dbs:
  - path: ${DB_PATH}
    replicas:
      - url: gcs://${GCS_BUCKET}/the.db
HEREDOC

# Restore the database if it does not already exist.
if [ -f $DB_PATH ]; then
	echo "Database already exists, skipping restore"
else
	echo "No database found, restoring from replica if exists"
	litestream restore -v -if-replica-exists $DB_PATH
fi

# Run litestream with your app as the subprocess.
exec litestream replicate -exec "node ."
