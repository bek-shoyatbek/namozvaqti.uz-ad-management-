

const testAds = [{
    "name": "Ad 1",
    "link": "https://www.google.com/",
    "image": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
    "location": "header"
},

{
    "name": "Ad 2",
    "link": "https://www.facebook.com/",
    "image": "https://www.facebook.com/images/fb_icon_325x325.png",
    "location": "popup"
},

{
    "name": "Ad 3",
    "link": "https://www.youtube.com/",
    "image": "https://www.youtube.com/yt/brand/assets/img/logo-yt.png",
    "location": "header"
}]

export const getHome = (req, res, next) => {
    res.render("home", { ads: testAds });
    return;
}

