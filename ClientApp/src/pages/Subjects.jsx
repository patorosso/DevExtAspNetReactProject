import React, { useState, useEffect } from "react";
import TreeView from "devextreme-react/tree-view";
import { endpoint } from "../utils/requestLogic";
import TabPanel, { Item } from "devextreme-react/tab-panel";

const Subjects = () => {
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

  const [selectedAreaId, setSelectedAreaId] = useState(1);
  const [careerWithSubjects, setCareerWithSubjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetCareerTreeWithSubjects/${selectedAreaId}`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const careersWithSubjectsFetched = await response.json();
        setCareerWithSubjects(careersWithSubjectsFetched);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedAreaId]);

  const handleTitleClick = (e) => {
    setSelectedAreaId(e.itemData.areaId);
  };

  return (
    <React.Fragment>
      <TabPanel height={350} noDataText="" onTitleClick={handleTitleClick}>
        {careerAreas.map((area) => (
          <Item title={area.title} key={area.id} areaId={area.id}>
            {selectedAreaId !== null && (
              <TreeView
                id="treeview"
                width={300}
                dataSource={careerWithSubjects}
                style={{ marginTop: 20, marginLeft: 20 }}
              />
            )}
          </Item>
        ))}
      </TabPanel>
    </React.Fragment>
  );
};

export default Subjects;
