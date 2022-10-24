import http from "./axiosModule";
// const url = "https://6343af8fb9ab4243cad57d7d.mockapi.io"; //gateway
const url = ""

class MatchingServices {

    get(mid: string) {
        http.get(`matching/${mid}`)
    }

    post(mid: string) {
        http.post(`matching`),
        JSON.stringify({
            mid: mid
        })
    }

    delete(mid: string) {
        http.delete(`matching/${mid}`)
    }

    getMatchingByActivity(aid: string) {
        return http.get(
            `/getMatchingByActivity/${aid}`
        )
    }


}

export default new MatchingServices();