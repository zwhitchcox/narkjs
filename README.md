#nark#
Node, Angular, RethinkDb, Koa Framework

Made for my personal use and the websites I design.

Key technologies:

gulp, angular material, jade

##FAQ##

### General

*How do I write server side code?*

all files with the extension ```sjs``` will be dependency injected with ```nark```. from here, you can do all kinds of things like routing, events, or whatever

```js
module.exports = logs

function logs(nark) {
  nark.on('auth added', function() {
    nark.router.get('/api/logs', nark.auth.isAuth(),function* logs() {
      this.body = [{
          id: 1,
          description: 'Started Job Process!',
        } ,{
          id: 2,
          description: 'Completed Job Process!',
          date: new Date
      }]

    })
  })
}
```

### Routing

*How do I route REST API requests?*

use ```nark.router```

```js
nark.router.get('/api/logs', function* logs() {
  this.body = [{
      id:1,
      description: 'Started Job Process!',
      date: new Date() - 60000 * 50
    }, {
      id:2,
      description: 'Completed Job Process!',
      date: new Date()
  }]
})
```

### Login

*How do I check if a user is logged in on the client side?*

use the abstract state, 'cl' (for 'client logged in'), which will redirect to the log in page if the user is not logged in

```js
$state('cl.mypage', {
  url: '/myurl',
  templateUrl:'mytemplate.html',
  controller: 'MyCtrl',
  controllerAs: 'mine'
})
```

*How do I check if a user is logged in on the server side?*

use the ```nark.auth.isAuth``` function to check if the user is logged in before serving the content

```js
nark.router.get('/api/logs', nark.auth.isAuth(), function* logs() {
  this.body = [{
      id:1,
      description: 'Started Job Process!',
      date: new Date() - 60000 * 50
    }, {
      id:2,
      description: 'Completed Job Process!',
      date: new Date()
  }]
})
