export function validate(schema) {
  return async function (req, res, next) {
    try {
      const data = { body: req.body, query: req.query, params: req.params }
      await schema.parseAsync(data)
      next()
    } catch (e) {
      res.status(400).json({ error: 'Validation failed', details: e.errors || String(e) })
    }
  }
}
