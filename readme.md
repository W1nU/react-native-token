# react-native-token
Library for managing tokens structured with keychain storage

## Feature
* Simple and easy to use(hook style)
* Topic-Token Top-down structure
* Token stored in Keychain storage
* MIT License

## Setup
```npm i react-native-token || yarn add react-native-token```

## Usage
```javascript
//import library
import { useTopic } from "react-native-token"

// this is not required
import API from "aws-amplify"

const example = async () => {
    // Create a topic for storing Keys, Tokens ... etc.
    let topic = await useTopic("rsa")

    // Set a value
    await topic.setToken("publicKey", publicKey, validateSessionToken)

    // Get all tokens that stored in Topic
    let tokens = await topic.getAllToken()
    
    let publicKey = tokens.publicKey.tokenValue
}

// IMPORTANT : EXAMPLE FUNCTION
const validateSessionToken = async (token) => {
    const result = await API.get("rntoken", "/tokenValidate", {
        body: {
            type: "publicKey",
            token: token
        }
    })

    return result
}

```

## API
### functions
#### useTopic(topicTitle(String, required)) => RNToken objcet
* Create A topic for storing values.
* It only creates a new topic when topic does not exist.
* If already had a topic for 'topicTitle' that you passed, will just return RNToken object

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")
}
```

#### RNToken.setToken(tokenTitle(String, required), tokenValue(String, required), validateFunction(Function, optional))
* Add or Update token in topic

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.setToken("test", "testValue", testFunction)
}
```

#### RNToken.getToken(tokenTitle(String, required))
* Get token 

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.getToken("test")
}
```

#### RNToken.deleteToken(tokenTitle(String, required))
* Delete token

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.deleteToken("test")
}
```

#### RNToken.getAllToken()
* Get all token in topic

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.getAllToken()
}
```

#### RNToken.deleteTopic()
* Delete this topic

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.deleteTopic()
}
```

#### RNToken.validateToken(tokenTitle(String, required))
* Run validate function and return result 

##### usage 
```javascript
import { useTopic } from "react-native-token"

const example = async () => {
    let topic = await useTopic("rsa")

    await topic.validateToken("test")
}
```

