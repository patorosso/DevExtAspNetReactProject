import React, { useRef, useState } from "react";
import { TreeView } from "devextreme-react/tree-view";
//import DropDownButton from "devextreme-react/drop-down-button";
import { endpoint, getParamsForChart } from "../utils/requestLogic";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import SplineChartCustom from "./SplineChartCustom";
import BarChartCustom from "./BarChartCustom";

const SubjectItem = ({ treeDataSource }) => {
  const idRef = useRef(null);
  //const yearRef = useRef(2023);

  const handleItemClick = (e) => {
    if (e.itemData.id && !e.itemData.id.includes("_")) return;

    const idParts = e.itemData.id.split("_");
    const subjectId = idParts[idParts.length - 1];

    if (idRef.current === subjectId) return;

    idRef.current = subjectId;
    barChartDataSource.reload();
    chartDataSource.reload();
  };

  const chartStore = new CustomStore({
    key: "id",
    load: async (loadOptions) => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetSubjectsAttendanceById/${
            idRef.current
          }${getParamsForChart(loadOptions)}`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const subjectsAttendance = await response.json();
        return {
          data: subjectsAttendance.data,
        };
      } catch (error) {
        console.log(error);
      }
    },
  });

  const chartDataSource = new DataSource({
    store: chartStore,
    //filter: ["Year", "=", yearRef.current],
  });

  const barChartStore = new CustomStore({
    key: "id",
    load: async (loadOptions) => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetTotalAndExpectedAttendanceById/${idRef.current}`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const subjectsAttendance = await response.json();
        return subjectsAttendance;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const barChartDataSource = new DataSource({
    store: barChartStore,
  });

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <TreeView
          id="treeview"
          width={300}
          dataSource={treeDataSource}
          style={{ marginTop: 70, marginLeft: 20 }}
          onItemClick={handleItemClick}
        />
        <SplineChartCustom chartDataSource={chartDataSource} />
      </div>
      <BarChartCustom barChartDataSource={barChartDataSource} />
    </React.Fragment>
  );
};

export default SubjectItem;
