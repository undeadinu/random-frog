# random-frog

Fork of [dylang/random-puppy](https://github.com/dylang/random-puppy)

> Get a random frog image url.

<img src="http://i.imgur.com/0zZ8m6B.jpg" width="300px">

## Install

```
$ npm install --save random-frog
```


## Usage

```js
const randomFrog = require('random-frog');

randomFrog()
    .then(url => {
        console.log(url);
    })

//=> 'http://imgur.com/IoI8uS5.jpg'
```


## API

### `randomFrog()`

Returns a `promise` for a random frog image url from http://imgur.com/ from https://www.reddit.com/r/frog

### `randomFrog(subreddit)`

Returns a `promise` for a random image url from the selected subreddit. *Warning: We cannot promise it will be a image of a frog!*

## Notes

* Node 4 or newer.
* Caches results from imgur in memory.
* Created for the purpose of using in a training exercise on different ways to do async in JavaScript at [Opower](https://opower.com/).

## License

MIT © [Dylan Greene](https://github.com/dylang)
