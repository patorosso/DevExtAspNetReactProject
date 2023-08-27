import React from "react";
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Label,
  Format,
  Legend,
  Export,
} from "devextreme-react/chart";

const BarChartCustom = ({ barChartDataSource }) => {
  return (
    <div style={{ padding: "40px 20px" }}>
      <Chart
        dataSource={barChartDataSource}
        title="Asistencia Total vs Esperada"
        id="barChart"
        palette="Soft Pastel"
        size={{
          height: 300,
        }}
      >
        <CommonSeriesSettings
          argumentField="monthName"
          type="bar"
          hoverMode="allArgumentPoints"
          selectionMode="allArgumentPoints"
        >
          <Label visible={true}>
            <Format type="fixedPoint" />
          </Label>
        </CommonSeriesSettings>
        <Series valueField="totalAttendance" name="Total" />
        <Series valueField="expectedAttendance" name="Esperada" />
        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
        ></Legend>
        <Export enabled={true} />
      </Chart>
    </div>
  );
};

export default BarChartCustom;
