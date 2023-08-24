import React, { useEffect, useState } from "react";
import PieChart, {
  Legend,
  Export,
  Series,
  Label,
  Font,
  Connector,
} from "devextreme-react/pie-chart";
import { endpoint } from "../utils/requestLogic";

const PieChartCustom = ({ httpAction, title, color }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}/Careers/${httpAction}`);

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <PieChart
        id="pie"
        palette={color}
        dataSource={data}
        title={title}
        size={{ height: 500, width: 500 }}
      >
        <Legend
          orientation="horizontal"
          itemTextPosition="right"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          columnCount={4}
        />
        <Export enabled={true} />
        <Series argumentField="title" valueField="quantity">
          <Label visible={true} position="columns">
            <Font size={16} />
            <Connector visible={true} width={0.5} />
          </Label>
        </Series>
      </PieChart>
    </React.Fragment>
  );
};

export default PieChartCustom;
