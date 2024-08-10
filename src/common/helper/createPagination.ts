interface Props {
  page?: number;
  take?: number;
  count: number;
}

export const createPagination = ({ page, take, count }: Props) => {
  const totalPages = Math.ceil(count / take) || 0;

  return {
    count,
    totalPages: totalPages,
    currentPage: page || 0,
    nextPage: totalPages > page ? page + 1 : null,
    prevPage: page - 1 > 0 ? page - 1 : null,
  };
};
