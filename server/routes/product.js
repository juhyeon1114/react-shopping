const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});

const upload = multer({ storage: storage }).single('file')

router.post('/image', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({
                success: false,
                err
            });
        }
        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename
        });
    })
});

router.delete('/image/delete', (req, res) => {

});

router.post('/', (req, res) => {
    const product = new Product(req.body);

    product.save(err => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({ success: true });
    })
});

router.post('/products', (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            findArgs[key] = key === 'price'
                ? { $gte: req.body.filters[key][0], $lte: req.body.filters[key][1] }
                : req.body.filters[key];
        }
    }

    if (term) {
        Product.find(findArgs)
        .find({ $text: { $search: term } })
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) {
                return res.status(400).json({ success: false })
            } else {
                return res.status(200).json({ success : true, productInfo })
            }
        });
    } else {
        Product.find(findArgs)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) {
                    return res.status(400).json({ success: false })
                } else {
                    return res.status(200).json({ success : true, productInfo })
                }
            });
    }
    
});

router.get('/products_by_id', (req, res) => {
    let type = req.query.type;
    let productIds = req.query.id;
    if (type === 'single') {
        Product.find({ _id: productIds })
            .populate('writer')
            .exec((err, product) => {
                return err ? res.status(400).send(err) : res.status(200).send({product, success: true}) ;
            })
    } else if (type === 'array') {
        let ids = [];
        productIds.split(',').forEach(e => {
            e ? ids.push(e) : {};
        });

        Product.find({ _id: {$in: ids} })
            .populate('writer')
            .exec((err, product) => {
                return err ? res.status(400).send(err) : res.status(200).send(product) ;
            })
    }
});

module.exports = router;
