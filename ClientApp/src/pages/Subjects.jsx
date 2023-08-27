import React, { useState, useEffect, useRef } from "react";
import TreeView from "devextreme-react/tree-view";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import DropDownButton from "devextreme-react/drop-down-button";
import { endpoint, getParamsForChart } from "../utils/requestLogic";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import {
  Chart,
  Series,
  ArgumentAxis,
  ValueAxis,
  CommonSeriesSettings,
  CommonAxisSettings,
  Grid,
  Export,
  Legend,
  Margin,
  Tooltip,
  Label,
  Format,
} from "devextreme-react/chart";

const Subjects = () => {
  const idRef = useRef("1");
  const yearRef = useRef(2023);
  const areaRef = useRef(1);
  const valuesChart = [{ value: "quantity", name: "Cantidad" }];

  const tabStore = new CustomStore({
    key: "id",
    load: async (loadOptions) => {
      try {
        const response = await fetch(`${endpoint}/Careers/CareerAreas`);

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const careerAreas = await response.json();
        return {
          data: careerAreas,
        };
      } catch (error) {
        console.log(error);
      }
    },
  });

  const treeStore = new CustomStore({
    key: "id",
    load: async (loadOptions) => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetCareerTreeWithSubjects/${areaRef.current}`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const treeSubjects = await response.json();
        return {
          data: treeSubjects,
        };
      } catch (error) {
        console.log(error);
      }
    },
  });

  const treeDataSource = new DataSource({
    store: treeStore,
  });

  const handleTitleClick = (e) => {
    if (areaRef.current == e.itemData.areaId) return;

    areaRef.current = e.itemData.areaId;
    treeDataSource.reload();
  };

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

  return (
    <React.Fragment>
      <TabPanel
        height={750}
        dataSource={tabStore}
        onTitleClick={handleTitleClick}
        itemComponent={() => {
          return <Home />;
        }}
      />
      {careerAreas.map((area) => (
        <Item title={area.title} key={area.id} areaId={area.id}>
          <div style={{ display: "flex" }}>
            <TreeView
              id="treeview"
              width={300}
              dataSource={treeDataSource}
              style={{ marginTop: 20, marginLeft: 20 }}
              onItemClick={handleItemClick}
            />
            <Chart
              palette="Violet"
              dataSource={chartDataSource}
              title={`Asistencia de estudiantes en ${yearRef.current}`}
              style={{ marginTop: 20, marginLeft: 20, padding: 5 }}
              size={{
                height: 400,
                width: 1000,
              }}
            >
              <CommonSeriesSettings argumentField="attendanceDate" />
              <CommonAxisSettings>
                <Grid visible={true} />
              </CommonAxisSettings>
              {valuesChart.map((item) => (
                <Series
                  key={item.value}
                  valueField={item.value}
                  name={item.name}
                />
              ))}
              <Margin bottom={20} />
              <ArgumentAxis allowDecimals={false} axisDivisionFactor={10}>
                <Label>
                  <Format type="decimal" />
                </Label>
              </ArgumentAxis>
              <ValueAxis
                name="qty"
                position="left"
                tickInterval={20}
                showZero={true}
              />
              <Legend verticalAlignment="top" horizontalAlignment="right" />
              <Export enabled={true} />
              <Tooltip enabled={true} />
            </Chart>
          </div>
          <DropDownButton
            text="Selección año"
            icon="date"
            dataSource={dropdownStore}
            onItemClick={handleButtonClick}
            displayExpr="year"
            keyExpr="id"
          />
        </Item>
      ))}
    </React.Fragment>
  );
};

export default Subjects;
