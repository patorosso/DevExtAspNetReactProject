import React from "react";
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

const SplineChartCustom = ({ chartDataSource }) => {
  const valuesChart = [{ value: "quantity", name: "Cantidad" }];
  return (
    <React.Fragment>
      <Chart
        palette="Violet"
        dataSource={chartDataSource}
        title={`Asistencia`}
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
        <Tooltip enabled={true} />
      </Chart>
    </React.Fragment>
  );
};

export default SplineChartCustom;
