// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH0_DOMAIN: 'dev-zbkq8g6udtaljwys.eu.auth0.com',
  AUTH0_CLIENT_ID: '3adFkouZ6Z3mTVxgKUpILjKF2gXI1TGx',
  API_AUDIENCE: 'https://localhost:8000',
  redirectUri: 'http://localhost:8100/home',
  AUTH0_CLIENT_SECRET: 'HeXRXxjoU4HDxaCHhl1UoXTPBMWoj2aaqQ4vLIdwSZdS0GqByJfOTb-CYSXGqRQj'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
