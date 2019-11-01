# react-native-token
Library for managing tokens structured with keychain storage

## Usage
```javascript
//import library
import RNToken from "react-native-token"

// this is not required
import API from "aws-amplify"

const validateSessionToken = async (token) => {
    const result = await API.get("rntoken", "/token", {
        body: "validate",
        type: "sessionToken"
        token: token
    })

    return result // false or true
}

const example = async () => {
    // create Topic
    // A topic is the concept of a top-level depository of token or set of tokens.
    await RNToken.addTopic("test")

    // addToken in created topic
    await RNToken.addToken("test", "refreshToken", "]s+lIM~Hti~4ZYNJntNrudQ0$-#<=")

    // addToken in created topic with validate function
    await RNToken.addToken("test", "sessionToken". "asdfafjl12kjdladsfadf", validateSessionToken)

    // update exist token
    await RNToken.updateToken("test", "refreshToken", "adfafasdlkhf;adfa;ldshfj;alf")

    // get refreshToken in 'test' topic
    await RNToken.getToken("test", "refreshToken")

    // get All token in 'test' topic
    await RNToken.getAllToken("test")

    // validate token if it has validate function
    await RNToken.validateToken("test", "sessionToken")
}
```

