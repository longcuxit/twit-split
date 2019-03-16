let items = [
  "Well come to TwitSplit project",
  "1/4 This is message result from virtual api from",
  "2/4 development environment, this project support",
  "3/4 responsive layout, please try it with mobile",
  "4/4 device to see some function.",
  "you can use Shift + enter\nto add break-line on msg",
  "1/2 Add more than 30 message, reload, scroll up",
  "2/2 to test load more page."
]

const bodyParser = require("body-parser");

module.exports = function(app) {
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, token');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200).end();
    } else {
      next();
    }
  })
  app.use('/api', (req, res, next) => {
    if (req.headers.token !== 'abc') {
      res.status(401).json({
        name: 'token.invalid',
        message: 'Token invalid!'
      })
    } else {
      next();
    }
  })
  app.get('/api/list', function(req, res) {
    const page = parseInt(req.query.nextpage) || items.length;
    const limit = 30;
    const from = Math.max(page-limit, 0);

    res.json({
      items: items.slice(from, page)
        .map((m, i) => ({ message: m, id: i + from }))
        .reverse(),
      nextPage: from === 0 ? false : from
    })
  });

  app.post('/api/send', function(req, res) {
    setTimeout(() => {
      res.json({
        item: {
          message: req.body.message,
          id: items.length
        }
      })
      items.push(req.body.message)
    }, 300);
  });
}