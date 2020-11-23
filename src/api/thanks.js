const express = require('express');
const Joi = require('joi');
const { nanoid } = require('nanoid');
const { route } = require('.');

const thanks = require('../db/thanks');

const schema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  message: Joi.string().min(1).max(280).required(),
  slug: Joi.string().min(2).max(100)
    .pattern(/^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\-_]+$/u),
});

const router = express.Router();

router.get('/:slug', async (req, res, next) => {
  try {
    const found = await thanks.findOne({
      slug: req.params.slug,
    });
    if (found) {
      return res.json(found);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const values = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    if (!values.slug) {
      // TODO: check if lowercase version in use...
      values.slug = nanoid();
    }
    values.slug = values.slug.toLowerCase();
    const created = await thanks.insert(values);
    return res.json(created);
  } catch (error) {
    if (error.message.startsWith('E11000 duplicate key error collection')) {
      error.message = 'Error! Slug in use.';
    }
    return next(error);
  }
});

module.exports = router;
