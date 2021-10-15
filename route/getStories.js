import express from 'express';
import cheerio from 'cheerio';
import https from 'https';

// Route config
const router = express.Router(); // Create a new router object to handle requests.


router.get('/', (req, res) => {


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

});

export default router;






