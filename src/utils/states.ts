import { atom } from "recoil";

import { Subject } from "./getTests";

export const gradeAtom = atom<number>({
  key: "grade",
  default: 3,
});

export const subjectsAtom = atom<Subject[]>({
  key: "subjects",
  default: [],
});

export const monthsAtom = atom<number[]>({
  key: "months",
  default: [],
});