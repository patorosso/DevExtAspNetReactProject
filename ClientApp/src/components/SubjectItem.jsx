import React, { useRef } from "react";
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from "devextreme-react/chart";
import { TreeView } from "devextreme-react/tree-view";
import DropDownButton from "devextreme-react/drop-down-button";
import { endpoint, getParamsForChart } from "../utils/requestLogic";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

const SubjectItem = ({ treeDataSource }) => {
  const idRef = useRef("1");
  const yearRef = useRef(2023);
  const valuesChart = [{ value: "quantity", name: "Cantidad" }];

  const handleItemClick = (e) => {
    if (e.itemData.id && !e.itemData.id.includes("_")) return;

    //console.log(idRef.current, e.itemData.id);
    const idParts = e.itemData.id.split("_");
    const subjectId = idParts[idParts.length - 1];

    if (idRef.current === subjectId) return;

    idRef.current = subjectId;
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
    filter: ["Year", "=", yearRef.current],
  });

  const dropdownStore = new CustomStore({
    key: "id",
    load: async () => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetSubjectsAttendanceYearById/${idRef.current}`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const subjectsAttendanceYear = await response.json();
        return {
          data: subjectsAttendanceYear,
        };
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleButtonClick = (e) => {
    if (yearRef.current === e.itemData.year) return;

    yearRef.current = e.itemData.year;
    chartDataSource.reload();
  };

  console.log("child render");
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

        <div>
          <DropDownButton
            text="Selección año"
            icon="menu"
            dataSource={dropdownStore}
            onItemClick={handleButtonClick}
            displayExpr="year"
            keyExpr="id"
            style={{ marginLeft: 20 }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SubjectItem;
