import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const DataTable = () => {
  //  F E T C H    F U N C T I O N
  const getUsers = async ({ pageParam = 0 }) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_start=${pageParam}`
    );
    const data = await resp.json();
    return { data, prevOffset: pageParam };
  };

  // I N F N I T E    Q U E R Y
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    getNextPageParam: (lastPage) => {
      if (lastPage.prevOffset + 10 > lastPage.articleCount) {
        return false;
      }
      return lastPage.prevOffset + 10;
    },
  });

  // R E D U C E D    D A T A
  const articles = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);

  // J S X
  return (
    <section className="press-releases">
      <h1>Press Releases</h1>
      <div className="table-wrapper">
        <table className="table">
          {/* T A B L E    H E A D E R */}
          <thead>
            <tr>
              <th>Item</th>
              <th>Title</th>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          {/* T A B L E    B O D Y */}
          <tbody>
            {articles &&
              articles.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>
                      <Link to={`/details/${item.id}`}>
                        <button className="btn">view</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* I N F I N I T E     S C R O L L */}
        <InfiniteScroll
          dataLength={articles ? articles.length : 0}
          next={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={hasNextPage ? <div>Loading...</div> : <button>Up</button>}
        ></InfiniteScroll>
      </div>
    </section>
  );
};

export default DataTable;
