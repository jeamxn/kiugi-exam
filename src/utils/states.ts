"use client";

import { atom } from "recoil";

import { Subject } from "./getTests";

const getFromLocalStorage = (key: string, defaultValue: any) => {
  if(typeof window === "undefined") return defaultValue;
  const storageData = JSON.parse(localStorage.getItem("find") || "{}");
  return storageData[key] || defaultValue;
};

export const gradeAtom = atom({
  key: "grade",
  default: getFromLocalStorage("grade", 3),
});

export const subjectAtom = atom<Subject[]>({
  key: "subject",
  default: getFromLocalStorage("subjList", []),
});

export const monthAtom = atom<number[]>({
  key: "month",
  default: getFromLocalStorage("monthList", []),
});

export const beginYearAtom = atom({
  key: "beginYear",
  default: getFromLocalStorage("beginYear", new Date().getFullYear()),
});

export const endYearAtom = atom({
  key: "endYear",
  default: getFromLocalStorage("endYear", new Date().getFullYear()),
});