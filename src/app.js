import express from 'express'
const {notes} = require('../notes.json')
const app = express()

const generateId = () =>{
   const maxId = Math.max(...notes.map(n => n.id))
   return maxId + 1
}

app.use(express.json())

app.get('/', (request, response) => response.send(notes))
app.get('/:id', (request, response) => {
   const id = request.params.id
   const note = notes.find(note => note.id === Number(id))
   note ? response.send(note) : response.status(404).end()
 })

app.post('/', (request, response) => {
   const body = request.body

   if (!body.content) return response.status(400).json({error: "content missing"})

   const note = {
      id: generateId(),
      content: body.content,
      important: body.important || false,
      date: new Date()
   }

   notes.push(note)
   response.send(note)
 })

app.delete('/:id', (request, response) => {
   const id = request.params.id
   notes = notes.filter(note => note.id !== Number(id))
   response.status(204).end()
 })

 export default app