interface ResponseData {
    data: any;
    cookies: string;
}

async function fetchData(url: string, data: object): Promise<ResponseData> {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include'
    });

    const responseData = await response.text();
    const cookies = response.headers.get('set-cookie');

    return { data: responseData, cookies : cookies || undefined };
}

const data = await fetchData("https://testafname.selor.be/ReviewTest", {NationalNumber: "65080337583", ProcedureCode : "BFF23211", TestCode: "UFI5AA91", EventId: "195496"})
console.log(data);