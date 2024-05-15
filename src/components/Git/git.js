import GitHubCalendar from "react-github-calendar";

function Github() {
  return (
    <div
      style={{
        justifyContent: "center",
        paddingBottom: "10px",
        marginTop: "10rem",
      }}
      id="stats"
    >
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I Code
      </h1>
      <GitHubCalendar
        username="Zeeshan6871"
        blockSize={15}
        blockMargin={5}
        fontSize={16}
        color="#c084f5"
        style={{ color: "#4284c7" }}
      />
    </div>
  );
}

export default Github;
