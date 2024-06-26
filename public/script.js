const AD_API = "https://begi.uz";
// const AD_API = "https://z73fb93d-2000.euw.devtunnels.ms";

let userId = localStorage.getItem("userId");

if (!userId) {
  userId = generateUUID();
  localStorage.setItem("userId", userId);
}

console.log("userId", userId);

document.addEventListener("DOMContentLoaded", async () => {
  let today = new Date().getDay();
  const popupTimer = localStorage.getItem("popupShown");

  const body = document.querySelector("body");
  const adHeader = document.getElementById("ads");

  const ads = await getAds();

  console.log("Ads ", ads);

  let header;
  let popup;

  if (ads?.length > 0) {
    ads.forEach((e) => {
      if (e.location == "header") {
        header = e;
      }
      if (e.location == "popup") {
        popup = e;
      }
    });
  }
  if (!header) {
    body.removeChild(adHeader);
  }

  if (header) {
    await handleIncrement(header._id, "view");
  }
  // Show the popup only once per day and not when it was already shown before
  if (popup && !popupTimer) {
    await handleIncrement(popup._id, "view");
  }

  console.log("Header ", header);
  console.log("Popup ", popup);

  if (header) {
    const headerHtml = `
        <a href="${header.link}" id="header_${header._id}" target="_blank">
        <div id="ad_text">
        <h2>${header.name}</h2>
        </div>
        <img src="${AD_API + "/images/" + header.image}" id="ads_img">
        </a>  
        `;

    adHeader.innerHTML = headerHtml;
  }

  if (popup) {
    const popupHtml = `
        <a href="${popup.link}" id="popup-link_${
      popup._id
    }" style="max-width:100%;height:auto;" target="_blank">
          <img style="max-width:100%;height:auto;" src="${
            AD_API + "/images/" + popup.image
          }">
             <h1 class="popup_text">${popup.name}</h1>
        </a>
      `;

    if (popupTimer !== today.toString()) {
      localStorage.setItem("popupShown", today.toString());
      swal.fire({
        html: popupHtml,
        customClass: {
          popup: "transparent-popup",
        },
        allowOutsideClick: false,
        cancelButtonText: "Yopish",
        timer: 7000,
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  }

  let headerAd;
  let popupLink;

  if (header) {
    headerAd = document.getElementById("header_" + header._id);
  }

  if (popup) {
    popupLink = document.getElementById("popup-link_" + popup._id);
  }
  // click on the main ad opens the pop up window
  headerAd &&
    headerAd.addEventListener("click", async () => {
      await handleIncrement(header._id, "click");
    });
  // clicking on the button in the pop up closes it and shows another random advertis
  popupLink &&
    popupLink.addEventListener("click", async () => {
      await handleIncrement(popup._id, "click");
    });
});

function closeModal() {
  popper.style.display = "none";
}

// functions

async function handleIncrement(id, prop) {
  try {
    const response = await axios.get(
      `${AD_API}/handle-increment?id=${id}&prop=${prop}&userId=${userId}`
    );

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

async function getAds() {
  try {
    const ads = await axios.get(AD_API + "/get-ads");

    return ads.data;
  } catch (err) {
    console.error(err);
  }
}

function generateUUID() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    const random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
}
