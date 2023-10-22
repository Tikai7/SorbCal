import axios from "axios";
import base64 from "react-native-base64";
import ical from "cal-parser"


const SUCCESS = true
const ERROR = false

// Credentials for the caldav server
const username= "student.master";
const password= "guest"
const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);

// Create an axios instance
const api = axios.create({
  baseURL : 'https://cal.ufr-info-p6.jussieu.fr:443/caldav.php/',
  timeout : 7000,
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

function isAsked(eventValue,constraints){
    constraints = {"UE":["MLBDA","M2"],"Groupe":["G1"]}
    if (constraints === null)
        return true

    const containedUE = constraints["UE"].some((str) => eventValue.includes(str));
    const containedGroupe = constraints["Groupe"].some((str) => eventValue.includes(str)) || true;

    return containedUE && containedGroupe
}

const parseICSFile = async (data,constraints) => {
    try {
        console.log("[INFO] Parsing data...")
        const parsedData = ical.parseString(data);
        const targetDate = new Date(); 
        const oneWeek = 7
        // Set the time of the target date to midnight
        targetDate.setHours(0, 0, 0, 0);
        targetDate.setDate(targetDate.getDate()-3);
        // Filter events for the target date

        const eventsForToday = parsedData.events.filter((event) => {
            // Get the start and end date of the event
            const eventStart = new Date(event.dtstart.value);
            // const eventEnd = new Date(event.dtend.value);
            // Each event can be recurring, so we need to check if one of the recurring events is on the target date
            if(event?.recurrenceRule && event?.recurrenceRule?.options && event?.recurrenceRule?.options?.until){
                const eventUntil = new Date(event.recurrenceRule.options.until)
                const currentEventStart = new Date(eventStart)
                // Check for every event recurrence if it is on the target date
                while (currentEventStart <= eventUntil){
                    if (isSameDayAndMonthYear(currentEventStart, targetDate) && isAsked(event.summary.value,constraints)){
                        // If the event is on the target date, we need to update the start and end date of the event
                        // And then add it to the list of events 
                        const updatedStartDate = new Date(currentEventStart);
                        updatedStartDate.setFullYear(targetDate.getFullYear());
                        updatedStartDate.setMonth(targetDate.getMonth());
                        updatedStartDate.setDate(targetDate.getDate());
                    
                        const updatedEndDate = new Date(currentEventStart);
                        updatedEndDate.setFullYear(targetDate.getFullYear());
                        updatedEndDate.setMonth(targetDate.getMonth());
                        updatedEndDate.setDate(targetDate.getDate());
                    
                        event.dtstart.value = updatedStartDate.toISOString();
                        event.dtend.value = updatedEndDate.toISOString();
                        return true
                    }
                    // Pass to the next recurrence
                    currentEventStart.setDate(currentEventStart.getDate() + oneWeek);
                }
                return false
            }            
            return isSameDayAndMonthYear(eventStart, targetDate) && isAsked(event.summary.value,constraints);
        });
        
        console.log("[INFO] Done!")
        // Sort events by start date
        eventsForToday.sort((a,b)=>{return new Date(a.dtstart.value) - new Date(b.dtstart.value)})
        return [eventsForToday,SUCCESS];
    } catch (error) {
        console.error('[ERROR] Error while parsing the ICS file:', error);
        return [[],ERROR];
    }
};

export const getData = async (path,constraints=null) => {
    try {
        console.log(`[INFO] Asking for : ${path}...`)
        // Get the ICS file
        const response = await api.get(path);
        console.log("[INFO] Data loaded")
        // Parse the ICS file
        return parseICSFile(response.data,constraints)
    } catch (error) {
        console.error('[ERROR] Error while getting the ICS file:', error);
        return [[],ERROR];
    }
}