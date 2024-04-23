const router = require('express').Router()
const express = require('express')
const app = express()
const Canvas = require('@napi-rs/canvas')
const path = require('path')
Canvas.GlobalFonts.registerFromPath(path.join(__dirname, './fonts/Poppins-Light.ttf'), 'Poppins')
let metadata = null
router.get('/metadata', (req, res) => {
  res.json(metadata || { none: true })
})
router.post('/thumbnail', async (req, res) => {
    // { }
  const body = { statistics: req.body, last_run: Date.now() }
  console.log(body)
  metadata = body
    // wait a min
  const canvas = Canvas.createCanvas(1280, 720)
  const ctx = canvas.getContext('2d')
    //
  ctx.font = '800 80px Poppins'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#33333'
  ctx.fillRect(0, 0, 1280, 720)
  ctx.fillStyle = '#fff'
  ctx.strokeStyle = '#696969'
  ctx.fillText(`Automated Video - ${body.statistics.viewCount}`, 500, 100)
  ctx.font = '800 40px Poppins'

  ctx.fillText(`Views: ${body.statistics.viewCount}`, 550, 650)
  ctx.fillText(`Likes: ${body.statistics.likeCount}`, 950, 650)
  ctx.fillText(`Comments: ${body.statistics.commentCount}`, 150, 650)
  ctx.font = 'bold 800 200px Poppins'
  ctx.fillStyle = '#FF0000'
  ctx.fillText(require('ms')(Date.now() - 1713837476679), 500, canvas.height / 2)
  res.set({ 'Content-Type': 'image/png' })
  res.end(await canvas.encode('png'))
    // ctx.fillText(`Day ${i + 1}`, , y)
    // ctx.strokeText(`Day ${i + 1}`, x, y)
})
app.use('/yt', router)

app.listen(process.env.PORT || 3000, () => {
 console.log('on ::3000')   
})