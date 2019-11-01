# react-native-token
Library for managing tokens structured with keychain storage

## Usage
```javascript
import RNToken from "react-native-token"

const example = async () => {
    // create Topic
    // A topic is the concept of a top-level depository of token or set of tokens.
    await RNToken.addTopic("test")

    // addToken in created topic
    await RNToken.addToken("test", "refreshToken", "]s+lIM~Hti~4ZYNJntNrudQ0$-#<=")

    // update exist token
    await RNToken.updateToken("test", "refreshToken", "adfafasdlkhf;adfa;ldshfj;alf")

    // get refreshToken in 'test' topic
    await RNToken.getToken("test", "refreshToken")
}
```