import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

import { logout } from "./authSlice";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
  const result = await baseQuery(args, api, extra);
  if (result.error && result.error.status === 401) {
    // api.dispatch(logout());
    // alert(result.error.data.message);
    console.log(result.error);
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Product", "Order", "User", "Users"],
  endpoints: (builder) => ({}),
});
