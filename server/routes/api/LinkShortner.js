const { Router } = require('express');
const shortid = require('shortid');
const Link = require('../../models/Link');
const Statistics = require('../../models/Statistics');

const router = Router();

router.get('/list', async (req, res) => {
    try {
        const linkList = await Link.find();
        if (!linkList) throw new Error('No Links found');

        for(const link of linkList) {
            const linkStatistics = await Statistics.find({ shortId: link.shortId });
            link.clickCount = linkStatistics.length;
        }

        res.status(200).json(linkList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/encode', async (req, res) => {
    const newShortLink = new Link({ shortId: shortid.generate(6), ...req.body })
    try {
        const shortLink = await newShortLink.save();
        if (!shortLink) throw new Error('Something went wrong shortning the link');
        res.status(200).json(shortLink);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/decode', async (req, res) => {
    try {
        const link = await Link.findOne(req.body);
        if (!link) throw new Error('No Link found with this id');
        res.status(200).json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/statistic/:urlPath', async (req, res) => {
    const { urlPath } = req.params;
    try {
        const linkStatistics = await Statistics.find({ shortId: urlPath });
        if (!linkStatistics) throw new Error('No Link Statistics found');
        res.status(200).json(linkStatistics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;