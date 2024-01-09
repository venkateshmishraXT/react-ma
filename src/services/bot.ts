import axios from "axios";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CryptoCoinDetailsI, CryptoHistoryI, CryptoResultI } from '../interfaces/interfaces'

const headers = {
    "temperature": 0,
    "max_tokens": 10000,
    "top_p": 0.6
}

const goalsPrompts = "Analyze the performance of customers within the same segment as the specified customer, evaluating their achievements related to financial goals set in the previous period. Provide a detailed comparative analysis illustrating how this segment of customers has progressed or succeeded in attaining their goals, considering factors such as investment preferences, risk tolerance, and financial aspirations. Offer insights into the most common or successful types of goals achieved within this segment and identify trends or strategies that contributed to their accomplishment.Based on this analysis, recommend specific goals for the upcoming year that align with the customer's financial trajectory, considering the successful goal achievements or progress observed within their segment. Tailor these recommendations to suit the individual's financial profile, savings portfolio state, and overarching financial goals.Additionally, outline available investment products pertinent to the customer's segment and financial status. Highlight the recommended allocation or amounts that could be invested in these products, taking into account their current financial situation and the potential for achieving both short-term and long-term objectives. Ensure the suggested investments are in line with the customer's risk tolerance, investment preferences, and overall financial health. Generate a response in the following format: {\"customer_id\": 5250,\"customer_name\": \"name of customer\",\"segment_performance\": {\"segment_name\": \"High Net Worth Investors\",\"goal_performance\":[{\"goal\":\"goal_1\",\"success_rate\": 0.75,\"average_progress\": 80},{\"goal\":\"goal_2\",\"success_rate\": 0.90,\"average_progress\": 95},{\"goal\":\"goal_3\",\"success_rate\": 0.60,\"average_progress\": 50}]},\"recommended_goals_next_year\":[{\"goal\":\"goal_1\",\"recommended_amount\": 15000,\"description\": \"Investment in diversified mutual funds for long-term growth.\"},{\"goal\":\"goal_2\",\"recommended_amount\": 10000,\"description\": \"Increase contributions to retirement savings for better future security.\"}],\"available_investment_products\":[{\"name\":\"Diversified Mutual Fund\",\"recommended_allocation\": 0.40,\"recommended_amount\": 20000,\"description\": \"Offers diversification and potential long-term growth.\"},{\"name\": \"Retirement Savings Account\",\"recommended_allocation\": 0.30,\"recommended_amount\": 15000,\"description\": \"Tax-advantaged savings for retirement purposes.\"}]}";
const customerInsightsPrompts = "Analyze the investment portfolio of the customer, integrating their profile attributes, transaction behavior, and declared financial goals. Provide a comprehensive overview detailing the composition of their investment portfolio, including the types of assets, diversification, and current allocation across various investment vehicles. Incorporate insights from their profile, encompassing risk tolerance, investment preferences, and any notable financial indicators.Furthermore, examine transaction behavior, identifying patterns, frequency, and types of transactions within their investment accounts. Highlight any significant transactional trends that could impact their portfolio performance or indicate shifts in investment strategies.Integrate insights related to Customer's stated financial goals, aligning these objectives with their investment holdings and transactional behavior. Assess the correlation between their portfolio composition and the progress made towards achieving their financial goals, offering recommendations to optimize their investment strategy and better align their holdings with their stated objectives.Ensure the analysis provides a holistic view of Customer  investment journey, leveraging their profile, transactional data, and financial goals to offer actionable insights aimed at enhancing their investment portfolio and aligning it more closely with their desired financial outcomes. generate the response in the given Json Format only i.e.,{\"customer_id\": 5250,\"InsightSummary\":\"Summary\",\"investment_portfolio_timeseries\": [{\"month\": \"January\",\"transactions\": [{\"type\": \"Inflow\",\"amount\": 5000},{\"type\": \"Outflow\",\"amount\": 2000}]},{\"month\": \"February\",\"transactions\": [{\"type\": \"Inflow\",\"amount\": 6000},{\"type\": \"Outflow\",\"amount\": 2500}]}],\"financial_goals_status\": {\"met_goals\": 3,\"met_goals_description\":[\"ssdsd\",\"aasaa\",\"aasasas\"]\"unmet_goals\": 2\"unmet_goals_description\":[\"assa\"\"aasaasaa\",\"ssd\"]},\"customer_profile\": {\"name\": \"John Doe\",\"age\": 35,\"risk_tolerance\": \"Medium\",\"investment_preferences\": [\"Stocks\", \"Mutual Funds\"]";
const BASE_URL = "http://4.157.49.165";
//const BASE_URL = "https://0c03-38-242-187-130.ngrok-free.app";

export const fetchGoals = async (
    newMessage: any,
    currentSpeaker: any,
    component: any
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/v1/analyze`,
        //`http://4.157.49.165/v1/analyze`,
        {
          "messages": [{
            "role": currentSpeaker,
            "content": newMessage
          },
          {
            "role": "system",
            //"content": goalsPrompts
            "content": component == 'Goal' ? goalsPrompts : customerInsightsPrompts
          }],
          "temperature": 0,
          "max_tokens": 10000,
          "top_p": 0.6
      },
        // {
        //     headers: {
        //     "Access-Control-Allow-Origin": "*"
        //     },
        // }
      );
      return response;
    } catch (error) {
      console.error("Bot API error:", error);
      throw error;
    }
  };