export async function fetchEvents(eventType, token, limit) {
    let response = await fetch("https://72e7e9muuf.execute-api.eu-west-1.amazonaws.com/prod/event/" + eventType + "?limit="+limit,
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    return await response.json();
}

export default fetchEvents