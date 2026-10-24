function globalErrMiddleware(err, req, res, next) {
  res
    .status(err.cause?.statusCode || 400)
    .json({ errMsg: err.message, errStack : err.stack , extra: err.cause });
}

export default globalErrMiddleware;
