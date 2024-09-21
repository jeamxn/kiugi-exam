"use client";

import React from "react";

import { Subject, subjectMap } from "@/utils/getTests";

const Home = () => {
  // const find = await getTests({
  //   grade: 3,
  //   monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  //   subjList: ["과학탐구", "국어", "사회탐구", "수학", "영어", "제2외국어", "직업탐구", "한국사"],
  //   beginYear: 1000,
  //   endYear: 3000,
  // });
  const [grade, setGrade] = React.useState<number>(3);
  const [subjects, setSubject] = React.useState<Subject[]>([]);
  const [months, setMonth] = React.useState<number[]>([]);
  const [beginYear, setBeginYear] = React.useState<number>(new Date().getFullYear());
  const [endYear, setEndYear] = React.useState<number>(new Date().getFullYear());
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 px-2">
      <div className="flex flex-row items-center justify-center gap-2">
        <svg width="32" height="32" viewBox="0 0 208 211" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_147_2)">
            <path className="fill-slate-600" d="M0.5 123.608C0.5 121.667 1.63286 119.892 3.40017 119.089C41.1459 101.937 63.6364 101.921 101.675 119.093C103.448 119.893 104.587 121.672 104.587 123.617V169.496C104.587 173.152 100.786 175.572 97.4281 174.126C63.4256 159.474 41.6032 159.467 7.66255 174.118C4.3043 175.567 0.5 173.147 0.5 169.489V123.608Z" />
            <path className="fill-slate-600" d="M157.523 23.7148C159.206 24.7026 160.163 26.5911 159.949 28.5304C155.426 69.548 144.081 88.9242 110.333 113.122C108.743 114.262 106.62 114.35 104.932 113.36L66.1568 90.5943C63.0156 88.7501 62.8405 84.2688 65.7647 82.0968C95.3835 60.0965 106.415 41.3015 111.136 4.75645C111.603 1.14059 115.605 -0.895552 118.749 0.950352L157.523 23.7148Z" />
            <path className="fill-slate-600" d="M165.461 209.435C163.758 210.389 161.643 210.26 160.077 209.094C126.992 184.455 116.019 164.865 112.212 123.499C112.032 121.552 113.028 119.677 114.735 118.721L153.966 96.7582C157.145 94.9781 161.103 97.0932 161.498 100.716C165.498 137.405 176.131 156.428 205.261 178.979C208.143 181.209 207.877 185.689 204.697 187.469L165.461 209.435Z" />
          </g>
          <defs>
            <clipPath id="clip0_147_2">
              <rect width="208" height="211" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <p className="text-slate-600 font-semibold text-4xl">모의고사 키우기</p>
      </div>
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
        <form action="search" method="get" className="w-full flex flex-col items-center justify-center">
          <input type="hidden" name="grade" value={grade} />
          <input type="hidden" name="subjects" value={JSON.stringify(subjects)} />
          <input type="hidden" name="months" value={JSON.stringify(months)} />
          <input type="hidden" name="beginYear" value={beginYear} />
          <input type="hidden" name="endYear" value={endYear} />
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-xl bg-slate-700 text-white w-full max-w-96"
          >검색하기</button>
        </form>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm text-slate-500 text-center">평가원 수능/수능모의평가는 시행년도로 검색해주세요.</p>
          <p className="text-sm text-slate-500 text-center">ex) {new Date().getFullYear() + 1}학년도 6평/9평/수능 {"->"} {new Date().getFullYear()}년 시행으로 검색</p>
        </div>
      </div>
    </div>
  );
};

export default Home;