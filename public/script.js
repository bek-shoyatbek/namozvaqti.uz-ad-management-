const API = "http://localhost:2000";

document.addEventListener("DOMContentLoaded", async () => {

    let today = new Date().getDate();
    const popupTimer = localStorage.getItem('popupShown');

    const adHeader = document.getElementById("ad_header");


    async function getAds() {
        try {
            const ads = await axios.get(API + "/get-ads");

            return ads.data;
        } catch (err) {
            console.error(err);
        }
    }

    (async () => {
        const ads = await getAds();
        console.log(ads);
        let header = null;
        let popup = null;
        ads.forEach((e) => {
            if (e.location == "header") {
                header = e;
            }
            if (e.location == "popup") {
                popup = e;
            }
        });

        const headerHtml = `
    <a href="${header.link}">
    <div id="ad_text">
    <h2>${header.name}</h2>
    </div>
    <img src="${API + "/images/" + header.image}" id="yandex_ad">
    </a>  
    `;

        adHeader.innerHTML = headerHtml;

        const popupHtml = `
        <a href="${popup.link}" id="popup-link" style="width:90%;height:90%;">
          <img style="width:90%;height:90%;" src="${API + "/images/" + popup.image}">
             <h1>${popup.name}</h1>
        </a>
      `;

        if (popupTimer !== today.toString()) {
            localStorage.setItem('popupShown', today.toString());
            swal.fire({
                html: popupHtml,
                allowOutsideClick: false,
                cancelButtonText: 'Yopish',
                showCancelButton: true,
                showConfirmButton: false,
            });
        }
    })();
});
