import { useParams } from "react-router-dom";

function DummyComp() {
  // useParams example
  const params = useParams();
  console.log(params); // { id: 'someValue' }

  return (
    <>
      <div>DummyComp</div>
      <h1>
        Dummy Component Works with url page id <strong>{params?.id}!</strong>
      </h1>
    </>
  );
}

export default DummyComp;
