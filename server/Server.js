import axios, { all } from "axios";
import base64 from "react-native-base64";
import { parseICS } from "../utils/Parser";
import { allCodeUE } from "../utils/AllParcours";

const SUCCESS = true
const ERROR = false

// Credentials for the caldav server
const username = "student.master";
const password = "guest"
const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);

// Create an axios instance
const api = axios.create({
  baseURL : 'https://cal.ufr-info-p6.jussieu.fr:443/caldav.php/',
  timeout : 20000,
  headers : {'X-Custom-Header' : 'foobar',
    'Authorization': authHeader },
});

/* Keys of the events object
    "created", 
    "uid", 
    "dtend", 
    "transp", 
    "x-apple-travel-advisory-behavior", 
    "summary", 
    "last-modified", 
    "dtstamp", 
    "dtstart", 
    "location", 
    "sequence"
*/

// Check if two dates are the same day, month and year
function isSameDayAndMonthYear(date1, date2) {
    return date1?.getDate() === date2?.getDate() && date1?.getMonth() === date2?.getMonth() && date1?.getFullYear() === date2?.getFullYear();
}

function checkValidity(eventValue, alwaysValid){
    for (const validStr of alwaysValid) {
        if (eventValue.includes(validStr)){
            return true
        }
    }
    return false
}

function isAsked(eventValue,constraintsUE,groupsTME){
    const alwaysValid = ["ATRIUM","Anglais","Audit","FORENSIC","Stage","Réunion","Travaux","Métier","Conférences",'obligatoire',"soutenance"]
    const alwaysValidAfterCheck = ["CS","Cours","CM","ER","Exam"]
    // Regex for knowing if TME or TD is followed by a number
    const patternTME = /TME(\d+)/; 
    const patternTD = /TD(\d+)/; 
    // Problematic UE
    const probUE = "SC"
    const probUEIDS2 = "MU4IN207"
    const solutionUEID = "MU4IN210"
    const probUEId = "MU4IN905"
    const similarCode = "MU4IN900"
    console.log("The event value : "+ eventValue)

    if (constraintsUE === null && !constraintsUE?.length > 0 || groupsTME === null && !groupsTME?.length > 0){
        console.log("[INFO] Step 0 : Returned because no constraints")
        return true
    }

    for (const str of constraintsUE) {   
        console.log("The current code : "+ allCodeUE[str])

        const stateBefore = checkValidity(eventValue,alwaysValid)
        if (stateBefore){
            console.log("[INFO] Step 1 : Returned because it's always valid")
            return true
        }

        // If the event is not in the list of the asked UE and the event is AROB
        // Check if the other eventID is in the list of the asked UE
        if (!eventValue.includes(allCodeUE[str]) && allCodeUE[str] == probUEIDS2 && eventValue.includes(solutionUEID)){
            console.log("[INFO] Step 2 : Returned because the event is AROB with bad code")
            return true
        }

        // If the event is not in the list of the asked UE
        if (!eventValue.includes(allCodeUE[str]) && allCodeUE[str] != probUEId)
            continue

        // If the event asked is Complex, and the current event is not Complex
        if (allCodeUE[str] == similarCode && eventValue.includes(probUE))
            continue

        // If the event asked is SC, and the current event is not SC
        if (allCodeUE[str] == probUEId && !eventValue.includes(probUE))
            continue


        // If the current event is a TME and the group is in the list of the asked groups
        if ((eventValue.includes("TD"+groupsTME[str]) || eventValue.includes("TME"+groupsTME[str]))){
            console.log("[INFO] Step 3 : Returned because it's a TME/TD of a specific group and UE")
            return true
        }

        // If the current event is not a TD/TME of a specific group
        if (!eventValue.match(patternTME) && !eventValue.match(patternTD)){
            console.log("[INFO] Step 4 : Retuned because it's not a TME/TD of a specific group")
            return true
        }
        
        // If the current event is always valid
        const stateAfter = checkValidity(eventValue, alwaysValidAfterCheck)
        if (stateAfter){
            console.log("[INFO] Step 5 : Returned because it's always valid after check")
            return true
        }
    }

}

const parseICSFile = async (data,constraints,groups,offset) => {
    try {
        console.log("[INFO] Parsing data...")
        const parsedData = parseICS(data)
        const targetDate = new Date(); 
        const oneWeek = 7
        // Set the time of the target date to midnight
        targetDate.setHours(0, 0, 0, 0);
        targetDate.setDate(targetDate.getDate()+offset);
        console.log(targetDate)
        // Filter events for the target date
        const eventsForToday = parsedData.events.filter((event) => {
            // Get the start and end date of the event
            const eventStart = new Date(event.dtstart.value);
            const eventEnd = new Date(event.dtend.value);

            // const eventEnd = new Date(event.dtend.value);
            // Each event can be recurring, so we need to check if one of the recurring events is on the target date
            if(event?.recurrenceRule && event?.recurrenceRule?.options && event?.recurrenceRule?.options?.until){
                const eventUntil = new Date(event.recurrenceRule.options.until)
                const currentEventStart = new Date(eventStart)
                // Check for every event recurrence if it is on the target date
                while (currentEventStart <= eventUntil){
                    if (isSameDayAndMonthYear(currentEventStart, targetDate) && isAsked(event.summary.value,constraints,groups)){
                        // If the event is on the target date, we need to update the start and end date of the event
                        // And then add it to the list of events 
                        const updatedStartDate = new Date(currentEventStart);
                        updatedStartDate.setDate(targetDate.getDate());
                        updatedStartDate.setHours(event.dtstart.value.getUTCHours(), event.dtstart.value.getMinutes());

                        const updatedEndDate = new Date(currentEventStart);
                        updatedEndDate.setDate(targetDate.getDate());
                        updatedEndDate.setHours(event.dtend.value.getUTCHours(), event.dtend.value.getMinutes());
              
                        event.dtstart.value = updatedStartDate.toISOString();
                        event.dtend.value = updatedEndDate.toISOString();
                        
                        return true
                    }
                    // Pass to the next recurrence
                    currentEventStart.setDate(currentEventStart.getDate() + oneWeek);
                }
                return false
            }    
            
            eventStart.setHours(event.dtstart.value.getUTCHours(), event.dtstart.value.getMinutes())
            eventEnd.setHours(event.dtend.value.getUTCHours(), event.dtend.value.getMinutes())
            event.dtstart.value = eventStart.toISOString();
            event.dtend.value = eventEnd.toISOString();

            return isSameDayAndMonthYear(eventStart, targetDate) && isAsked(event.summary.value,constraints,groups);
        });
        
        // console.log(eventsReturned)
        console.log("[INFO] Done!")
        // Sort events by start date
        // if (!(constraints && groups))
        //     eventsForToday.sort((a,b)=>{return new Date(a.dtstart.value) - new Date(b.dtstart.value)})

        return [eventsForToday,SUCCESS];

    } catch (error) {
        console.error('[ERROR] Error while parsing the ICS file:', error);
        return [[],ERROR];
    }
};

export const getData = async (path,constraints=null,groups=null,offset=0) => {
    try {
        console.log(`[INFO] Asking for : ${path}...`)
        if (constraints && groups){
            console.log(`[INFO] UE : ${JSON.stringify(constraints)}`)
            console.log(`[INFO] Groups : ${groups}`)
        }
        console.log(path)
        // Get the ICS file
        const response = await api.get(path);
        console.log("[INFO] Data loaded")
        // Parse the ICS filea
        return parseICSFile(response.data,constraints,groups,offset)
    } catch (error) {
        console.error('[ERROR] Error while getting the ICS file:', error);
        return [[],ERROR];
    }
}