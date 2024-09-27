import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";

import { Subject, subjectMap } from "@/utils/getTests";
import { beginYearAtom, endYearAtom, gradeAtom, monthAtom, subjectAtom } from "@/utils/states";

const Search = () => {
  const [grade, setGrade] = useRecoilState(gradeAtom);
  const [subjects, setSubject] = useRecoilState(subjectAtom);
  const [months, setMonth] = useRecoilState(monthAtom);
  const [beginYear, setBeginYear] = useRecoilState(beginYearAtom);
  const [endYear, setEndYear] = useRecoilState(endYearAtom);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row items-center justify-center gap-1 flex-wrap">
          {
            [1, 2, 3].map(e => (
              <button 
                key={e}
                onClick={() => setGrade(e)}
                className={[
                  "px-4 h-8.5 text-sm rounded-xl transition-colors",
                  grade === e ? "bg-slate-700 dark:bg-slate-600 text-white dark:text-slate-200" : "text-slate-950 bg-slate-200 dark:bg-slate-800 dark:text-slate-600"
                ].join(" ")}
              >
                {e}학년
              </button>
            ))
          }
        </div>
        <div className="flex flex-row items-center justify-center gap-1 flex-wrap">
          {
            Object.keys(subjectMap).map(e => (
              <button 
                key={e}
                onClick={() => setSubject(p => {
                  const _ = e as Subject;
                  if(p.includes(_)) return p.filter(v => v !== e);
                  return [...p, _];
                })}
                className={[
                  "px-4 h-8.5 text-sm rounded-xl transition-colors",
                  subjects.includes(e as Subject) ? "bg-slate-700 text-white dark:bg-slate-600" : "text-slate-950 bg-slate-200 dark:bg-slate-800 dark:text-slate-600 "
                ].join(" ")}
              >
                {e}
              </button>
            ))
          }
        </div>
        <div className="flex flex-row items-center justify-center gap-1 flex-wrap">
          {
            [3, 4, 6, 7, 9, 10, 11].map(e => (
              <button 
                key={e}
                onClick={() => setMonth(p => {
                  const _ = e;
                  if(e === 4) {
                    if(p.includes(4) || p.includes(5)) return p.filter(v => v !== 4 && v !== 5);
                    return [...p, 4, 5];
                  }
                  if(p.includes(_)) return p.filter(v => v !== e);
                  return [...p, _];
                })}
                className={[
                  "px-4 h-8.5 text-sm rounded-xl transition-colors",
                  months.includes(e) ? "bg-slate-700 text-white dark:bg-slate-600 dark:text-slate-200" : "text-slate-950 bg-slate-200 dark:bg-slate-800 dark:text-slate-600 "
                ].join(" ")}
              >
                {e}월{e === 4 ? ", 5월" : ""}
              </button>
            ))
          }
        </div>
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          <select 
            className="px-4 h-8.5 text-sm rounded-xl transition-colors bg-slate-200  text-slate-950 dark:bg-slate-700 dark:text-white"
            onChange={e => setBeginYear(Number(e.target.value))}
            value={beginYear}
          >
            {
              Array.from({ length: new Date().getFullYear() - 2006 + 1 }, (_, i) => i + 2006).reverse().map(e => (
                <option key={e} value={e}>{e}년</option>
              ))
            }
          </select>
          <p className="text-slate-500 dark:text-slate-400 text-sm">~</p>
          <select
            className="px-4 h-8.5 text-sm rounded-xl transition-colors bg-slate-200  text-slate-950 dark:bg-slate-700 dark:text-white"
            onChange={e => setEndYear(Number(e.target.value))}
            value={endYear}
          >
            {
              Array.from({ length: new Date().getFullYear() - 2006 + 1 }, (_, i) => i + 2006).reverse().map(e => (
                <option key={e} value={e}>{e}년</option>
              ))
            }
          </select>
        </div>
      </div>
      <Link
        prefetch
        href={subjects.length && months.length && beginYear <= endYear ? "/search" : "/"}
        className={[
          "px-4 h-9 rounded-xl bg-slate-700 w-full dark:bg-slate-600 max-w-96 flex flex-row items-center justify-center gap-2 transition-opacity",
          subjects.length && months.length && beginYear <= endYear ? "" : "opacity-60 cursor-default"
        ].join(" ")}
      >
        <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="fill-white dark:fill-slate-200" d="M6.51924 12.6152C4.81157 12.6152 3.36541 12.023 2.18074 10.8385C0.996241 9.65383 0.403992 8.20767 0.403992 6.5C0.403992 4.79233 0.996241 3.34617 2.18074 2.1615C3.36541 0.977 4.81157 0.38475 6.51924 0.38475C8.22691 0.38475 9.67307 0.977 10.8577 2.1615C12.0422 3.34617 12.6345 4.79233 12.6345 6.5C12.6345 7.21417 12.5147 7.89625 12.275 8.54625C12.0352 9.19625 11.7152 9.76158 11.3152 10.2423L17.0692 15.9962C17.2077 16.1346 17.2786 16.3086 17.2817 16.5182C17.2849 16.7279 17.2141 16.9052 17.0692 17.05C16.9244 17.1948 16.7487 17.2673 16.5422 17.2673C16.3359 17.2673 16.1603 17.1948 16.0155 17.05L10.2615 11.296C9.76149 11.7088 9.18649 12.0319 8.53649 12.2653C7.88649 12.4986 7.21407 12.6152 6.51924 12.6152ZM6.51924 11.1155C7.80774 11.1155 8.89907 10.6683 9.79324 9.774C10.6876 8.87983 11.1347 7.7885 11.1347 6.5C11.1347 5.2115 10.6876 4.12017 9.79324 3.226C8.89907 2.33167 7.80774 1.8845 6.51924 1.8845C5.23074 1.8845 4.13941 2.33167 3.24524 3.226C2.35091 4.12017 1.90374 5.2115 1.90374 6.5C1.90374 7.7885 2.35091 8.87983 3.24524 9.774C4.13941 10.6683 5.23074 11.1155 6.51924 11.1155Z" />
        </svg>
        <p className="text-white text-sm dark:text-slate-200">검색하기</p>
      </Link>
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-slate-500 text-center">평가원 수능/수능모의평가는 시행년도로 검색해주세요.</p>
        <p className="text-sm text-slate-500 text-center">ex) {new Date().getFullYear() + 1}학년도 6평/9평/수능 {"->"} {new Date().getFullYear()}년 시행으로 검색</p>
      </div>
    </div>
  );
};

export default Search;