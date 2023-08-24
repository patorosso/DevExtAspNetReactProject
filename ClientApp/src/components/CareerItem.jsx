import React from "react";
import PieChartCustom from "../components/PieChartCustom";

const CareerItem = ({ areaId }) => {
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 60,
        }}
      >
        <PieChartCustom
          title="Current Students"
          httpAction={`CareersCurrentStudents/${areaId}`}
          color="Material"
        />
        <PieChartCustom
          title="Historic Students"
          httpAction={`CareersHistoricStudents/${areaId}`}
          color="Pastel"
        />
      </div>
    </React.Fragment>
  );
};

export default CareerItem;
