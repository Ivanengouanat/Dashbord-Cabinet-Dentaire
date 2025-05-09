import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider(
  "https://jsonplaceholder.typicode.com",
  fetchUtils.fetchJson
);

export default dataProvider;
