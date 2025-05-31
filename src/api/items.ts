import { store, } from "../state/store";
import { setFalse, setTrue } from "../state/submited/submitSlice";
import type { TableItem } from "./types";
import { v4 as uuidv4 } from "uuid";
const API_URL = "http://localhost:3000";
const LIMIT = 20;

const getYearMonthDay = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

export const addUser = async (
  user: Omit<TableItem, "id">
): Promise<TableItem> => {
  try {
    const id = uuidv4();
    const registrationDate = user?.registrationDate
      ? user.registrationDate
      : getYearMonthDay();

    const safeUser: TableItem = {
      ...user,
      id: id,
      registrationDate: registrationDate,
    };

    console.log("Sending user:", safeUser);

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(safeUser),
    });

    const responseText = await response.text();
    console.log("Raw server response:", responseText);

    if (!response.ok) {
      throw new Error(`POST failed: ${response.status} - ${responseText}`);
    }

    try {
      setSubmitTrue()
      return JSON.parse(responseText);
    } catch (e) {
      console.warn("JSON parse error, but returning safeUser");
      return safeUser; 
    }
  } catch (error) {
    console.error("Full error details:", {
      error,
      API_URL,
      timestamp: new Date().toISOString(),
    });
    throw new Error(`User creation failed: ${error}`);
  }
};

export const fetchUsersPage = async (
  pageParam: number
): Promise<{
  data: TableItem[];
  currentPage: number;
  nextPage: number | null;
}> => {
  const response = await fetch(
    `${API_URL}/users?_start=${pageParam}&_end=${pageParam + LIMIT}`
  );
  const submit = getSubmitState();
  const data = await response.json();
  const hasMore = data.length === LIMIT || submit;
  setSubmitFalse()
  console.log(`hasMore: ${hasMore.valueOf()}`);
  console.log(`data.length === LIMIT: ${data.length === LIMIT}`);
  console.log(`submit: ${submit}`);
  console.log(`hasMore ? pageParam + LIMIT : null ${hasMore ? pageParam + LIMIT : null}` );
  
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data,
        currentPage: pageParam,
        nextPage: hasMore ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
};

const getSubmitState = () => {
  return store.getState().submit.value;
};

const setSubmitFalse = () => {
  console.log('setFalse',getSubmitState())
  store.dispatch(setFalse());
};
const setSubmitTrue = () => {
  console.log('setTrue',getSubmitState())
  store.dispatch(setTrue());
};
