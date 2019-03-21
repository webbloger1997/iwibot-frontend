# IWIBot - Progressive Web App
Run `ng add @angular/pwa` to generate a progressive web app. This command automatically creates a  `manifest.json`,  `ngsw-config.json` and icons in all neccessary sizes. It also updates the `angular.json` and `package.json` with these new assets.

## Manifest
It includes metadata about the app i.e. the name of the app and the icons with their sizes and is necessary in case of installing the PWA. Therefore `manifest.json` defines these metadata:
* `name` - displayed on the splash-screen below the app icon
* `short_name` - displayed below the shortcut on the desktop or on the home screen
* `description` - a general description of the application
* `background_color` - the background color of the splash-screen
* `theme_color` - the general theme color of the application, used in the status bars for example if they are displayed
* `display` - specifies the display mode. standalone: look and feel like a standalone application. This means that the application will have its own window, its own icon in the launcher, and so on. In this mode, the user agent will exclude UI elements for controlling navigation, but can include other UI elements such as a status bar.
* `icons` - list of application icons of different resolutions, used for shortcut and splashscreen. The recommended sizes to be supplied are at least 192x192px and 512x512px. The device will automatically pick the best icon depending on the case. It is also interesting to provide a SVG vector version of the icon that will fit a maximum of sizes.
The manifest also has to be linked in the `index.html`:
```
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#1976d2">
```

## Service Worker
A Service Worker is a script in app context that is executed in the background by the browser. A Web Worker allows to do things like fire up long-running scripts to handle computationally intensive tasks, but without blocking the UI or other scripts to handle user interactions. A Service Worker works like a proxy and handels the requests to the network. So it is able to provide features like push notifications, background sync ans chaching mechanism. 
The `ngsw-config.json` is a configuration file for the service worker. This file will be used by Angular CLI when it creates the service worker itself. It is mainly used to configure the different caching strategies.
* `index`: specify the main page (usually `index.html`)
* `assetsGroups`: include the files that are part of the app and that are versioned along with the app (static files like `index.html`, javascript, css, images, fonts, etc.) We can specify here resources that are always cached
```
"installMode": "prefetch"
``` 
and those that are cached when loaded 
```
"installMode": "lazy"
```
* `dataGroups`: all the other resources/assets that are not versioned along with the app.  We can configure here two different strategies: 
1. cache first with network fallback
```
"strategy": "performance"
``` 
2. network first with cache fallback 
```
"strategy": "freshness"
```
* `appData`: allows to pass data that describes the current version of the app.

Furthermore the `ng add @angular/pwa` command registers the Service Worker in `AppModule` for production mode thereby it will be created at buildtime: 
```
ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }
```

### History
At start time of the app the `ConversationService` loads all sent and received messages of the bot from the `localStorage`. Each time a conversation message is added to the `Conversation` it is added with all the other messages to the `localStorage`, too. To delete them they have to be deleted from the `localStorage` and also from the current instance of `Conversation` class in `ConversationService` except for the the first message, the welcome or hello message. To prevent a double dispatch of this message it is only added to the coversation during initialization if there are no messages in the current `Conversation`.

### Blackboard
During the initialization process the app requests the `iwi backend` for up-to-date bulletinboard entries. Each time this request succeed the entries are also saved in the `localStorage`. If the request wasn't successful the last entries will be shown to the user out from the `localStorage`. 

## Offline Detection
The offline detection is associated with the blackboard request to the `iwi backend`. If the request was successful the connectivity is given and you are online. If not you are offline. This information is printed to the user in the toolbar. This request is neccessary because the `navigator.onLine` value is not meaningful enough. 

## SVGs / Icons
Progressive web app means that your application is also offline usable. That doesn't mean all functions should be available, too. But at least the presentation/UI should be printed correct. If you use `Angular Materials Icons` they will always be loaded lazily at runtime. But if you use the app offline this is not possible and there will be no icons printed by the browser. So in case of a pwa all icons should be available as assets that are downloaded with the app and are local chached like the css files. Therefore Anuglar provides downloading all `Angular Material Icons` you need from the `Angular Material` homepage. 