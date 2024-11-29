function serviceResponse({ status, data, message, errors, errorMsg }) {
    this.status = status || 200;
    this.data = data ? data : {};
    this.message = message || "";
    this.errors = errors ? errors : errorMsg ? [{ message: errorMsg }] : [];
};

module.exports = { serviceResponse };
