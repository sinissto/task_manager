import ListTasks from "../components/ListTasks";
import "./styles.css";

const Home = () => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Tasks List
      </h1>

      <div className={"tasksList"}>
        <ListTasks />
      </div>
    </>
  );
};

export default Home;
