'use strict';

const uniqueRandomArray = require('unique-random-array');
const randomCache = {};

function formatResult(getRandomImage) {
    const imageData = getRandomImage();
    if (!imageData) {
        return;
    }
    return `https://imgur.com/${imageData.is_album ? imageData.album_cover : imageData.hash}${imageData.ext.replace(/\?.*/, '')}`;
}

function storeResults(images, subreddit) {
    const getRandomImage = uniqueRandomArray(images);

    randomCache[subreddit] = getRandomImage;
    return getRandomImage;
}

function randomFrog(subreddit, cacheURL) {
    subreddit = (typeof subreddit === 'string' && subreddit.length !== 0) ? subreddit : 'frogs';

    if (randomCache[subreddit]) {
        return Promise.resolve(formatResult(randomCache[subreddit]));
    }

    var url = typeof cacheURL === 'string' ? cacheURL : `https://imgur.com/r/${subreddit}/hot.json`;
    return require('got')(url, {json: true})
        .then(response => storeResults(response.body.data, subreddit))
        .then(getRandomImage => formatResult(getRandomImage));
}

function callback(subreddit, cb, cacheURL) {
    randomFrog(subreddit, cacheURL)
        .then(url => cb(null, url))
        .catch(err => cb(err));
}

// subreddit is optional
// callback support is provided for a training exercise
module.exports = (subreddit, cb, cacheURL) => {
    if (typeof cb === 'function') {
        callback(subreddit, cb, cacheURL);
    } else if (typeof subreddit === 'function') {
        callback(null, subreddit, cacheURL);
    } else {
        return randomFrog(subreddit, cacheURL);
    }
};
