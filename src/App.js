import {
  Table,
  Row,
  Container,
  Col,
  Text,
  Spacer,
  Button,
  Grid,
  Card,
  Divider,
  Input,
  Radio,
} from "@nextui-org/react";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [checked, setChecked] = useState("");
  const [direction, setDirection] = useState(false);

  const getData = async () => {
    const res = await fetch(
      "https://openapi.debank.com/v1/user/token_list?id=" +
        address +
        "&is_all=true"
    );
    const answer = await res.json();
    setData(answer);
    setFiltered(answer);
  };

  useEffect(() => {
    // run every time name changes
    console.log(checked);
    if (checked === "") {
      setFiltered(data);
    } else {
      setFiltered(
        data
          .filter((info) => info.chain === checked)
          .map((filteredChain, index) => {
            return filteredChain;
          })
      );
    }
  }, [checked]);

  const sortName = function () {
    setDirection((prevDirection) => !prevDirection);
    setFiltered(
      filtered
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((filteredChain, i) => {
          return filteredChain;
        })
    );
    if (direction) {
      setFiltered(
        filtered.reverse().map((filteredChain, i) => {
          return filteredChain;
        })
      );
    }
  };

  const sortChain = function () {
    setDirection((prevDirection) => !prevDirection);
    setFiltered(
      filtered
        .sort((a, b) => a.chain.localeCompare(b.chain))
        .map((filteredChain, i) => {
          return filteredChain;
        })
    );
    if (direction) {
      setFiltered(
        filtered.reverse().map((filteredChain, i) => {
          return filteredChain;
        })
      );
    }
  };

  const sortAmount = function () {
    setDirection((prevDirection) => !prevDirection);
    setFiltered(
      filtered
        .sort((a, b) => (a.amount > b.amount ? 1 : -1))
        .map((filteredChain, i) => {
          return filteredChain;
        })
    );
    if (direction) {
      setFiltered(
        filtered.reverse().map((filteredChain, i) => {
          return filteredChain;
        })
      );
    }
  };

  const sortPrice = function () {
    setDirection((prevDirection) => !prevDirection);
    setFiltered(
      filtered
        .sort((a, b) => (a.price > b.price ? 1 : -1))
        .map((filteredChain, i) => {
          return filteredChain;
        })
    );
    if (direction) {
      setFiltered(
        filtered.reverse().map((filteredChain, i) => {
          return filteredChain;
        })
      );
    }
  };

  return (
    <Container gap={1}>
      <Grid.Container gap={4}>
        <Grid xs={12}>
          <Spacer x={1} />
          <Grid.Container justify="flex-start" alignItems="center">
            <Grid>
              <Text
                h1
                size={60}
                css={{
                  textGradient: "45deg, $blue600 -20%, $pink600 50%",
                }}
                weight="bold"
              >
                EPNS HIRING CHALLENGE: Question ID - 2.A
              </Text>
            </Grid>
          </Grid.Container>
        </Grid>
        <Spacer y={1} />
      </Grid.Container>
      <Row css={{ paddingBottom: 16 }} gap={1}>
        <Container>
          <Col span={12}>
            <Grid>
              <Card>
                <Card.Header>
                  <Text
                    b
                    h3
                    css={{
                      textGradient: "45deg, $purple600 -20%, $pink600 100%",
                    }}
                  >
                    Wallet Inspector with DeBankAPI
                  </Text>
                </Card.Header>
                <Divider />
                <Card.Body>
                  <Text>Enter wallet address:</Text>
                  <Grid.Container gap={1} justify="center">
                    <Grid xs={2}>
                      <Input
                        placeholder="paste your wallet adress here"
                        width="340px"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                      />
                    </Grid>
                    <Grid xs={10}>
                      <Button onClick={getData}>Search</Button>
                    </Grid>
                  </Grid.Container>
                </Card.Body>
                <Divider />
                <Spacer y={1} />
                <Row justify="flex-end" gap={-2}>
                  <Radio.Group
                    orientation="horizontal"
                    label="Filter by Chain:"
                    defaultValue=""
                    size="sm"
                    value={checked}
                    onChange={setChecked}
                  >
                    <Radio value="" color="primary">
                      all
                    </Radio>
                    <Radio value="eth" color="primary">
                      eth
                    </Radio>
                    <Radio value="avax" color="primary">
                      avax
                    </Radio>
                    <Radio value="matic" color="primary">
                      matic
                    </Radio>
                  </Radio.Group>
                </Row>
                <Table
                  aria-label="Example table with static content"
                  css={{
                    height: "auto",
                    minWidth: "100%",
                  }}
                >
                  <Table.Header>
                    <Table.Column
                      css={{
                        width: "25%",
                      }}
                    >
                      <span onClick={sortName}>NAME</span>
                    </Table.Column>
                    <Table.Column
                      css={{
                        width: "25%",
                      }}
                    >
                      <span onClick={sortAmount}>AMOUNT</span>
                    </Table.Column>
                    <Table.Column
                      css={{
                        width: "25%",
                      }}
                    >
                      <span onClick={sortChain}>CHAIN</span>
                    </Table.Column>
                    <Table.Column
                      css={{
                        width: "25%",
                      }}
                    >
                      <span onClick={sortPrice}>PRICE</span>
                    </Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {filtered.map((filteredChain, index) => {
                      return (
                        <Table.Row key={filteredChain.id}>
                          <Table.Cell>{filteredChain.name}</Table.Cell>
                          <Table.Cell>
                            {filteredChain.amount.toFixed(5)}
                          </Table.Cell>
                          <Table.Cell>{filteredChain.chain}</Table.Cell>
                          <Table.Cell>
                            {filteredChain.price.toFixed(5)}
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
                <Card.Footer>
                  <Row justify="flex-end">
                    <Text>© Luc Jonkers 2022</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          </Col>
        </Container>
      </Row>
    </Container>
  );
}
export default App;
