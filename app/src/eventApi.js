export async function fetchEvents(eventType, token, limit, after, before) {
    let response = await fetch("https://72e7e9muuf.execute-api.eu-west-1.amazonaws.com/prod/event/" + eventType
        + "?limit=" + limit
        + "&after=" + (after ? after : 0)
        + "&before=" + (before ? before : 99573592597322),
        {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    return await response.json();
}

export default fetchEvents