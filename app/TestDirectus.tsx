"use client";
import { useEffect } from "react";

export default function TestDirectus() {
  useEffect(() => {
    const test = async () => {
      try {
        const res = await fetch(
          "https://admin.smislest.ru/items/products",
          {
            method: "GET",
            credentials: "include",
          }
        );

        console.log("STATUS:", res.status);
        const data = await res.json();
        console.log("DATA:", data);
      } catch (e) {
        // Error handled
      }
    };

    test();
  }, []);

  return <div>Проверяю соединение с Directus… смотри консоль браузера</div>;
}
