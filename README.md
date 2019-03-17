## [How to apply backend API](#how-to-apply-backend-api-1)
## [How to unit test config](#how-to-unit-test-config-1)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# How to apply backend API

## `.env.production`
```
PUBLIC_URL='/'
REACT_APP_MSG_LIMIT=50
API_DOMAIN='http://192.168.1.35:3000/api'
REACT_APP_URL_API_LIST='${API_DOMAIN}/list?nextpage={{NEXT_PAGE}}'
REACT_APP_URL_API_SEND='${API_DOMAIN}/send'
REACT_APP_URL_API_HEADERS='{"token":"abc"}'
```
`PUBLIC_URL` /sub/directory/ or extract http://domain.dot/sub/directory on your server

`REACT_APP_MSG_LIMIT` override Limit length message to split

`REACT_APP_URL_API_LIST` URL fetch of list last message api `{{NEXT_PAGE}}` param is required if list longer and split pages.
Example json response from server (JSON format required)
```
{
  "nexpage": "{{NEXT_PAGE}}"
  "items": [
    {
      id: 1,
      message: "message 1"
    },
    {
      id: 2,
      message: "message 2"
    }
  ]
}
```
`{{NEXT_PAGE}}` response from server will assign to param query url on fetch next page. if send end list, response `{ "nextpage": false }`\
`items` must sort by time `new -> old`

`REACT_APP_URL_API_SEND` URL to send request message, app will send a body with format:
```
{
  "message": "Send message"
}
```
 
`REACT_APP_URL_API_HEADERS` App will send this headers with anny request. (JSON format required)
```
REACT_APP_URL_API_HEADERS='{"token":"abc", "appId": "[appid]", ...anymore }'
```
# How to unit test config
## `env.test`
```
REACT_APP_MSG_LIMIT=50
TEST_MSG_BIG_CHARS=10000
TEST_MSG_BIG_CHARS_TIME=5
TEST_MSG_CUSTOM="I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
```
`REACT_APP_MSG_LIMIT` change limit of length split message function

`TEST_MSG_BIG_CHARS` unit test will auto create a document with `10000` chars. change this to try test performance of split message with longer text

`TEST_MSG_BIG_CHARS_TIME` time limit on test performance split longer text.

`TEST_MSG_CUSTOM` unitest with custom message. u cant type `''` or `longer text non white-space` to see errors.



