async function tryCatchHandler(promise) {
  try {
    let data = await promise;
    return data;
  } catch (error) {
    return console.log(error);
  }
}

module.exports = tryCatchHandler;
