import { useState } from "react";
import styled from "styled-components";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <Wrapper className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>{" "}
      </Wrapper>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
