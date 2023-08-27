import React, { useRef } from "react";
import TabPanel from "devextreme-react/tab-panel";
import { endpoint } from "../utils/requestLogic";
import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";
import SubjectItem from "../components/SubjectItem";

const MemoizedSubjectItem = React.memo(SubjectItem);

const Subjects = () => {
  const areaRef = useRef(1);

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
    if (areaRef.current == e.itemData.id) return;

    areaRef.current = e.itemData.id;
    treeDataSource.reload();
  };

  return (
    <React.Fragment>
      <TabPanel
        height={750}
        dataSource={tabStore}
        onTitleClick={handleTitleClick}
        // causaba doble renderizado inline function
        itemComponent={(props) => (
          <MemoizedSubjectItem treeDataSource={treeDataSource} {...props} />
        )}
      />
    </React.Fragment>
  );
};

export default Subjects;
