import { useState, useEffect } from "react";
import { selectRandomAnswers } from "./helpers";

export function useLocalStorage<T>(uuid: string): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localValue = window.localStorage.getItem(uuid);
      return localValue ? JSON.parse(localValue) : null;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(uuid, JSON.stringify(value));
      window.localStorage.setItem(
        "student_" + uuid,
        "" + (Math.floor(Math.random() * 2) + 1)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function useFetchAndStoreConversation<Conversation>(
  url: string,
  key: string
): [Conversation | undefined, boolean] {
  const [data, setData] = useLocalStorage<Conversation>(key);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);

    if (response.status === 200) {
      setLoading(false);
      const conversation = await response.json();

      if (conversation) {
        conversation.json.questions = selectRandomAnswers(
          conversation.json.questions,
          conversation.json.uniform
        );
        setData(conversation);
      }
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      fetchUrl();
    }
  }, []);

  return [data, loading];
}

export function useFetch<T>(url: string): [T | undefined, boolean] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);

    if (response.status === 200) {
      setLoading(false);
      const respoonses = await response.json();
      setData(respoonses);
    } else {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      fetchUrl();
    }
  }, []);

  return [data, loading];
}
