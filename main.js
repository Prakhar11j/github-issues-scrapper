const  url = "https://github.com/topics"
const cheerio = require('cheerio')
const request = require('request')

page1(url)

function page1(url){
    request(url,function cb(err,response,html){
        if(err){
            console.log(err);
        }
        let $ = cheerio.load(html)
        let topics = $(".no-underline.d-flex.flex-column.flex-justify-center")
        for(let i=0;i<topics.length;i++){
            let link = "https://github.com" + $(topics[i]).attr("href")
            page2(link)
        }
    })
}

function page2(link){
    request(link,function cb2(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            let $ = cheerio.load(html)
            let anchor = $(".d-flex.flex-justify-between.my-3 .d-flex.flex-auto")
            console.log($(".h1").text());
            console.log('```````````````````````');
            for(let i=0;i<8;i++){
                let hrefArr = $(anchor[i]).find("a")
                let link2 = "https://github.com" + $(hrefArr[1]).attr("href") + "/issues"
                page3(link2)
            }
        }
    })
}

function page3(link2){
    request(link2,function cb3(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            let $ = cheerio.load(html)
            let anchor = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
            for(let i=0;i<anchor.length;i++){
                let issueTitle = $(anchor[i]).attr("href")
                console.log(issueTitle);
            }
        }
    })
}
