import React from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Editing,
  Lookup,
} from "devextreme-react/data-grid";
import { endpoint, getParams } from "../utils/requestLogic";
import { createStore } from "devextreme-aspnet-data-nojquery";
import CustomStore from "devextreme/data/custom_store";

const store1 = createStore({
  key: "id",
  loadUrl: endpoint + "/Students/GetStudents",
  deleteUrl: endpoint + "/Students/DeleteStudent",
  insertUrl: endpoint + "/Students/InsertStudent",
  updateUrl: endpoint + "/Students/UpdateStudent",
});

const store = new CustomStore({
  key: "id",
  load: async (loadOptions) => {
    try {
      const response = await fetch(
        `${endpoint}/Students/GetStudents${getParams(loadOptions)}`
      );

      if (response.status != 200 && response.status != 204)
        throw new Error(
          `Error. Server responded with status: ${response.status}`
        );

      const students = await response.json();
      return {
        data: students.data,
        totalCount: students.totalCount,
        groupCount: students.groupCount,
        summary: null,
      };
    } catch (error) {
      console.log(error);
    }
  },
  insert: async (values) => {
    try {
      const response = await fetch(`${endpoint}/Students/InsertStudent/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.status != 200 && response.status != 204)
        throw new Error(`Server responded with status: ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  },
  update: async (key, values) => {
    try {
      const response = await fetch(
        `${endpoint}/Students/UpdateStudent/${key}`,
        {
          method: "PATCH", //PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.status !== 200 && response.status !== 204) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  },
  remove: async (key) => {
    try {
      const response = await fetch(
        `${endpoint}/Students/DeleteStudent/${key}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status != 200 && response.status != 204)
        throw new Error(`Server responded with status: ${response.status}`);
    } catch (error) {
      console.error(error);
    }
  },
});

const careersData = createStore({
  key: "id",
  loadUrl: endpoint + "/Students/CareerLookup",
});

const allowedPageSizes = [8, 12, 20];

const Students = () => {
  return (
    <React.Fragment>
      <DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
        />
        <Column dataField="name" dataType="string" />
        <Column dataField="careerId" caption="Career">
          <Lookup dataSource={careersData} valueExpr="id" displayExpr="title" />
        </Column>
        <Column dataField="dateOfBirth" dataType="date" />
        <Column dataField="enrollmentDate" dataType="date" />
        <Column dataField="hasGraduated" dataType="boolean" />
        <Column dataField="isActive" dataType="boolean" />
        <Paging defaultPageSize={12} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
        />
      </DataGrid>
    </React.Fragment>
  );
};

export default Students;
