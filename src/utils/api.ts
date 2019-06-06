import axios from "axios";
import { CurrencyInfo } from "../types/CurrencyInfo";
const instance = axios.create({
  baseURL: "https://www.cryptonator.com/api"
});

export async function getCurrencyInfo(
  currencyPair: string
): Promise<CurrencyInfo> {
  const { data } = await instance.get<CurrencyInfo>(`/ticker/${currencyPair}`);
  return data;
}
