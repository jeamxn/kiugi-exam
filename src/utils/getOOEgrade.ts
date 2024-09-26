import axios from "axios";
import { load } from "cheerio";

import { getHeaders } from "./getHeader";
import { Subject } from "./getTests";

export const getOOEgrade = async (grade: number, subject: Subject, subSubject: string = "") => {
  const { data } = await axios.get("https://namu.wiki/w/%EC%A0%84%EA%B5%AD%EC%97%B0%ED%95%A9%ED%95%99%EB%A0%A5%ED%8F%89%EA%B0%80/%EB%93%B1%EA%B8%89%20%EA%B5%AC%EB%B6%84%EC%A0%90%EC%88%98", {
    headers: await getHeaders()
  });
  
  const $ = load(data);
  const table = $("table").map((i, el) => {
    const [gradeString, subjectString, subSubjectString] = $(el).find("tr > td > div > span").map((i, el) => {
      return $(el).text();
    }).get();
    if(!gradeString?.includes("전국연합학력평가") || !subjectString?.includes("영역") || !subSubjectString) {
      return null;
    }
    const thisGrade = gradeString.replace(/\D/g, "");
    const thisSubject = subjectString.split(" ")[0];
    const thisSubSubject = subSubjectString.includes("(") ? 
      subSubjectString.replace("(", "").replace(")", "").replace(/\s/g, "")
      : "";
    if(grade !== Number(thisGrade) || subject !== thisSubject || thisSubSubject !== subSubject.replace(/\s/g, "")) {
      return null;
    }
    return el;
  }).filter((i, el) => el !== null).get();

  if(table.length === 0) {
    const ret: string = await getOOEgrade(grade, subject, subSubject);
    return ret;
  }

  const _this = $(table[0]).find("dd > div > div > table");
  _this.find("*").each((i, el) => {
    const attrs = el.attribs;
    for(const key in attrs) {
      if(key === "colspan" || key === "rowspan") {
        continue;
      }
      delete attrs[key];
    }
    attrs.class = "grade-table";
  });
  _this.find("a").remove();
  const html = _this.html() || "";
  return html;
};
