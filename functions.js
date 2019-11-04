import KeychainStorage from "react-native-keychainstorage"

const KEYCHAIN_ROOT_KEY = "RNToken"

const RNTokenFunctions = {
    addTopic: async (topicTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)
        
        if(await RNTokenFunctions._checkTopicExist(storage, topicTitle)) {
            return;
        }
        else {
            storage[topicTitle] = {}
        }

        await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, JSON.stringify(storage))
    },

    deleteTopic: async (topicTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else {
            delete storage[topicTitle]
        }

        await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, await JSON.stringify(storage))
    },

    getTopic: async (topicTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else{
            return storage[topicTitle][tokenTitle].tokenValue
        }
    },

    setToken: async (topicTitle, tokenTitle, tokenValue, validateFunction) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        storage[topicTitle][tokenTitle] = {
            tokenValue: tokenValue,
            validateFunction: validateFunction
        }

        await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, await JSON.stringify(storage))
    },

    getToken: async (topicTitle, tokenTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else{
            if(!RNTokenFunctions._checkTokenExist(storage, topicTitle, tokenTitle)){
                throw Error("Token (" +  tokenTitle + ") is not Exist in Topic (" + topicTitle + ")")
            }
            else {
                return storage[topicTitle][tokenTitle].tokenValue
            }
        }
    },

    deleteToken: async (topicTitle, tokenTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else{
            if(!RNTokenFunctions._checkTokenExist(storage, topicTitle, tokenTitle)){
                throw Error("Token (" +  tokenTitle + ") is not Exist in Topic (" + topicTitle + ")")
            }
            else {
                delete storage[topicTitle][tokenTitle]
            }
        }

        await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, JSON.stringify(storage))
    },
    
    // updateToken: async (topicTitle, tokenTitle, tokenValue, validateFunction) => {
    //     await RNToken._checkInitializedStorage()
        
    //     let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
    //     storage = await JSON.parse(storage)

    //     if(!RNToken._checkTopicExist(storage, topicTitle)){
    //         throw Error("Topic is not Exist : " + topicTitle)
    //     }
    //     else{
    //         if(!RNToken._checkTokenExist(storage, topicTitle, tokenTitle)){
    //             throw Error("Token (" +  tokenTitle + ") is not Exist in Topic (" + topicTitle + ")")
    //         }
    //         else {
    //             storage[topicTitle][tokenTitle] = {
    //                 tokenValue: tokenValue,
    //                 validateFunction: validateFunction
    //             }
    //         }
    //     }

    //     await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, JSON.stringify(storage))
    // },

    validateToken: async (topicTitle, tokenTitle) => {
        await RNTokenFunctions._checkInitializedStorage()

        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else{
            if(!RNTokenFunctions._checkTokenExist(storage, topicTitle, tokenTitle)){
                throw Error("Token (" +  tokenTitle + ") is not Exist in Topic (" + topicTitle + ")")
            }
            else {
                if(!storage[topicTitle][tokenTitle][validateFunction]){
                    throw Error("Token (" +  tokenTitle + ") in Topic (" + topicTitle + ") is not Exist validate function")
                }
                else {
                    const result = await storage[topicTitle][tokenTitle][validateFunction]()
                    return result
                }
            }
        }
    },
    
    getAllToken: async (topicTitle) => {
        await RNTokenFunctions._checkInitializedStorage()
        
        let storage = await KeychainStorage.getItem(KEYCHAIN_ROOT_KEY)
        storage = await JSON.parse(storage)

        if(!await RNTokenFunctions._checkTopicExist(storage, topicTitle)){
            throw Error("Topic is not Exist : " + topicTitle)
        }
        else {
            return storage[topicTitle]
        }
    },


    _checkTopicExist: async (storage, topicTitle) => {
        if(await Object.keys(storage).includes(topicTitle)){
            return true
        }
 
        return false
    },

    _checkTokenExist: async (storage, topicTitle, tokenTitle) => {
        const topic = storage[topicTitle]

        if(await Object.keys(topic).includes(tokenTitle)){
            return true
        }

        return false
    },

    _checkInitializedStorage: async () => {
        const keychain = await KeychainStorage.getAllKeys()

        if(!keychain.includes(KEYCHAIN_ROOT_KEY)){
            await KeychainStorage.setItem(KEYCHAIN_ROOT_KEY, JSON.stringify({}))
        }
    }
}

export default RNTokenFunctions