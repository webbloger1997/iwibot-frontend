// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndpoints: {
    CONVERSATION_API_URL: 'https://a5c3441f.us-south.apiconnect.appdomain.cloud/iwibotapi/router',
    HSKA_STUDENT_INFO_URL: 'https://www.iwi.hs-karlsruhe.de/iwii/REST/credential/v2/info',
    BULLETIN_BOARD_NEWS_URL: 'https://www.iwi.hs-karlsruhe.de/iwii/REST/newsbulletinboard',
    HSKA_LIB_BORROWED_BOOKS_URL: 'https://www.iwi.hs-karlsruhe.de/iwii/REST/library/borrowedbooks',
    KEY_SERVICE_URL: 'https://us-south.functions.cloud.ibm.com/api/v1/web/IWIbot_dev/IWIBot/Keys.json'
  }
};
