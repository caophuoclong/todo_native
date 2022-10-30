import AsyncStorage from '@react-native-async-storage/async-storage';

const Database = {
    _storeData: async(key: string, value: any)=>{
        try{
            await AsyncStorage.setItem(key, JSON.stringify(value))
        }catch(e){
            console.log(e)
        }
    },
    _retriveData: async(key: string)=>{
        try{
            const value = await AsyncStorage.getItem(key)
            if(value !== null){
                return JSON.parse(value)
            }
        }catch(e){
            console.log(e)
        }
    },
    _removeData: async(key: string)=>{
        try{
            await AsyncStorage.removeItem(key)
        }catch(e){
            console.log(e)
        }
    },
    _clearData: async()=>{
        try{
            await AsyncStorage.clear()
        }catch(e){
            console.log(e)
        }
    }
}
export default Database;