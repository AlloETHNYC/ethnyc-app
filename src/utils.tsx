import axios from "axios";
import { sign } from "crypto";
import { Contract } from "ethers";
import { GRAPH_API } from "./settings";

export async function getUsersCompanies(account: string) {
    const headers = {
        "content-type": "application/json",
    };

    const data = {
        query: `{
            companies(where: { creator: "${account}" }) {
              id
              creator
              deployedAddr
              name
              baseURI
              description
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