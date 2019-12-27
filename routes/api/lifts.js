const express = require('express');
const router = express.Router();

//lift Model
const Lift = require('../../models/Lift');

//@route GET api/lift
//@desc Get All Lifts
//@access public
router.get('/', (req, res) => {
    Lift.find()
        .sort({ date: -1 })
        .then(lifts => res.json(lifts))
})

//@route POST api/lift
//@desc Create A Lift
//@access public
router.post('/add', (req, res) => {
    const newLift = new Lift({
        name: req.body.name,
        goal: req.body.goal,
        reps: req.body.reps,
        max: req.body.max,
        volume: req.body.volume,
        workout: req.body.workout,
        date: Date.parse.date
    });

    newLift.save().then(lift => res.json(lift));
});

//@route GET api/lift
//@desc Get All Lifts
//@access public
router.get('/:id', (req, res) => {
    Lift.findById(req.params.id)
        .then(lift => res.json(lift))
        .catch(err => res.status(400).json('error' + err));
})

//@route DELETE api/lifts
//@desc Delete a workout
//@access public
router.delete('/delete/:id', (req, res) => {
    console.log(req.params.id)
    Lift.findById(req.params.id)
        .then(lift => lift.remove().then(() => res.json({ success: true })))
        .catch(err => res.satus(404).json({ success: false }));
});

//@route POST api/lift
//@desc Update A Lift
//@access public
router.post('/update/:id', (req, res) => {
    if (req.body.workout.lift.length === 0) {
        Lift.findById(req.params.id)
            .then(lift => {
                lift.name = req.body.name;
                lift.goal = req.body.goal;
                lift.max = req.body.max;
                lift.reps = req.body.reps
                lift.volume = req.body.volume
                lift.workout = lift.workout.concat(req.body.workout);

                lift.save().then(lift => res.json(lift));
            })
    } else {
        Lift.findById(req.params.id)
            .then(lift => {
                lift.name = req.body.name;
                lift.goal = req.body.goal;
                lift.max = req.body.max;
                lift.reps = req.body.reps
                lift.volume = req.body.volume
                lift.workout[req.body.liftID.selectedLift].lift = lift.workout[req.body.liftID.selectedLift].lift.concat(req.body.workout.lift);
                lift.save().then(lift => res.json(lift));
            })
    }

});




module.exports = router;