import {client} from "@/api/weatherReportAxios";

const fetchAll = (client) => () => {
    return client.get("/forecast").then(response => response.data)
}

const forecastApiService = {
    fetchAll: fetchAll(client)
}

export default forecastApiService