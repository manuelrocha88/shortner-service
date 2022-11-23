const { Router } = require('express');
const Link = require('../models/Link');

const router = Router();

router.get('/:urlPath', async (req, res) => {
    const { urlPath } = req.params
    console.log(urlPath);
    try {
        const link = await Link.find({ shortId: urlPath });
        if (!link) throw new Error('No Link found with this id');
        res.status(200).redirect(link.redirectToUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;