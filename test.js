import test from 'ava'
import randomFrog from './'

function getImageURL (imageData) {
  if (!imageData) {
    return
  }
  return `https://imgur.com/${imageData.is_album ? imageData.album_cover : imageData.hash}${imageData.ext.replace(/\?.*/, '')}`
}

const imgurRegEx = /^https?:\/\/(\w+\.)?imgur.com\/[a-zA-Z0-9]+(\.[a-zA-Z]{3})?(#[a-zA-Z]*)?$/

test('get random', async t => {
  const result = await randomFrog()
  t.regex(getImageURL(result), imgurRegEx)
})

test.cb('use callback', t => {
  t.plan(2)
  randomFrog((err, result) => {
    t.falsy(err)
    t.regex(getImageURL(result), imgurRegEx)
    t.end()
  })
})

test.cb('use callback and different subreddit', t => {
  t.plan(2)
  randomFrog('aww', (err, result) => {
    t.falsy(err)
    t.regex(getImageURL(result), imgurRegEx)
    t.end()
  })
})

test('get more random', async t => {
  const result1 = await randomFrog()
  t.regex(getImageURL(result1), imgurRegEx)
  const result2 = await randomFrog()
  t.regex(getImageURL(result2), imgurRegEx)
  const result3 = await randomFrog()
  t.regex(getImageURL(result3), imgurRegEx)
  const result4 = await randomFrog()
  t.regex(getImageURL(result4), imgurRegEx)
})

test('different subreddit', async t => {
  const result1 = await randomFrog('aww')
  t.regex(getImageURL(result1), imgurRegEx)
  const result2 = await randomFrog('aww')
  t.regex(getImageURL(result2), imgurRegEx)
  const result3 = await randomFrog('aww')
  t.regex(getImageURL(result3), imgurRegEx)
  const result4 = await randomFrog('aww')
  t.regex(getImageURL(result4), imgurRegEx)
})

test('invalid subreddit', async t => {
  const result1 = await randomFrog('23rkljr2klj3')
  t.falsy(getImageURL(result1))
  const result2 = await randomFrog('')
  t.regex(getImageURL(result2), imgurRegEx)
  const result3 = await randomFrog({})
  t.regex(getImageURL(result3), imgurRegEx)
  const result4 = await randomFrog(false)
  t.regex(getImageURL(result4), imgurRegEx)
})
