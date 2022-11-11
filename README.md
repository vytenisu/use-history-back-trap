# use-history-back-trap

_by Vytenis Urbonavičius_

**_use-history-back-trap_** is a React hook which can intercept native browser's navigation backwards in history. After navigation is intercepted and paused, it may later be resumed if needed.

By default browser navigation cannot be intercepted. **_use-history-back-trap_** uses a work-around to achieve interception by manipulating history object.

___

## Use Case

Main use case is to prevent data loss if user is filling some form and then clicks "back" on browser's UI.

This should be obvious to everyone BUT I will highlight this just in case - **do not use and abuse this tool for any malicious purposes such as preventing navigation on scam websites**.

___

## Installation

```
npm install use-history-back-trap
```

___

## Usage

```typescript
import {useHistoryBackTrap} from 'use-history-back-trap'

// This method may be asynchronous
// Provide your own implementation for approveNavigation based on your needs
// Make sure to return boolean or Promise<boolean>
const approveNavigation = async () => window.confirm('Are you sure?')

const SomeFunctionalReactComponent = () => {
  useHistoryBackTrap(approveNavigation)
  // ...
}
```

___

## Additional options

_useHistoryBackTrap_ accepts a second argument with additional options. All of them are optional. They are mainly designed to prevent clashes with other potential hacks in large projects - in most cases these options are not needed.

```typescript
useHistoryBackTrap(approveNavigation, {
  // Below options specify keys added into window.history.state.
  // They are used to identify navigation trap when history pop is detected.
  // If you do not know what that means - you do not need to change :)
  trapFlag: 'backTrap',
  trapTime: 'backTime',
})
```

---

Happy Hacking!!!
