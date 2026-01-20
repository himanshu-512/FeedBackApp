import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "./ip"; // tumhara existing ip file

const BASE_URL = `http://${ip}:3003/wallet`;

async function authFetch(url) {
  const token = await AsyncStorage.getItem("token");

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Wallet API error");
  }

  return res.json();
}

export const getWalletSummary = () =>
  authFetch(`${BASE_URL}/summary`);

export const getWalletTransactions = () =>
  authFetch(`${BASE_URL}/transactions`);
