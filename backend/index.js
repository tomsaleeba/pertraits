const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')


const port = process.env.PORT || 33000
const app = express()
app.use(cors())
const dbPath = process.env.DB_PATH || './the.db'
const db = new sqlite3.Database(dbPath)
const log = {
  debug: console.debug,
  info: console.info,
  warn: console.warn,
  error: console.error,
}

app.get('/', async (req, res) => {
  const rows = await getData()
  return res.send(rows)
})

app.post('/item', bodyParser.json(), (req, res) => {
  const { val } = req.body
  log.debug(`Processing POST for val=${val}`)
  if (!val) {
    return res.status(400).send({msg: 'no val supplied'})
  }
  log.info(`Inserting value: ${val}`)
  try {
    db.run('INSERT INTO todos VALUES (?)', val, function (err) {
      if (err) {
        throw new Error('FIXME response with a nice error')
      }
      // FIXME should we actually read the data back from the DB?
      return res.send({id: this.lastID, title: val})
    })
  } catch (err) {
    log.error('Failed to insert value', err)
    return res.status(500).send({populationFailTown: 'you'})
  }
})

app.delete('/item/:id', (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).send({msg: 'no id supplied'})
  }
  log.info(`Deleting ID: ${id}`)
  try {
    db.run('DELETE FROM todos WHERE rowid = ?', id, function (err) {
      if (err) {
        throw new Error('FIXME response with a nice error')
      }
      return res.status(204).send()
    })
  } catch (err) {
    log.error(`Failed to delete item with id=${id}`, err)
    return res.status(500).send({populationFailTown: 'you'})
  }
})

;(async () => {
  await new Promise(r => {
    db.serialize(() => {
      db.get('SELECT count(*) AS c FROM todos', (err, resultRow) => {
        if (!err) {
          log.info(`DB and table exists, ${resultRow.c} rows, nothing to do`)
          return r()
        }
        log.warn('DB (probably) does not exist, creating it.')
        db.run('CREATE TABLE todos (title TEXT)')
        return r()
        // FIXME do we need db.close() on shutdown?
      })
    })
  })
  app.listen(port, () => {
    log.info(`listening on port ${port}`)
  })
})()

async function getData() {
  const rows = await new Promise((resolve, reject) => {
    db.all('SELECT rowid AS id, title FROM todos', (err, result) => {
      if (err) {
        return reject(new Error('Failed to get rows', err))
      }
      log.info(`Found ${result.length} rows`)
      return resolve(result)
    })
  })
  return rows
}
