import React, { useState, useEffect } from "react";
import CareerItem from "../components/CareerItem";
import TabPanel, { Item } from "devextreme-react/tab-panel";
import { endpoint } from "../utils/requestLogic";

const Careers = () => {
  const [careerAreas, setCareerAreas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${endpoint}/Careers/CareerAreas`);

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const careerAreasFetched = await response.json();
        setCareerAreas(careerAreasFetched);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <TabPanel height={600} noDataText="">
        {careerAreas.map((area) => (
          <Item title={area.title} key={area.title}>
            <CareerItem areaId={area.id} />
          </Item>
        ))}
      </TabPanel>
    </React.Fragment>
  );
};

export default Careers;
