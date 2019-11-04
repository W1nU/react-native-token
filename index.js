import RNToken from "./RNToken"

export let useTopic = async (topicTitle) => {
    await RNToken._initStorage(topicTitle)
    return new RNToken(topicTitle)
}


