module.exports = (page = 1, size = 10) => {
    const limit = size;
    const offset = (page - 1) * size;
    return { limit, offset };
};
