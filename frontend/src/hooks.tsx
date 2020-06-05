import { useState, useEffect } from "react";
import { selectRandomAnswers } from "./helpers";

export function useLocalStorage<T>(key: string): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localValue = window.localStorage.getItem(key);
      return localValue ? JSON.parse(localValue) : null;
    } catch (error) {
      return null;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
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
          conversation.json.uniformProbability
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
