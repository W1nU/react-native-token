import RNTokenFunctions from "./functions"

class RNToken{
    constructor(topicTitle){
        this.topicTitle = topicTitle
    }

    async setToken (tokenTitle, tokenValue, validateFunction) {
        await RNTokenFunctions.setToken(this.topicTitle, tokenTitle, tokenValue, validateFunction)
    }

    async getToken(tokenTitle) {
        return await RNTokenFunctions.getToken(this.topicTitle, tokenTitle)
    }

    async deleteToken(tokenTitle) {
        return await RNTokenFunctions.deleteToken(this.topicTitle, tokenTitle)
    }

    async getAllToken() {
        return await RNTokenFunctions.getAllToken(this.topicTitle)
    }

    async deleteTopic() {
        return await RNTokenFunctions.deleteTopic(this.topicTitle)
    }

    async validateToken(tokenTitle) {
        return await RNTokenFunctions.validateToken(this.topicTitle, tokenTitle)
    }

    async clear() {
        await RNTokenFunctions.clear(this.topicTitle)
    }

    static async _initStorage(topicTitle) {
        if(!await RNTokenFunctions._checkTopicExist(topicTitle)){
            await RNTokenFunctions.addTopic(topicTitle)
        }
    }
}

export default RNToken