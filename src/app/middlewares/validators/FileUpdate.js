import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    /**
     * Schema validation
     */
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
    });

    /**
     * Verify if request is valid with our schema
     */
    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};
