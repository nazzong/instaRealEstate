import React, { useEffect, useState } from "react";
import AD01Presenter from "./AD01Presenter";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_ACEEPTRECORD,
  GET_ACEEPTRECORD_BY_MONTH,
  GET_ACEEPTRECORD_BY_DATE,
  GET_ACCEPTRECORD_ALL_YEAR,
} from "./AD01Queries.js";

export default () => {
  ////////////// - USE STATE- ///////////////
  const [currentTab, setCurrentTab] = useState(0);
  const [yearCnt, setYearCnt] = useState(null);
  const [monthCnt, setMonthCnt] = useState(null);
  const [todayCnt, setTodayCnt] = useState(null);
  const [graph, setGraph] = useState(null);

  ////////////// - VARIABLE- ////////////////
  const currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;

  let currentDate = new Date().getDate();
  currentDate = currentDate < 10 ? "0" + currentDate : currentDate;

  ////////////// - USE QUERY- ///////////////
  const {
    data: yearData,
    loading: yearLoading,
    refetch: yearRefetch,
  } = useQuery(GET_ACEEPTRECORD, {
    variables: {
      currentYear: currentYear + "",
    },
  });

  const {
    data: monthData,
    loading: monthLoading,
    refetch: monthRefetch,
  } = useQuery(GET_ACEEPTRECORD_BY_MONTH, {
    variables: {
      currentMonth: currentYear + "" + currentMonth,
    },
  });

  const {
    data: dateData,
    loading: dateLoading,
    refetch: dateRefetch,
  } = useQuery(GET_ACEEPTRECORD_BY_DATE, {
    variables: {
      currentDate: currentYear + "" + currentMonth + "" + currentDate,
    },
  });

  if (!yearLoading) {
    if (yearCnt === null) {
      setYearCnt(yearData.getAcceptRecord.length);
    }
  }

  if (!monthLoading) {
    if (monthCnt === null) {
      setMonthCnt(monthData.getAcceptRecordByMonth.length);
    }
  }

  if (!dateLoading) {
    if (todayCnt === null) {
      setTodayCnt(dateData.getAcceptRecordByDate.length);
    }
  }

  const {
    data: allDatum,
    loading: allLoading,
    refetch: allRefetch,
  } = useQuery(GET_ACCEPTRECORD_ALL_YEAR, {
    variables: {
      year: currentYear + "",
    },
  });

  if (!allLoading) {
    let monthCnt1 = 0;
    let monthCnt2 = 0;
    let monthCnt3 = 0;
    let monthCnt4 = 0;
    let monthCnt5 = 0;
    let monthCnt6 = 0;
    let monthCnt7 = 0;
    let monthCnt8 = 0;
    let monthCnt9 = 0;
    let monthCnt10 = 0;
    let monthCnt11 = 0;
    let monthCnt12 = 0;

    if (graph === null) {
      allDatum.getAcceptRecrodAllYear.map((data) => {
        const regx1 = /202201.*/g;
        const regx2 = /202202.*/g;
        const regx3 = /202203.*/g;
        const regx4 = /202204.*/g;
        const regx5 = /202205.*/g;
        const regx6 = /202206.*/g;
        const regx7 = /202207.*/g;
        const regx8 = /202208.*/g;
        const regx9 = /202209.*/g;
        const regx10 = /202210.*/g;
        const regx11 = /202211.*/g;
        const regx12 = /202212.*/g;

        const flag1 = regx1.test(data.date);
        const flag2 = regx2.test(data.date);
        const flag3 = regx3.test(data.date);
        const flag4 = regx4.test(data.date);
        const flag5 = regx5.test(data.date);
        const flag6 = regx6.test(data.date);
        const flag7 = regx7.test(data.date);
        const flag8 = regx8.test(data.date);
        const flag9 = regx9.test(data.date);
        const flag10 = regx10.test(data.date);
        const flag11 = regx11.test(data.date);
        const flag12 = regx12.test(data.date);

        flag1 && monthCnt1++;
        flag2 && monthCnt2++;
        flag3 && monthCnt3++;
        flag4 && monthCnt4++;
        flag5 && monthCnt5++;
        flag6 && monthCnt6++;
        flag7 && monthCnt7++;
        flag8 && monthCnt8++;
        flag9 && monthCnt9++;
        flag10 && monthCnt10++;
        flag11 && monthCnt11++;
        flag12 && monthCnt12++;

        const totalCnt =
          monthCnt1 +
          monthCnt2 +
          monthCnt3 +
          monthCnt4 +
          monthCnt5 +
          monthCnt6 +
          monthCnt7 +
          monthCnt8 +
          monthCnt9 +
          monthCnt10 +
          monthCnt11 +
          monthCnt12;

        let arr = [
          monthCnt1,
          monthCnt2,
          monthCnt3,
          monthCnt4,
          monthCnt5,
          monthCnt6,
          monthCnt7,
          monthCnt8,
          monthCnt9,
          monthCnt10,
          monthCnt11,
          monthCnt12,
        ];

        setGraph(arr);
      });
    }
  }

  ///////////// - USE MUTATION- /////////////

  ///////////// - EVENT HANDLER- ////////////

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    yearRefetch();
    monthRefetch();
    dateRefetch();
    allRefetch();
  }, []);

  return (
    <AD01Presenter
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
      currentYear={currentYear}
      currentMonth={currentMonth}
      currentDate={currentDate}
      //
      yearCnt={yearCnt}
      monthCnt={monthCnt}
      todayCnt={todayCnt}
      //
      monthGraphDatum={graph && graph}
    />
  );
};
