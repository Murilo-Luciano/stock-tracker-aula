import axios from "axios";

const server = axios.create({
  baseURL: "https://api.informativos.io/",
});

export async function fetchPriceTrend(symbol:string):Promise<number[]> {
  const today = new Date();
  const endDate = today.toISOString().substring(0, 10);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() == 0 ? 11 : today.getMonth() - 1);
  const startDate = oneMonthAgo.toISOString().substring(0, 10);

  const response = await server.get(
    `prices_matrix?symbols[]=${symbol}&start_date=${startDate}&end_date=${endDate}&property=close`
  );

  return response.data.slice(1).map((item:string[]) => Number(item[1]));
}

export async function fetchCurrentMarketData(symbol:string) {
  const currentDate = new Date();
  // o certo seria pegar o último dia útil, aqui está simplificado
  currentDate.setDate(currentDate.getDate()-1);
  const priceDate = currentDate.toISOString().substring(0, 10);

  console.log(priceDate)

  const response = await server.get(`prices/${priceDate}?symbols[]=${symbol}`);
  const data = response.data[0];
  // const data = {close: 1, change: 1}
  

  console.log(data)

  return {
    close: Number(data.close),
    change: Number(data.change),
  };
}
