const { Router } = require('express');
const Link = require('../models/Link');
const Statistics = require('../models/Statistics');

const router = Router();

router.get('/:urlPath', async (req, res) => {
    const { urlPath } = req.params;
    try {
        const link = await Link.findOne({ shortId: urlPath });
        if (!link) throw new Error('No Link found with this id');

        const newStats = new Statistics({ 
            linkId: link.id,
            userAgent: req.header('user-agent'),
            ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        });
        _ = await newStats.save();
        res.status(301).redirect(link.redirectToUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;