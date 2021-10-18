import express from 'express';
// import cheerio from 'cheerio';
// import https from 'https';
import axios from 'axios';

// Route config
const router = express.Router(); // Create a new router object to handle requests.


router.get('/', (req, res) => {


  var url = "https://time.com";
  axios.get(url)
    .then((resp) => {
      var stringHTML = resp.data.replace(/\n/g, "");;

      var latestNews = [];
      const result = stringHTML.match(/<ol.*class\s*=\s*["'].*swipe-h.*["']\s*>(.*)<\/ol>/);
      result[0].replace(/<h2 class=["'][^"]*?title[^"]*?['"]>(.*?)<\/h2>/g, function (match, res) {

        latestNews.push(
          {
            title: res.split('>')[1].split('<')[0],
            link: url + res.split('=')[1].split('>')[0]
          }
        );

      });
      // console.log(latestNews);
      res.json(latestNews);

    }).catch((err) => {
      console.log(err.message);
      res.status(400).json({ status: -1, message: "Oops! something went wrong" });
    });








  /** 
  * Description: In this portion of code I have used cheerio package for HTML parsing.
  
  const url = "https://time.com";
  https.get(url, resp => {
   let data = '';
   resp.on('data', chunk => {
     data += chunk;
   });
   resp.on('end', () => {
     const $ = cheerio.load(data);
  
     var latestNews = []
     var docArticle = $('section.latest').find("h2").each((i, el) => {
  
       latestNews.push(
         {
           title: $(el).find('a').text(),
           link: url + $(el).find('a').attr('href')
         }
       );
  
     });
  
     // console.log(docArticle);
     res.send(latestNews);
   })
  }).on('error', err => {
   console.log(err.message);
  });
  
  */


});

export default router;






