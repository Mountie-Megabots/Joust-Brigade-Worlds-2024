const host = "https://worlds.medievalapple.workers.dev/";

console.log(MakeVisitApiRequest());

async function MakeVisitApiRequest()
{
    const response = await fetch(host, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            //"Content-Type": "application/json",
        }
    });

    return response;
}