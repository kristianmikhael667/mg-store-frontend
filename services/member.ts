import callAPI from "../config/api";

export async function getMemberOverview() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/players/dashboard`;
    return callAPI({
        url,
        method:'GET',
        token: true
    })
}

export async function getMemberTransactions(valueParams: string) {
    let params = '';
    if(valueParams === "all"){
        params = ''
    }else{
        params = `?status=${valueParams}`
    }
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/players/history${params}`;
    return callAPI({
        url,
        method:'GET',
        token: true
    })

}

export async function getTransactionsDetail(id: string, token: string) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/players/history/${id}/detail`;
    return callAPI({
        url,
        method:'GET',
        serverToken: token
    })

}

export async function updateProfile(data: FormData, id: string) {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const url = `${ROOT_API}/api/v1/players/profile/${id}`;
    return callAPI({
        url,
        method:'PUT',
        data,
        token: true
    })

}