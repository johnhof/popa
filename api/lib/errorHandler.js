//
// middleware error handler
//
module.exports = function (error, req, res, next) {
  console.log('gah')
  if (typeof error === 'string') {
    error = { error : error }
  }

  if (error.name === 'ValidationError') {
    console.log(error)
    error = {
      error   : 'validation Failed',
      details : error.details || error.errors
    };
  }

  // allow javascript errors to pass through to the console
  if (error instanceof Error) {
    res.status(500).send({
      error   : 'Server error',
      details : error.message
    });

    throw (error);

  } else {
    res.status(error.status || 400).send({
      error   : error.error || 'Could not process request',
      details : error.details || null
    });
  }
}