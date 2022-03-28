import { AppState } from "../../App";
import helpToGetTheSkilledEmployees from "../helper/matchObjects";
type actionType = {
  type: string;
  payload: string;
};
const Reducer = (
  state: typeof AppState,
  action: actionType
): typeof AppState => {
  switch (action.type) {
    case "SELECT_JOB":
      return { ...state, project: action.payload };
    case "GET_SKILLED_EMPLOYES":
      const result = helpToGetTheSkilledEmployees(action.payload, state);
      console.log(result);
      return state;
    default:
      return state;
  }
};
export default Reducer;
