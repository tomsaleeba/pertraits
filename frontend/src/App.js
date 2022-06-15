import { useEffect, useState } from 'react'
import './App.css'

const apiUrl = (() => {
  const result = process.env.REACT_APP_API_URL
  if (!result) {
    throw new Error('API URL is missing')
  }
  return result
})()

function App() {
  const [rows, setRows] = useState([])
  const [newVal, setNewVal] = useState(randomName())

  useEffect(() => {
    ;(async () => {
      const resp = await fetch(apiUrl)
      const data = await resp.json()
      setRows(data)
    })()
  }, [])

  async function onDeleteClick(id) {
    console.log('Deleting row', id)
    await fetch(`${apiUrl}/item/${id}`, {
      method: 'DELETE',
    })
    // FIXME check for HTTP failure
    setRows(rows.filter(r => r.id !== id))
  }

  async function onAddClick(e) {
    e.preventDefault()
    console.log('Adding new val', newVal)
    const body = JSON.stringify({val: newVal})
    const resp = await fetch(`${apiUrl}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    const data = await resp.json()
    setRows([...rows, data])
    setNewVal(randomName())
  }

  return (
    <div className="App">
      <h1>Pertraits</h1>
      <form>
        <label>Name:
          <input name="val" type="text" value={newVal}
            onChange={e => setNewVal(e.target.value)}></input>
        </label><br />
        <button onClick={onAddClick} type="submit">Add</button>
      </form>
      <h2>People</h2>
      <table className="people-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => {
            return (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td className="middle-col">{r.title}</td>
                <td>
                  <button onClick={() => onDeleteClick(r.id)}>x</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function randomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'Dani', 'Eggbert', 'Frank']
  const randIndex = Math.floor(Math.random() * 6)
  return names[randIndex]
}

export default App
