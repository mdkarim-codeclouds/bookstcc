const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const validator = require('../util/validate');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    errors: { title: '', description: '' }
  });
});

// /admin/add-product => POST
router.post('/add-product', async (req, res, next) => {
  const validationRule = {
    "title": "required|string",
    "description": "required|string"
  }; 
  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        ...err
      });
    } else {
      products.push({ title: req.body.title, description: req.body.description });
      res.redirect('/');
    }
  }).catch(err => console.log(err))
});

exports.routes = router;
exports.products = products;
