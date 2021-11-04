import {client} from "@/api/weatherReportAxios";

const fetchAll = (client) => () => {
    return client.get("/data").then(resposne => resposne.data)
}

const create = (client) => (request) => {
    return client.post("/data", request).then(response => response.data)
}

const weatherDataApiService = {
    fetchAll: fetchAll(client),
    create: create(client)
}

export default weatherDataApiService