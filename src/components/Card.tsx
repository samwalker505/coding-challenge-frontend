import React from "react";
import styled from "styled-components";
import { CurrencyInfo } from "../types/CurrencyInfo";
import * as api from "../utils/api";

const CardContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  margin: 5px 0;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #eaa943;
  margin-bottom: 20px;
`;

const LowerInfoGroup = styled.div``;
const Group = styled.div``;
const LowerInfoTitle = styled.div`
  color: #333;
  margin-bottom: 5px;
`;
const Volume = styled.div`
  color: #333;
  font-weight: lighter;
`;

const Change = styled.div<{ sign: string }>`
  color: ${props => (props.sign === "-" ? "#ff6b66" : "#9bd554")};
`;

class Card extends React.Component<
  { name: string; keyPair: string },
  { currencyInfo: CurrencyInfo }
> {
  state = {
    currencyInfo: {
      ticker: {
        base: "N/A",
        price: "N/A",
        target: "N/A",
        volume: "N/A",
        change: "N/A"
      },
      timestamp: 0,
      success: false,
      error: ""
    }
  };
  componentWillMount() {
    const { keyPair } = this.props;
    this.updateInfo(keyPair);
    setInterval(() => this.updateInfo(keyPair), 30000);
  }

  updateInfo = (keyPair: string) => {
    console.log(`${keyPair} update at: ${new Date()}`);
    api
      .getCurrencyInfo(keyPair)
      .then(currencyInfo => {
        this.setState({ currencyInfo });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { name } = this.props;
    const { currencyInfo } = this.state;
    return (
      <CardContainer>
        <Title>{name}</Title>
        <Price>{currencyInfo.ticker.price}</Price>
        <LowerInfoGroup className="row">
          <Group className="col-xs-6">
            <LowerInfoTitle>volume:</LowerInfoTitle>
            <Volume>{currencyInfo.ticker.volume || "-"}</Volume>
          </Group>
          <Group className="col-xs-6">
            <LowerInfoTitle>change:</LowerInfoTitle>
            <Change sign={currencyInfo.ticker.change[0]}>
              {currencyInfo.ticker.change}
            </Change>
          </Group>
        </LowerInfoGroup>
      </CardContainer>
    );
  }
}

export default Card;
