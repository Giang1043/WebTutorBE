const MAX_LIMIT = 100;

const paginationGuard = (req, _res, next) => {
  const { limit, page } = req.query;
  if (limit !== undefined) {
    const parsedLimit = Number.parseInt(limit, 10);
    if (Number.isNaN(parsedLimit) || parsedLimit < 1) delete req.query.limit;
    else req.query.limit = String(Math.min(parsedLimit, MAX_LIMIT));
  }
  if (page !== undefined) {
    const parsedPage = Number.parseInt(page, 10);
    if (Number.isNaN(parsedPage) || parsedPage < 1) delete req.query.page;
    else req.query.page = String(parsedPage);
  }
  next();
};

module.exports = paginationGuard;
module.exports.MAX_LIMIT = MAX_LIMIT;
