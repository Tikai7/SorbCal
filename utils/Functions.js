import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to retrieve data from local storage
export const getMyData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // Error retrieving data
        console.error('Error retrieving data from AsyncStorage:', e);
        return null;
    }
};

// Function to store data locally
export const storeMyData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // Error storing data
        console.error('Error storing data in AsyncStorage:', e);
    }
};

export const clearAll = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        console.error('Error clearing all items from AsyncStorage:', e);
    }
};


export const convertDateToString = (date) => {
    // Convert date to string and add a 0 if needed
    avoidData = ["8","9"]
    if (!(date instanceof Date)) 
        date = new Date(date)
    stringDate = date.getHours() + "h" + date.getMinutes()

    while (stringDate.length < 5 && avoidData.includes(stringDate[0])) 
        stringDate = "0"+stringDate
    if (stringDate.length < 5)
        stringDate = stringDate + "0"

    return stringDate
}

