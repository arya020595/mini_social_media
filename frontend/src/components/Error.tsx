import { Button } from "react-bootstrap";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const errorResponse: any = useRouteError();
  const location = useLocation();
  const currentPathname = location.pathname;
  let { message, error, statusCode } = errorResponse;
  if (!Array.isArray(message)) message = [message];

  console.log(message);

  const navigate = useNavigate();
  const handleRefresh = () => {
    navigate(currentPathname);
  };

  const titleCase = (str: string) => {
    let newStr = str
      .toLowerCase()
      .replace(/./, (x) => x.toUpperCase())
      .replace(/[^']\b\w/g, (y) => y.toUpperCase());

    return newStr;
  };

  const textPathname = titleCase(currentPathname.replace(/-/g, " ").slice(1));

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Error {statusCode}</h1>
      <pre>{error}</pre>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {message &&
          message.map((msg: string, index: number) => (
            <li key={index}>
              <b>{msg}</b>
            </li>
          ))}
      </ul>
      <p>Please fix the issues and try again.</p>
      <Button variant="secondary" onClick={handleRefresh}>
        Back to {textPathname}
      </Button>
    </div>
  );
}

export default Error;
