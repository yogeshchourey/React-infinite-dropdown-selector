/* eslint-disable consistent-return */
import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

//TODO - remove rsp.config.url.includes("/api/catalog?") asap
axios.interceptors.response.use(
    rsp => {
        return rsp;
    },
    error => {
        return Promise.reject(error);
    }
);

export const INTERNAL_SERVER_ERROR = {
    code: "INTERNAL_SERVER_ERROR",
    number: 500,
    message: "Internet Server Error"
};
export const INTERNAL_CONNECTIVITY_ERROR = {
    code: "INTERNAL_CONNECTIVITY_ERROR",
    number: 502,
    message: "Internet Connectivity Error"
};
export const BAD_GATEWAY = {
    code: "BAD_GATEWAY",
    number: 502,
    message: "Internet Connectivity Error"
};
export const SERVICE_UNAVAILABLE = {
    code: "SERVICE_UNAVAILABLE",
    number: 503,
    message: "Service Unavailable"
};
export const GATEWAY_TIMEOUT = {
    code: "GATEWAY_TIMEOUT",
    number: 504,
    message: "Gateway timed out"
};
export const BAD_REQUEST = {
    code: "BAD_REQUEST",
    number: 400,
    message: "Bad Request"
};

export const UNAUTHORIZED = {
    code: "UNAUTHORIZED",
    number: 401,
    message: "Unauthorized"
};

export default {
    get(url, options) {
        return axios.get(url, options);
    },
    post(url, data, options) {
        return axios.post(url, data, { ...options }).then(response => response);
    },
    put(url, data, options) {
        return axios.put(url, data, { ...options }).then(response => response);
    },
    patch(url, data, options) {
        return axios.patch(url, data, { ...options }).then(response => response);
    },
    delete(url, options) {
        return axios.delete(url, { ...options }).then(response => response);
    },
    ajax(options) {
        return axios(options);
    },
    getError(err) {
        let errTpl = {};
        if (err.response && err.response.status) {
            switch (Number(err.response.status)) {
                case 500:
                    try {
                        errTpl.data = JSON.parse(err.response.data);
                    } catch (e) {
                        if (err.response.data.indexOf("ECONNREFUSED") > -1) {
                            errTpl = INTERNAL_CONNECTIVITY_ERROR;
                        }
                        errTpl = INTERNAL_SERVER_ERROR;
                    }
                    break;
                case 502:
                    errTpl = BAD_GATEWAY;
                    break;
                case 503:
                    errTpl = SERVICE_UNAVAILABLE;
                    break;
                case 504:
                    errTpl = GATEWAY_TIMEOUT;
                    break;
                case 400:
                    errTpl = BAD_REQUEST;
                    break;
                case 401:
                    errTpl = UNAUTHORIZED;
                    break;
                default:
                    errTpl = INTERNAL_SERVER_ERROR;
            }
        } else {
            errTpl = INTERNAL_CONNECTIVITY_ERROR;
        }
        return errTpl;
    },
    error: {
        INTERNAL_SERVER_ERROR,
        INTERNAL_CONNECTIVITY_ERROR,
        BAD_GATEWAY,
        SERVICE_UNAVAILABLE,
        GATEWAY_TIMEOUT,
        BAD_REQUEST,
        UNAUTHORIZED
    }
};
