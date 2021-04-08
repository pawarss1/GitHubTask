import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().alphanum().min(1).max(30)
    .required(),
});

export default async function inputValidation(req, res, next) {
  try {
    await schema.validateAsync({
      name: req.query.name,
    });
    // If the username is provided, then go to the next step.
    next();
  } catch (err) {
    res.status(400).send({
      listOfRepos: [],
      success: false,
      errMsg: 'Please provide a user/repo name',
    });
  }
}
