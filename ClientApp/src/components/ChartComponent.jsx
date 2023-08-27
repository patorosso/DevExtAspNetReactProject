import React from "react";
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
import DropDownButton from "devextreme-react/drop-down-button";
import { endpoint, getParamsForChart } from "../utils/requestLogic";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

const ChartComponent = () => {
  const valuesChart = [{ value: "quantity", name: "Cantidad" }];

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
    if (yearRef.current == e.itemData.year) return;

    yearRef.current = e.itemData.year;
    chartDataSource.reload();
  };

  return (
    <React.Fragment>
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
          <Series key={item.value} valueField={item.value} name={item.name} />
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
      <DropDownButton
        text="Selección año"
        icon="date"
        dataSource={dropdownStore}
        onItemClick={handleButtonClick}
        displayExpr="year"
        keyExpr="id"
      />
    </React.Fragment>
  );
};

export default ChartComponent;
