'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.PaginationHelpers = void 0;
const calculatePagination = options => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createAt';
  const sortOrder = options.sortOrder || 'desc';
  const minPrice = Number(options.minPrice || 0);
  const maxPrice = Number(options.maxPrice || 1000000000);
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
  };
};
exports.PaginationHelpers = {
  calculatePagination,
};
