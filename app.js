require('dotenv').config()
const express = require('express')
const app = express()

// TODO: import the getCityInfo and getJobs functions from util.js
const {getJobs, getCityInfo} = require('./util.js');

// TODO: Statically serve the public folder
app.use(express.static('./public'));

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
app
.route('/api/city/:city')
.get(async (req, res) => {
    const location = req.params.city;
    try {
        const cityInfo = await getCityInfo(location);
        const jobs = await getJobs(location);
        if (cityInfo || jobs) {
            res.status(200).json({cityInfo, jobs});
            } else {
                res.status(404).json({error: 'Information Not Found!'
            });
        } 
    } catch (err) {
        console.log(err);
    } 
});

module.exports = app