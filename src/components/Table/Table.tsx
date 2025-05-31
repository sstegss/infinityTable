import styles from "./Table.module.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsersPage } from "../../api/items";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { setFalse } from "../../state/submited/submitSlice";

export default function Table() {
  const submitted = useSelector((state: RootState) => state.submit.value);
  const dispatch = useDispatch();
  let { data, isPending, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["items"],
      queryFn: ({ pageParam }) => fetchUsersPage(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView();
  useEffect(() => {
    if (
      inView &&
      hasNextPage &&
      !isFetchingNextPage &&
      (hasNextPage || submitted)
    ) {
      console.log(``);

      fetchNextPage().then(() => dispatch(setFalse()));
    }
  }, [fetchNextPage, inView, isFetchingNextPage, submitted]);
  return (
    <>
      <h1 className={styles.h1}>Table of users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>id</td>
            <td>first name</td>
            <td>middle name</td>
            <td>last name</td>
            <td>email</td>
            <td>age</td>
            <td>phone</td>
            <td>telegram</td>
            <td>city</td>
            <td>registration date</td>
            <td>notifications</td>
            <td>premium</td>
            <td>balance</td>
            <td>university education</td>
            <td>
              Two-factor <br />
              authentication
            </td>
          </tr>
        </thead>
        <tbody>
          {data?.pages.map((page) =>
            page.data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.midName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.phone ?? "-"}</td>
                <td>{user.telegram ?? "-"}</td>
                <td>{user.city ?? "-"}</td>
                <td>{user.registrationDate?.toString() ?? "-"}</td>
                <td>{user.notifications ? "yes" : "no"}</td>
                <td>{user.premiumMember ? "yes" : "no"}</td>
                <td>{user.balance ?? "-"}</td>
                <td>{user.universityEducation ? "yes" : "no"}</td>
                <td>{user.twoFactorEnabled ? "yes" : "no"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div ref={ref}></div>
      {isFetchingNextPage || isPending ? (
        <div className={styles.loading}></div>
      ) : (
        ""
      )}
    </>
  );
}
