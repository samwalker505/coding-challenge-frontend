import React from "react";
import currencyList from "./utils/currencyList";
import "flexboxgrid/css/flexboxgrid.min.css";
import Card from "./components/Card";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px;
`;
class App extends React.Component {
  render() {
    return (
      <Container>
        <header className="row">
          <h1 className="col-xs-12">Cryptocurrency Realtime Price</h1>
        </header>
        <main>
          <div className="row">
            {currencyList.infos.map(info => {
              return (
                <div
                  className="col-xs-12
                                col-sm-8
                                col-md-6
                                col-lg-4"
                >
                  <Card {...info} />
                </div>
              );
            })}
          </div>
        </main>
      </Container>
    );
  }
}

export default App;
