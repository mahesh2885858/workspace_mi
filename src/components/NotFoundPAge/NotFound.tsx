import { Link } from "react-router-dom";
import "./notfound.scss";
const NotFound = () => {
  return (
    <div className="not-found-container">
      <p>The page you are looking for is NotFound</p>
      <p>
        Go To <Link to={`/`}>HOME</Link>
      </p>
    </div>
  );
};

export default NotFound;
