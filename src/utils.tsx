import axios from "axios";
import { sign } from "crypto";
import { Contract } from "ethers";
import { COMPANY_ABI } from "./ABIs/company";
import { GRAPH_API } from "./settings";

export async function getUsersCompanies(account: string) {
    const headers = {
        "content-type": "application/json",
    };

    const data = {
        query: `{
            companies(where: { creator: "0x9807f6d364873b4c649788bc69f39bb73669b012" }) {
              id
              creator
              deployedAddr
            }
          }`
    }

    const result = await axios({
        url:GRAPH_API,
        method: "post",
        headers: headers,
        data: data
    })

    return result
}