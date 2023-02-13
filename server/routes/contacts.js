const { Contact } = require('../models/contact');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
    const contactList = await Contact.find({});

    if (!contactList) {
        res.status(500).json({ success: false });
    }
    res.send(contactList);
});

router.get(`/:id`, async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404).json({ success: false });
    }
    res.send(contact);
});

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    let fileName = '';
    if (req.file) {
        fileName = req.file.filename;
    }
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let contact = new Contact({
        name: req.body.name,
        image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
        city: req.body.city,
        email: req.body.email,
        country: req.body.country,
        phone: req.body.phone
    });

    contact = await contact.save();

    if (!contact) return res.status(500).send('The contact cannot be created');

    res.send(contact);
});

router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid contact id');
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(400).send('Invalid contact!');

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = contact.image;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            image: imagepath,
            city: req.body.city,
            email: req.body.email,
            country: req.body.country,
            phone: req.body.phone
        },
        { new: true }
    );

    if (!updatedContact) return res.status(500).send('the contact cannot be updated!');

    res.send(updatedContact);
});

router.delete('/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id)
        .then((contact) => {
            if (contact) {
                return res.status(200).json({
                    success: true,
                    message: 'the contact is deleted!'
                });
            } else {
                return res.status(404).json({ success: false, message: 'contact not found!' });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});

router.get(`/get/count`, async (req, res) => {
    const contactCount = await Contact.countDocuments((count) => count);

    if (!contactCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        contactCount
    });
});

router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Contact Id');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }

    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!contact) return res.status(500).send('the gallery cannot be updated!');

    res.send(contact);
});

module.exports = router;
