import { appType } from "../Types/Types";

const getFilteredItems = (state: appType) => {
  // creting temporary object array to make working easy
  if (state.filteredEmployeeId) {
    const tempObjArr: { name: string; id: string; idm: string }[] = [];
    const modififedObj = state.employees.map((item) => {
      for (let i = 0; i < item.skills.length; i++) {
        const obj = item.skills[i];
        const newobj = { ...obj, idm: item.id };
        tempObjArr.push(newobj);
      }
      return false;
    });
    const filteredIds = tempObjArr.filter((item) => {
      if (item.id === state.filteredEmployeeId) {
        return item.idm;
      } else {
        return false;
      }
    });

    const newEmployee = state.employees.filter((employee) => {
      for (let i = 0; i < filteredIds.length; i++) {
        if (employee.id === filteredIds[i].idm) {
          return employee;
        }
      }
    });
    return newEmployee;
  } else {
    return state.employees;
  }
};

export default getFilteredItems;
