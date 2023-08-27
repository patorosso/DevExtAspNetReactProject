import React from "react";

const SplineChartCustom = () => {
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
        <Tooltip enabled={true} />
      </Chart>
    </React.Fragment>
  );
};

export default SplineChartCustom;
