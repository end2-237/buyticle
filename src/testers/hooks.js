import { useState, useEffect } from "react";
import { subscribeTests, subscribeReviews, subscribeTesters } from "./store";

export function useTests() {
  const [tests, setTests] = useState(null);
  useEffect(() => subscribeTests(setTests), []);
  return tests; // null while loading, then array
}

export function useReviews() {
  const [reviews, setReviews] = useState(null);
  useEffect(() => subscribeReviews(setReviews), []);
  return reviews;
}

export function useTesters() {
  const [testers, setTesters] = useState(null);
  useEffect(() => subscribeTesters(setTesters), []);
  return testers;
}
