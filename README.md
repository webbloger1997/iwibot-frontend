# IWIBot - Front-End

## Getting your environment set up  
1. Make sure you have installed a Node.js runtime and the node package manager (npm) for your OS.  
You can get it from [here](https://nodejs.org/en/download/).
2. Install the [Angular CLI](https://github.com/angular/angular-cli) globally `npm install -g @angular/cli`
3. If you haven't got git... [go get it](https://git-scm.com/downloads). 
Then clone the Github project with `git clone https://github.com/HSKA-IWI-VSYS/iwibot-frontend`.
4. Navigate to root directory of the project
5. Run `npm install` to install the dependencies  
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/` in a Chrome Web-Browser! The app will automatically reload if you change any of the source files.

## Environment configuration

If you have deployed your own [iwibot-openwhisk](https://github.com/HSKA-IWI-VSYS/iwibot-openwhisk) Back-End and want to configure the Front-End to use your deployed Back-End:
1. Navigate to `src/environments`
2. Change `CONVERSATION_API_URL` in `environment.prod.ts` and `environment.ts`  to fit your conversation api url.

Steps to find your `CONVERSATION_API_URL`
1. Make sure you have deployed [iwibot-openwhisk](https://github.com/HSKA-IWI-VSYS/iwibot-openwhisk)
2. Run `ibmcloud wsk api list` in your console
3. Find the URL that ends with `/iwibot/router` and copy it
 
## Deploying the Front-End to GitHub Pages

We use [angular-cli-ghpages](https://github.com/angular-schule/angular-cli-ghpages) to deploy the project to GitHub Pages.

1. Run `ng build --prod --base-href "https://user-name.github.io/repo/"
2. Run `ngh` to the deploy the build to GitHub Pages

## Code scaffolding

* Run `ng generate component conversation` to generate a component named conversation
* Run `ng generate service conversation` to generate a service named conversation
* Run `ng generate directive conversation` to generate a directive named conversation.  

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.  

For more details see [here](https://scotch.io/tutorials/use-the-angular-cli-for-faster-angular-2-projects#toc-generate-parts-of-your-application)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

For more details on how to build the application see [here](https://scotch.io/tutorials/use-the-angular-cli-for-faster-angular-2-projects#toc-building-our-app)

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Progressive Web App
See [Documentation PWA] (doku/pwa.md)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
