const matchTable = document.getElementById("matches");
const liveStream = document.getElementById("live");
const twitchStream = document.getElementById("twitchStream");
const noStream = document.getElementById("noStream");

const eventKey = "2024cur"
// const eventKey = "2024micmp2"

const teamKey = "frc7197"

showStream()

showMatches()

async function showStream(){

    const stream = await MakeBlueApiRequest(`/event/${eventKey}`)

    console.log(stream.webcasts)

    if(stream.webcasts.length > 1){
        noStream.hidden = true;
        liveStream.hidden = false;
        for (let i = 0; i < stream.webcasts.length; i++) {
            const webcast = stream.webcasts[i];
            if(webcast.type == "youtube"){
                liveStream.src = `https://www.youtube.com/embed/${webcast.channel}`
                break
            }
        };
    }
    else if(stream.webcasts.length > 0){
        noStream.hidden = true;
        twitchStream.hidden = false;
        for (let i = 0; i < stream.webcasts.length; i++) {
            const webcast = stream.webcasts[i];
            if(webcast.type == "twitch"){
                twitchStream.src = `https://player.twitch.tv/?channel=${webcast.channel}&parent=worlds.mountierobotics.org`
                break
            }
        };
    }

}

async function showMatches(){

    const ourMatches = await MakeBlueApiRequest(`/team/${teamKey}/event/${eventKey}/matches`);

    console.log(ourMatches.length)

    if(ourMatches.length == 0){
        console.log("No Matches Yet")
        matchTable.innerHTML += "<tr><td>Event Hasn't Started Yet</td></tr><tr><td>Please Check Back Later</td></tr>";
    }else{
        let q = "";
        let sf = "";
        let f = "";

        ourMatches.forEach(match => {

            if(match.comp_level == "qm"){
                q += "<tr>"

                try {
                    q += `<td width=\"10%\"><a href=\"https://youtu.be/${match.videos[0].key}\"><svg version=\"1.1\"viewBox=\"0 0 68 48\"><path d=\"M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z\" fill=\"#f00\"></path><path d=\"M 45,24 27,14 27,34\" fill=\"#fff\"></path></svg></a></td>`
                } catch (error) {
                    q += "<td></td>"
                }

                q += `<td>Q ${match.match_number}</td>`

                + "<td style=\"color: red;\">";
                
                if(String(match.alliances.red.team_keys[0]).substring(3) == "7197"){
                    q += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += String(match.alliances.red.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[1]).substring(3) == "7197"){
                    q += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += "," + String(match.alliances.red.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[2]).substring(3) == "7197"){
                    q += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += "," + String(match.alliances.red.team_keys[2]).substring(3)
                }
                
                q += "</td>"

                + "<td style=\"color: blue;\">";
                
                if(String(match.alliances.blue.team_keys[0]).substring(3) == "7197"){
                    q += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += String(match.alliances.blue.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[1]).substring(3) == "7197"){
                    q += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += "," + String(match.alliances.blue.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[2]).substring(3) == "7197"){
                    q += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    q += "," + String(match.alliances.blue.team_keys[2]).substring(3)
                }
                
                q += "</td>"

                if(match.alliances.red.score >= 0 && match.alliances.blue.score >= 0){
                    q += "<td>Finished</td>"
                    
                    + `<td><span style=\"color: red;\">${match.alliances.red.score}</span>`

                    + `<span style=\"color: blue; margin-left: 25%;\">${match.alliances.blue.score}</span></td>`
                }
                else{
                    let estTime = new Date( match.predicted_time *1000);

                    q += `<td>${estTime.toLocaleString()}</td>`
                    
                    + "<td></td>"
                }

                q += "</tr>";
            }

            else if(match.comp_level == "sf"){
                sf += "<tr>"

                try {
                    sf += `<td width=\"10%\"><a href=\"https://youtu.be/${match.videos[0].key}\"><svg version=\"1.1\"viewBox=\"0 0 68 48\"><path d=\"M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z\" fill=\"#f00\"></path><path d=\"M 45,24 27,14 27,34\" fill=\"#fff\"></path></svg></a></td>`
                } catch (error) {
                    sf += "<td></td>"
                }

                sf += `<td>SF ${match.set_number}</td>`

                + "<td style=\"color: red;\">";
                
                if(String(match.alliances.red.team_keys[0]).substring(3) == "7197"){
                    sf += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += String(match.alliances.red.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[1]).substring(3) == "7197"){
                    sf += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += "," + String(match.alliances.red.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[2]).substring(3) == "7197"){
                    sf += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += "," + String(match.alliances.red.team_keys[2]).substring(3)
                }
                
                sf += "</td>"

                + "<td style=\"color: blue;\">";
                
                if(String(match.alliances.blue.team_keys[0]).substring(3) == "7197"){
                    sf += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += String(match.alliances.blue.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[1]).substring(3) == "7197"){
                    sf += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += "," + String(match.alliances.blue.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[2]).substring(3) == "7197"){
                    sf += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    sf += "," + String(match.alliances.blue.team_keys[2]).substring(3)
                }
                
                sf += "</td>"

                if(match.alliances.red.score >= 0 && match.alliances.blue.score >= 0){
                    sf += "<td>Finished</td>"
                    
                    + `<td><span style=\"color: red;\">${match.alliances.red.score}</span>`

                    + `<span style=\"color: blue; margin-left: 25%;\">${match.alliances.blue.score}</span></td>`
                }
                else{
                    let estTime = new Date( match.predicted_time *1000);

                    sf += `<td>${estTime.toLocaleString()}</td>`
                    
                    + "<td></td>"
                }

                sf += "</tr>";
            }

            else if(match.comp_level == "f"){
                f += "<tr>"

                try {
                    f += `<td width=\"10%\"><a href=\"https://youtu.be/${match.videos[0].key}\"><svg version=\"1.1\"viewBox=\"0 0 68 48\"><path d=\"M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z\" fill=\"#f00\"></path><path d=\"M 45,24 27,14 27,34\" fill=\"#fff\"></path></svg></a></td>`
                } catch (error) {
                    f += "<td></td>"
                }
                
                f += `<td>F ${match.match_number}</td>`

                + "<td style=\"color: red;\">";
                
                if(String(match.alliances.red.team_keys[0]).substring(3) == "7197"){
                    f += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += String(match.alliances.red.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[1]).substring(3) == "7197"){
                    f += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += "," + String(match.alliances.red.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.red.team_keys[2]).substring(3) == "7197"){
                    f += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += "," + String(match.alliances.red.team_keys[2]).substring(3)
                }
                
                f += "</td>"

                + "<td style=\"color: blue;\">";
                
                if(String(match.alliances.blue.team_keys[0]).substring(3) == "7197"){
                    f += "<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += String(match.alliances.blue.team_keys[0]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[1]).substring(3) == "7197"){
                    f += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += "," + String(match.alliances.blue.team_keys[1]).substring(3)
                }
                
                if(String(match.alliances.blue.team_keys[2]).substring(3) == "7197"){
                    f += ",<span style=\"color: white;\">7197</span>"
                }
                else{
                    f += "," + String(match.alliances.blue.team_keys[2]).substring(3)
                }
                
                f += "</td>"

                if(match.alliances.red.score >= 0 && match.alliances.blue.score >= 0){
                    f += "<td>Finished</td>"
                    
                    + `<td><span style=\"color: red;\">${match.alliances.red.score}</span>`

                    + `<span style=\"color: blue; margin-left: 25%;\">${match.alliances.blue.score}</span></td>`
                }
                else{
                    let estTime = new Date( match.predicted_time *1000);

                    f += `<td>${estTime.toLocaleString()}</td>`
                    
                    + "<td></td>"
                }

                f += "</tr>";
            }
        });
        matchTable.innerHTML += q + sf + f
    }
}