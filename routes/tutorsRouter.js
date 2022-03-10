const express = require('express')
const router = express.Router()
const Tutors = require('../models/tutor')


// C R U D


// _____________Read__________________________________

// Getting all
router.get('/', async (req, res) => {
  try {
    const tutors = await Tutor.find()
    res.json(tutors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}) 

// Getting One
router.get('/:id', getTutor, (req, res) => {
  res.json(res.tutor)
})
// __________________________________________________________________________



// __________Create____________________________________
// Creating one
router.post('/', async (req, res) => {
  const tutor = new Tutor({
    name: req.body.name,
    subject: req.body.subject
  })
  try {
    const newTutor = await tutor.save()
    res.status(201).json(newTutor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
//___________________________________________________________________________  


// ___Updating One______________________________________-
router.patch('/:id', getTutor, async (req, res) => {
  if (req.body.name != null) {
    res.tutor.name = req.body.name
  }
  if (req.body.subject != null) {
    res.tutor.subject = req.body.subject
  }
  try {
    const updatedTutor = await res.tutor.save()
    res.json(updatedTutor)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// _______________________________________________________________________________



//_____ _________Deleting One______________________________

router.delete('/:id', getTutor, async (req, res) => {
  try {
    await res.tutor.remove()
    res.json({ message: 'Deleted Tutor' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTutor(req, res, next) {
  let tutor
  try {
    tutor = await Tutor.findById(req.params.id)
    if (tutor == null) {
      return res.status(404).json({ message: 'Cannot find tutor' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.tutor = tutor
  next()
}

module.exports = router 