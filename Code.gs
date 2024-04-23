 const part = 'snippet,statistics,id,topicDetails,status,contentDetails'
 const video_upload_stamp = 1713837476679
 let descriptionTemplate = `
 Thanks for watching the video!
 the source code can be found here: https://github.com/NeonGamerBot-QK/yt-update-video
 Insporation: https://www.youtube.com/watch?v=BxV14h0kFs0
 visit my site: https://saahild.com

 --Automated Features below:

 the current view count is: {views}
 the current like count is: {likes}
 the current favorite count is: {favs}
 the current comment count is: {comments}
 the current time for how long this video has been rotting is: {time_formated}
  Diff in (views,likes,favorites,comments): ({view_diff}, {like_diff}, {favs_diff}, {comments_diff})
  -- Debug Automeated
  time since last run: {time_since_last_run}
  Last Run: {time_since_last_run_stamp}
 `
 let titleTemplate = 'Automated Video - {views}'
 let thumbNailData = () => {}
 function updateVideo () {
  //  console.log(response.items[0])
  // console.log(PropertiesService.getScriptProperties().getProperty('VIDEO_ID'))
   const video = getVideoInfo()
  // todo get from server
   let obj = JSON.parse(UrlFetchApp.fetch('https://mybot.saahild.com/yt/metadata').getContentText()) || { statistics: video.statistics, last_run: Date.now() - (240000) }
   if (obj.none) obj = { statistics: video.statistics, last_run: Date.now() - (240000) }
  // console.log(statistics)
   let {
    statistics, last_run, none
  } = obj
  // console.log(video.snippet.thumbnails.hig)
  //
  // YouTube.newVideo()

   let formatedTime = ms(Math.floor(Date.now() - video_upload_stamp))
   var resource = {
     snippet: {
       title: titleTemplate
        .split('{views}').join(video.statistics.viewCount),
       description: descriptionTemplate
        .split('{views}').join(video.statistics.viewCount)
        .split('{likes}').join(video.statistics.likeCount)
        .split('{favs}').join(video.statistics.favoriteCount)
        .split('{comments}').join(video.statistics.commentCount)
        .split('{time_formated}').join(formatedTime)
        .split('{view_diff}').join(video.statistics.viewCount - statistics.viewCount)
        .split('{like_diff}').join(video.statistics.likeCount - statistics.likeCount)
        .split('{favs_diff}').join(video.statistics.favoriteCount - statistics.favoriteCount)
        .split('{comments_diff}').join(video.statistics.commentCount - statistics.commentCount)
        .split('{time_since_last_run}').join(ms(Math.floor(Date.now() - last_run)))
        .split('{time_since_last_run_stamp}').join(Date.now()),
       categoryId: '22'
     },

     id: video.id
   }
    // video.snippet.thumbnails.default.
   console.log(resource)
   video.statistics.upload_date =
  // video.snippet.description = video.snippet.description + " test from api"
  // YouTube.Videos.update(video, part)
  // UrlFetchApp.fetch()
  YouTube.Thumbnails.set(video.id, UrlFetchApp.fetch('https://mybot.saahild.com/yt/thumbnail', {
    method: 'POST',
    payload: JSON.stringify(video.statistics),
    headers: {
      'Content-type': 'application/json'
    }
  }).getBlob())
   YouTube.Videos.update(resource, part, {'id': PropertiesService.getScriptProperties().getProperty('VIDEO_ID')})
 }
 function getVideoInfoLog () {
   console.log(getVideoInfo())
 }
 function getVideoInfo () {
   let params = {'id': PropertiesService.getScriptProperties().getProperty('VIDEO_ID')}

   var response = YouTube.Videos.list(part, params)
   return response.items[0]
 }

/**

 * Helpers.

 */

 var s = 1000

 var m = s * 60

 var h = m * 60

 var d = h * 24

 var w = d * 7

 var y = d * 365.25

/**

 * Parse or format the given `val`.

 *

 * Options:

 *

 *  - `long` verbose formatting [false]

 *

 * @param {String|Number} val

 * @param {Object} [options]

 * @throws {Error} throw an error if val is not a non-empty string or a number

 * @return {String|Number}

 * @api public

 */

 function ms (val, options) {
   options = options || {}

   var type = typeof val

   if (type === 'string' && val.length > 0) {
     return parse(val)
   } else if (type === 'number' && isFinite(val)) {
     return options.long ? fmtLong(val) : fmtShort(val)
   }

   throw new Error(

    'val is not a non-empty string or a valid number. val=' +

      JSON.stringify(val)

  )
 };

/**

 * Parse the given `str` and return milliseconds.

 *

 * @param {String} str

 * @return {Number}

 * @api private

 */

 function parse (str) {
   str = String(str)

   if (str.length > 100) {
     return
   }

   var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(

    str

  )

   if (!match) {
     return
   }

   var n = parseFloat(match[1])

   var type = (match[2] || 'ms').toLowerCase()

   switch (type) {
     case 'years':

     case 'year':

     case 'yrs':

     case 'yr':

     case 'y':

       return n * y

     case 'weeks':

     case 'week':

     case 'w':

       return n * w

     case 'days':

     case 'day':

     case 'd':

       return n * d

     case 'hours':

     case 'hour':

     case 'hrs':

     case 'hr':

     case 'h':

       return n * h

     case 'minutes':

     case 'minute':

     case 'mins':

     case 'min':

     case 'm':

       return n * m

     case 'seconds':

     case 'second':

     case 'secs':

     case 'sec':

     case 's':

       return n * s

     case 'milliseconds':

     case 'millisecond':

     case 'msecs':

     case 'msec':

     case 'ms':

       return n

     default:

       return undefined
   }
 }

/**

 * Short format for `ms`.

 *

 * @param {Number} ms

 * @return {String}

 * @api private

 */

 function fmtShort (ms) {
   var msAbs = Math.abs(ms)

   if (msAbs >= d) {
     return Math.round(ms / d) + 'd'
   }

   if (msAbs >= h) {
     return Math.round(ms / h) + 'h'
   }

   if (msAbs >= m) {
     return Math.round(ms / m) + 'm'
   }

   if (msAbs >= s) {
     return Math.round(ms / s) + 's'
   }

   return ms + 'ms'
 }

/**

 * Long format for `ms`.

 *

 * @param {Number} ms

 * @return {String}

 * @api private

 */

 function fmtLong (ms) {
   var msAbs = Math.abs(ms)

   if (msAbs >= d) {
     return plural(ms, msAbs, d, 'day')
   }

   if (msAbs >= h) {
     return plural(ms, msAbs, h, 'hour')
   }

   if (msAbs >= m) {
     return plural(ms, msAbs, m, 'minute')
   }

   if (msAbs >= s) {
     return plural(ms, msAbs, s, 'second')
   }

   return ms + ' ms'
 }

/**

 * Pluralization helper.

 */

 function plural (ms, msAbs, n, name) {
   var isPlural = msAbs >= n * 1.5

   return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '')
 }
