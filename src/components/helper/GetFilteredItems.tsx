import { appType } from "../../App";

const getFilteredItems = (state: appType) => {
  // creting temporary object array to make working easy
  if (state.filteredEmployeeId) {
    const tempObjArr: { name: string; id: string; idm: string }[] = [];
    const modififedObj = state.employeesWeUse.map((item) => {
      for (let i = 0; i < item.skills.length; i++) {
        const obj = item.skills[i];
        const newobj = { ...obj, idm: item.id };
        tempObjArr.push(newobj);
      }
      return;
    });
    const filteredIds = tempObjArr.filter((item) => {
      if (item.id === state.filteredEmployeeId) {
        return item.idm;
      }
    });

    const newEmployee = state.employeesWeUse.filter((employee) => {
      for (let i = 0; i < filteredIds.length; i++) {
        if (employee.id === filteredIds[i].idm) {
          return employee;
        }
      }
    });

    return newEmployee;
  } else {
    return state.employeesWeUse;
  }
};

export default getFilteredItems;
