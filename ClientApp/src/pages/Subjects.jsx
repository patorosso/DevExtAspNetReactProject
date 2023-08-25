import React, { useState, useEffect } from "react";
import TreeView from "devextreme-react/tree-view";
import { endpoint } from "../utils/requestLogic";
import TabPanel, { Item } from "devextreme-react/tab-panel";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(
  //           `${endpoint}/Subjects/GetSubjectsTreeWithCareers`
  //         );

  //         if (response.status !== 200 && response.status !== 204)
  //           throw new Error(
  //             `Error. Server responded with status: ${response.status}`
  //           );

  //         const subjectsFetched = await response.json();
  //         setSubjects(subjectsFetched);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const [careersWithSubjects, setCareersWithSubjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${endpoint}/Subjects/GetCareerTreeWithSubjects`
        );

        if (response.status !== 200 && response.status !== 204)
          throw new Error(
            `Error. Server responded with status: ${response.status}`
          );

        const careersWithSubjectsFetched = await response.json();
        setCareersWithSubjects(careersWithSubjectsFetched);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <TabPanel height={600} noDataText="">
        {careersWithSubjects.map((area) => (
          <Item title={area.title} key={area.title}>
            <TreeView
              id="treeview"
              width={300}
              dataSource={careersWithSubjects}
            />
          </Item>
        ))}
      </TabPanel>
    </React.Fragment>
  );
};

export default Subjects;
