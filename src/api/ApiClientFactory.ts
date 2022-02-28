import { localStorageAuthUserKey } from "../redux/loginSlice";
import { BoilerplateApiClient } from "./generated";

export function createBoilerplateApiClient() {
    var token = localStorage.getItem(localStorageAuthUserKey);
    var apiClient = new BoilerplateApiClient({
        BASE: process.env.REACT_APP_API_BASEURL,
        TOKEN: token ? token : undefined
    })
    return apiClient;
}