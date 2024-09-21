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
                  "border px-4 py-1.5 text-sm rounded-xl",
                  grade === e ? "bg-slate-700 text-slate-200" : "text-slate-950 bg-slate-200"
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
                  "border px-4 py-1.5 text-sm rounded-xl",
                  subjects.includes(e as Subject) ? "bg-slate-700 text-slate-200" : "text-slate-950 bg-slate-200"
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
                  "border px-4 py-1.5 text-sm rounded-xl",
                  months.includes(e) ? "bg-slate-700 text-slate-200" : "text-slate-950 bg-slate-200"
                ].join(" ")}
              >
                {e}월{e === 4 ? ", 5월" : ""}
              </button>
            ))
          }
        </div>
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          <select 
            className="border px-4 py-1.5 text-sm rounded-xl bg-slate-200 text-slate-950"
            onChange={e => setBeginYear(Number(e.target.value))}
            value={beginYear}
          >
            {
              Array.from({ length: new Date().getFullYear() - 2006 + 1 }, (_, i) => i + 2006).reverse().map(e => (
                <option key={e} value={e}>{e}년</option>
              ))
            }
          </select>
          <p className="text-slate-500 text-sm">~</p>
          <select
            className="border px-4 py-1.5 text-sm rounded-xl bg-slate-200 text-slate-950"
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
        href="/search"
        className="px-4 py-2 text-sm rounded-xl bg-slate-700 text-white w-full max-w-96 flex flex-row items-center justify-center gap-2"
      >검색하기</Link>
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm text-slate-500 text-center">평가원 수능/수능모의평가는 시행년도로 검색해주세요.</p>
        <p className="text-sm text-slate-500 text-center">ex) {new Date().getFullYear() + 1}학년도 6평/9평/수능 {"->"} {new Date().getFullYear()}년 시행으로 검색</p>
      </div>
    </div>
  );
};

export default Search;