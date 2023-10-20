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

const parseICSFile = async (data) => {
    try {
        const parsedData = ical.parseString(data);
        parsedData.events.forEach((event) => {
            keys.forEach((key) => {
                console.log(key, event[key])
            })    
        })
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