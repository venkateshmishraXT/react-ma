import { Flex, Grid, GridItem, SimpleGrid, Box, Heading, HStack, Spacer, Text, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer} from "@chakra-ui/react";
import { Link, useSearchParams } from "react-router-dom";
import CryptocurrencyItem from "./CryptocurrencyItem";
import Footer from "./Footer";
import Statistics from "./Statistics";
import { fetchGoals } from "../services/bot";
import {useState, useEffect} from "react";
import BarChart from "./Bar";
import LinearChart from "./Chart";

export default function Dashboard() {
  const [simply, setSimply] = useState<boolean>(true);
  const [isChatBotRequestStarted, setIsChatBotRequestStarted] = useState<boolean>(true);
  const [insightData, setInsightData] = useState([]);
  const [goalsData, setGoalsData] = useState([]);
  const [searchParams] = useSearchParams();
  //const { isFetching, data: cryptos } = useGetCryptocurrenciesQuery(simply ? 10 : 100)
  const userId = searchParams.get('userId');

  const userQueryGoal = `For Customer with ID ${userId} generate how other customers in similar segment have perfomed on their golas and then recommend the goals to customer he should keep for next year and also recommend products to meet the recommended goals`;
  const userQueryInsight = `Generate insights for CustomerId ${userId} investment portfolio with that includes his customer record data, transaction behaviour and his financial goals`;
  //const userQueryGoal = `For Customer with ID ${userId} generate how other customers in similar segment have perfomed on there goals and then recommend the goals to customer he should keep for next year`;
  //const userQueryInsight = `Generate insights for Customer with ID ${userId} investment portfolio  with his profile, transaction behaviour and  his financial goals`;
  useEffect(() => {
    getGoalsData();
    getInsightData();
  }, [])

  const getGoalsData = async () => {
    //const dummyResponse = "{\"customer_id\": 5250,\"customer_name\": \"John Doe\",\"segment_performance\": {\"segment_name\": \"High Net Worth Investors\",\"goal_performance\": [{\"goal\":\"Investment Growth\",\"success_rate\": 82,\"average_progress\": 85},{\"goal\":\"Retirement Savings\",\"success_rate\": 90,\"average_progress\": 90},{\"goal\":\"Emergency Fund\",\"success_rate\": 70,\"average_progress\": 65}]},\"recommended_goals_next_year\":[{\"goal\":\"Investment Growth\",\"recommended_amount\": 20000,\"description\": \"Invest in high-yield bonds and stocks for potential growth.\"},{\"goal\":\"Retirement Savings\",\"recommended_amount\": 15000,\"description\": \"Increase contributions to your 401(k) or IRA for better future security.\"},{\"goal\":\"Emergency Fund\",\"recommended_amount\": 10000,\"description\": \"Boost your emergency fund to cover at least six months of living expenses.\"}],\"available_investment_products\": [{\"name\": \"High Yield Bond\",\"recommended_allocation\": 0.60,\"recommended_amount\": 30000,\"description\": \"Offers higher returns but comes with higher risk.\"},{\"name\": \"401(k) or IRA\",\"recommended_allocation\": 0.30,\"recommended_amount\": 15000,\"description\": \"Tax-advantaged retirement savings account.\"},{\"name\": \"Savings Account\",\"recommended_allocation\": 0.10,\"recommended_amount\": 5000,\"description\": \"Safe and liquid savings for emergencies.\"}]}";
    setGoalsData(await getLLMData(userQueryGoal, "Goal"));
    //const unescapedApiResponse = dummyResponse?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
    //const validatedResponse = JSON.parse(unescapedApiResponse);
    //setGoalsData(validatedResponse);
    //setIsChatBotRequestStarted(false);
  }

  const getInsightData = async () => {
    //const dummyResponseInsight = "{\"customer_id\":5250,\"InsightSummary\":\"Customer 5250 has a moderately diverse investment portfolio, with a preference for Stocks and Mutual Funds. This individual shows a medium risk tolerance, indicating a balanced portfolio strategy. Their transactional behavior suggests a regular inflow and outflow of funds, which could signify active portfolio management. Despite regular transactions, there are a couple of financial goals that are yet unmet, suggesting the need for portfolio optimization.\",\"investment_portfolio_timeseries\":[{\"month\":\"January\",\"transactions\":[{\"type\":\"Inflow\",\"amount\":5000},{\"type\":\"Outflow\",\"amount\":2000}]},{\"month\":\"February\",\"transactions\":[{\"type\":\"Inflow\",\"amount\":6000},{\"type\":\"Outflow\",\"amount\":2500}]}],\"financial_goals_status\":{\"met_goals\":3,\"met_goals_description\":[\"Retirement savings\",\"Emergency fund\",\"Children's education fund\"],\"unmet_goals\":2,\"unmet_goals_description\":[\"Homeownership\",\"Travel fund\"]},\"customer_profile\":{\"name\":\"John Doe\",\"age\":35,\"risk_tolerance\":\"Medium\",\"investment_preferences\":[\"Stocks\",\"Mutual Funds\"],\"Recommendation\":\"To meet the unmet financial goals, it is suggested to diversify the portfolio by incorporating more low-risk investment vehicles such as bonds or government securities. This would complement the medium risk tolerance, while potentially providing stable returns that could help in achieving the unmet financial goals.\"}}";
    setInsightData(await getLLMData(userQueryInsight, "Insight"));
    //const unescapedApiResponse = dummyResponseInsight?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
    //const validatedResponse = JSON.parse(unescapedApiResponse);
    //setInsightData(validatedResponse);
  }

  const getLLMData = async (newMessage: string, component: string) => {
    try {
      const response = await fetchGoals(
        newMessage,
        "user",
        component
      );

      //const dummyResponse = "{\"customer_id\": 5250,\"customer_name\": \"John Doe\",\"segment_performance\": {\"segment_name\": \"High Net Worth Investors\",\"goal_performance\": [{\"goal\":\"Investment Growth\",\"success_rate\": 82,\"average_progress\": 85},{\"goal\":\"Retirement Savings\",\"success_rate\": 90,\"average_progress\": 90},{\"goal\":\"Emergency Fund\",\"success_rate\": 70,\"average_progress\": 65}]},\"recommended_goals_next_year\":[{\"goal\":\"Investment Growth\",\"recommended_amount\": 20000,\"description\": \"Invest in high-yield bonds and stocks for potential growth.\"},{\"goal\":\"Retirement Savings\",\"recommended_amount\": 15000,\"description\": \"Increase contributions to your 401(k) or IRA for better future security.\"},{\"goal\":\"Emergency Fund\",\"recommended_amount\": 10000,\"description\": \"Boost your emergency fund to cover at least six months of living expenses.\"}],\"available_investment_products\": [{\"name\": \"High Yield Bond\",\"recommended_allocation\": 0.60,\"recommended_amount\": 30000,\"description\": \"Offers higher returns but comes with higher risk.\"},{\"name\": \"401(k) or IRA\",\"recommended_allocation\": 0.30,\"recommended_amount\": 15000,\"description\": \"Tax-advantaged retirement savings account.\"},{\"name\": \"Savings Account\",\"recommended_allocation\": 0.10,\"recommended_amount\": 5000,\"description\": \"Safe and liquid savings for emergencies.\"}]}";
      //const dummyResponseInsight = "{\"customer_id\":5250,\"summary\":\"Customer 5250 has a moderately diverse investment portfolio, with a preference for Stocks and Mutual Funds. This individual shows a medium risk tolerance, indicating a balanced portfolio strategy. Their transactional behavior suggests a regular inflow and outflow of funds, which could signify active portfolio management. Despite regular transactions, there are a couple of financial goals that are yet unmet, suggesting the need for portfolio optimization.\",\"investment_portfolio_timeseries\":[{\"month\":\"January\",\"transactions\":[{\"type\":\"Inflow\",\"amount\":5000},{\"type\":\"Outflow\",\"amount\":2000}]},{\"month\":\"February\",\"transactions\":[{\"type\":\"Inflow\",\"amount\":6000},{\"type\":\"Outflow\",\"amount\":2500}]}],\"financial_goals_status\":{\"met_goals\":3,\"met_goals_description\":[\"Retirement savings\",\"Emergency fund\",\"Children's education fund\"],\"unmet_goals\":2,\"unmet_goals_description\":[\"Homeownership\",\"Travel fund\"]},\"customer_profile\":{\"name\":\"John Doe\",\"age\":35,\"risk_tolerance\":\"Medium\",\"investment_preferences\":[\"Stocks\",\"Mutual Funds\"],\"Recommendation\":\"To meet the unmet financial goals, it is suggested to diversify the portfolio by incorporating more low-risk investment vehicles such as bonds or government securities. This would complement the medium risk tolerance, while potentially providing stable returns that could help in achieving the unmet financial goals.\"}}";
      const botResponse = response?.data.choices[0].message.content;
      //const botResponse = dummyResponse;
      const unescapedApiResponse = botResponse?.replace(/\\"/g, '"').replace(/\\n/g, '\n');
      const validatedResponse = JSON.parse(unescapedApiResponse);
      console.log('response from bot' + JSON.stringify(validatedResponse));
      setIsChatBotRequestStarted(false);
      return validatedResponse;
    } catch (error) {
      console.error("API request error for Goals:", error);
    }
  };

  // const { customer_id, customer_name, segment_performance } = goalsData || {};
  // const {customer_id, customer_name, segment_performance, recommended_goals_next_year, available_investment_products} = goalsData || {};

  if (isChatBotRequestStarted) return <Text>Loading...</Text>
  const customer_profile = insightData?.customer_profile;
  const segment_performance = goalsData?.segment_performance;
  const insight_summary = insightData?.InsightSummary;
  const investment_portfolio = insightData?.investment_portfolio_timeseries;
  const financial_goals_status = insightData?.financial_goals_status;
  const available_investment_products = goalsData?.available_investment_products;
  const recommended_goals_next_year = goalsData?.recommended_goals_next_year;

  return (
    <Flex w={"100%"} flexDir={"column"}>
      <Flex p={5} flexDir={"column"}>
        <Grid p={2} display={"flex"} marginLeft={"auto"}>
          {(goalsData ?
            (<><img alt="user" src="src/assets/user_icon.svg" /><Text lineHeight={2.5}>{goalsData.customer_name ? goalsData.customer_name : 'xxxxx'}</Text></>)
            : ""
          )}
        </Grid>
        <Heading as='h2' fontWeight={"medium"} size={"md"}>Customer investment portfolio Insights</Heading>
        <Spacer marginBottom={5} />
        <Grid
          minHeight='200px'
          templateColumns='repeat(5, 1fr)'
          gap={4}
          m={3}
        >
            <GridItem colSpan={1}>
              <Text><strong>Name: </strong>{customer_profile?.name}</Text>
              <Text><strong>Age: </strong>{customer_profile?.age}</Text>
              <Text><strong>Risk Tolerance: </strong>{customer_profile?.risk_tolerance}</Text>
              <Text><strong>Investment Preferences: </strong>{customer_profile?.investment_preferences}</Text>
              <Text><strong>Investment Preferences: </strong>{customer_profile?.investment_preferences}</Text>
            </GridItem>
            <GridItem colSpan={2}>
              {(investment_portfolio ?
                <LinearChart chartData={investment_portfolio} />
                : ""
              )}
            </GridItem>
            <GridItem colSpan={2}> 
              {/* <BarChart chartData={financial_goals_status} /> */}
            </GridItem>
        </Grid>
        <Grid m={3}>
          <GridItem colSpan={2}>
            <Heading as='h3' mb='12px' fontWeight={"medium"} size={"sm"}>Insight Summary</Heading>
            {(insight_summary ?
              <Text>{insight_summary}</Text>
              : ""
            )}
          </GridItem>
        </Grid>
        {/* <Grid p={6} gap={5} templateColumns={['repeat(2,1fr)', 'repeat(3, 1fr)']}>
          <Statistics title="Total Goals" value={10} />
          <Statistics title="Total Exchanges" value={300} />
          <Statistics title="Total Market Cap" value={100000} />
          <Statistics title="Total 24h Volume" value={5} />
          <Statistics title="Total Markets" value={2} />
        </Grid> */}

        <HStack flexDirection={"column"} alignItems={"start"} mt={3}>
          <Heading as='h2' fontWeight={"medium"} size={"md"}>{segment_performance?.segment_name}</Heading>
          <Spacer />
          {/* <Text display={"block"}>{goalsData}</Text> */}
          {/* <Link to={"/"}>
            <Heading onClick={() => setSimply(!simply)} color={"lightblue"} size={"md"} _hover={{ textDecor: 'underline' }}>{simply ? "Show More" : "Show Less"}</Heading>
          </Link> */}
        </HStack>

        <SimpleGrid columns={2} spacing={10} m={2}>
          <Box height='300'>
            <Heading as='h3' fontWeight={"medium"} size={"sm"}>Success Rate</Heading>
            <Spacer />
            <BarChart chartData={segment_performance?.goal_performance} />
          </Box>
          <Box minHeight='150'>
            <Heading as='h3' fontWeight={"medium"} size={"sm"}>Recommended Goals</Heading>
            <Spacer />
            <TableContainer whiteSpace='wrap'>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Goal Type</Th>
                    <Th>Description</Th>
                    <Th isNumeric>Recommended Amount</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {recommended_goals_next_year.map((goal, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{goal.goal}</Td>
                        <Td>{goal.description}</Td>
                        <Td isNumeric>{goal.recommended_amount}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box minHeight='150'>
            <Heading as='h3' fontWeight={"medium"} size={"sm"}>Recommended Products</Heading>
            <Spacer />
            <TableContainer whiteSpace='wrap'>
              <Table variant='striped' colorScheme='gray'>
                <Thead>
                  <Tr>
                    <Th>Product Name</Th>
                    <Th>Allocation Ratio</Th>
                    <Th>Recommended Amount</Th>
                    <Th isNumeric>Description</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {available_investment_products.map((product, index) => {
                    return (
                      <Tr key={index}>
                        <Td>{product.name}</Td>
                        <Td>{product.recommended_allocation}</Td>
                        <Td isNumeric>{product.recommended_amount}</Td>
                        <Td>{product.description}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </SimpleGrid>
      </Flex>
      {/* <Footer /> */}
    </Flex>
  )
}
