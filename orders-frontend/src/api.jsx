/* eslint-disable unicode-bom */
﻿import axios from "axios";

export const api = axios.create({
    baseURL: "http://host.docker.internal:8080" // backend API
});