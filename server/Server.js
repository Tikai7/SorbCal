import axios from "axios";
import base64 from "react-native-base64";
import ical from "cal-parser"

const username= "student.master";
const password= "guest"
const authHeader = 'Basic ' + base64.encode(`${username}:${password}`);

const api = axios.create({
  baseURL : 'https://cal.ufr-info-p6.jussieu.fr:443/caldav.php/',
  timeout : 10000,
  headers : {'X-Custom-Header' : 'foobar',
    'Authorization': authHeader },
});

const keys = ["created", "uid", "dtend", "transp", "x-apple-travel-advisory-behavior", "summary", "last-modified", "dtstamp", "dtstart", "location", "sequence"]

function isSameDayAndMonthYear(date1, date2) {
    return date1?.getDate() === date2?.getDate() && date1?.getMonth() === date2?.getMonth() && date1?.getFullYear() === date2?.getFullYear();
}

const parseICSFile = async (data) => {
    try {
        const parsedData = ical.parseString(data);
        const targetDate = new Date(); 
        const oneWeek = 7
        // Set the time of the target date to midnight
        targetDate.setHours(0, 0, 0, 0);
        targetDate.setDate(targetDate.getDate()-5);
        // Filter events for the target date
        const eventsForToday = parsedData.events.filter((event) => {
            const eventStart = new Date(event.dtstart.value);
            const eventEnd = new Date(event.dtend.value);
            if(event.recurrenceRule && event.recurrenceRule?.options?.until){
                const eventUntil = new Date(event.recurrenceRule.options.until)
                const currentEventStart = new Date(eventStart)
                while (currentEventStart <= eventUntil){
                    if (isSameDayAndMonthYear(currentEventStart, targetDate)){
                        event.dtstart.value = eventStart.toISOString()
                        event.dtend.value = eventEnd.toISOString()
                        return true
                    }
                    currentEventStart.setDate(currentEventStart.getDate() + oneWeek);
                }
                return isSameDayAndMonthYear(eventStart, targetDate)
            }            
            return isSameDayAndMonthYear(eventStart, targetDate)
        });
        
        eventsForToday.forEach((event) => {
            console.log(event.summary)
            console.log(event.location)
        });

    } catch (error) {
        console.error('Error while parsing the ICS file:', error);
    }
};

export const getData = async (path) => {
    try {
        console.log(`Asking for : ${path}...`)
        const response = await api.get(path);
        console.log("Ok!")
        console.log("Parsing data...")
        parseICSFile(response.data)
        console.log("Done!")
    } catch (error) {
        throw error;
    }
}