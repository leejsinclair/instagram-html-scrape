# Instagram HTML Scrape

Request public posts from Instagram. Because it's hard to create a production ready application that uses Instagram without access to public posts.

**NOTE**: Once your application is up and running, don't forget to apply for real API keys from Instagram.

## Installation

```
npm install --save instagram-html-scrape
```

## Usage

```
import GetInstagramPosts from 'instagram-html-scrape'

const instagramGetPosts = new GetInstagramPosts('instagram')
    .request()
    .then( (posts) => {
        console.log( posts );
    })
```

## Response format

```
[
    {
        "caption": "Happy Birthday legend! Deserve the best day full of PlayStation and whatever you want. #5",
        "image":"https://instagram.fbne5-1.fna.fbcdn.net/vp/7010d2a6c541424252770b64b0c9fa80/5C923847/t51.2885-15/e35/37219532_245570752726277_7970591679327502336_n.jpg",
        "link": "https://www.instagram.com/p/Bl15qGxALcL/",
        "is_video": false,
        "timestamp": 1532924484000
    }
]
```