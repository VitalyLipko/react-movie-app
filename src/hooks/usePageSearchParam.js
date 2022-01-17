import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function usePageSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  );

  useEffect(() => {
    setSearchParams(page === 1 ? {} : { page });
  }, [page, setSearchParams]);

  return [page, setPage];
}
