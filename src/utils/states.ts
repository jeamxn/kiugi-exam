import { atom } from "recoil";

import { Subject } from "./getTests";

const storageData = JSON.parse(localStorage.getItem("find") || "{}");

export const gradeAtom = atom({
  key: "grade",
  default: storageData?.grade || 3,
});

export const subjectAtom = atom<Subject[]>({
  key: "subject",
  default: storageData?.subjList || [],
});

export const monthAtom = atom<number[]>({
  key: "month",
  default: storageData?.monthList || [],
});

export const beginYearAtom = atom({
  key: "beginYear",
  default: storageData?.beginYear || new Date().getFullYear(),
});

export const endYearAtom = atom({
  key: "endYear",
  default: storageData?.endYear || new Date().getFullYear(),
});