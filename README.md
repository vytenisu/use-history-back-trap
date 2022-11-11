# use-history-back-trap

_by Vytenis Urbonavičius_

**_use-history-back-trap_** is a React hook which can intercept native browser's navigation backwards in history. After navigation is intercepted and paused, it may later be resumed if needed.

By default browser navigation cannot be intercepted. **_use-history-back-trap_** uses a work-around to achieve interception by manipulating history object.

---

## Use Case

Main use case is to prevent data loss if user is filling some form and then clicks "back" on browser's UI.

This should be obvious to everyone BUT I will highlight this just in case - **do not use and abuse this tool for any malicious purposes such as preventing navigation on scam websites**.

---

## Installation

```
npm install use-history-back-trap
```

---

## Usage

```typescript
import {useHistoryBackTrap} from 'use-history-back-trap'

// This method may be asynchronous
// Provide your own implementation for handleTrap based on your needs
const handleTrap = async resume => {
  if (window.confirm('Are you sure?')) {
    resume() // if called, navigate back as user intended originally
    return true // true = no need to setup interception trap again (we resumed)
  } else {
    return false // false = setup interception trap again for next navigation

    // If needed, one could return true here as well - in such case
    // next navigation would no longer be intercepted.
  }
}

const SomeFunctionalReactComponent = () => {
  useHistoryBackTrap(handleTrap)
  // ...
}
```

---

## Additional options

_useHistoryBackTrap_ accepts a second argument with additional options. All of them are optional. They are mainly designed to prevent clashes with other potential hacks in large projects - in most cases these options are not needed.

```typescript
useHistoryBackTrap(handleTrap, {
  // Below options specify keys added into window.history.state.
  // They are used to identify navigation trap when history pop is detected.
  // If you do not know what that means - you do not need to change :)
  trapFlag: 'backTrap',
  trapTime: 'backTime',
})
```

---

Happy Hacking!!!
