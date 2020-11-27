class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excluded = ['page', 'limit', 'sort', 'field'];
    excluded.forEach((data) => delete queryObj[data]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  fields() {
    if (this.queryString.field) {
      const fields = this.queryString.field.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  pagination() {
    if (this.queryString.page) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 100;
      this.query = this.query.skip((page - 1) * limit).limit(limit);
    }
    return this;
  }
}

module.exports = APIfeatures;
