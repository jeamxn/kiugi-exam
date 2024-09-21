import axios from "axios";
import { load } from "cheerio";

export const subjectMap = {
  "국어": 1,
  "수학": 2,
  "영어": 3,
  "한국사": 4,
  "사회탐구": 5,
  "과학탐구": 6,
  "직업탐구": 7,
  "제2외국어": 8,
};
export type Subject = keyof typeof subjectMap;

export type Test = {
  grade: number;
  monthList: number[];
  subjList: Subject[];
  beginYear: number;
  endYear: number;
  page?: number;
};

export type TestResponse = {
  title: string;
  buttons: {
    label: string;
    url: string;
  }[]
};

export const getTests = async ({
  grade,
  monthList,
  subjList,
  beginYear,
  endYear,
  page = 1,
}: Test) => {
  const response = await axios.post(
    "https://www.ebsi.co.kr/ebs/xip/xipc/previousPaperListAjax.ajax",
    new URLSearchParams([
      ["targetCd", `D${grade}00`],
      ["monthList", monthList.map(p => String(p).padStart(2, "0")).join(",")],
      ["subjList", subjList.map(p => String(subjectMap[p])).join(",")],
      ["sort", "recent"],
      ["beginYear", String(beginYear)],
      ["endYear", String(endYear)],
      ["pageSize", "100"],
      ["currentPage", String(page)],
    ])
  );
  const $ = load(response.data);
  const rowsLength = $("#pagingForm > div.board_qusesion > ul > li").length;
  const json: any[] = [];
  for(let i = 1; i <= rowsLength; i++) {
    const rows = $(`#pagingForm > div.board_qusesion > ul > li:nth-child(${i})`)[0];
    const buttons = $(rows).find(".btn_L_col2").map((_, button) => {
      const label = $(button).text().replace(/\s+/g, " ").trim();
      const link = $(button).attr("onclick")?.split("'")[1];
      return {
        label,
        url: link?.includes("://") ? link : `https://wdown.ebsi.co.kr/W61001/01exam${link}`,
      };
    }).get();
    json.push({
      title: $(rows).find(".tit").text().replace(/\s+/g, " ").trim(),
      buttons,
    });
  }
  return json as TestResponse[];
};
