"use strict";
const AD_API = "https://begi.uz";
const USER_ID_KEY = "userId";
const POPUP_SHOWN_KEY = "popupShown";

const loadDependencies = () => {
  return Promise.all([
    loadScript("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"),
    loadScript("https://cdn.jsdelivr.net/npm/sweetalert2@11"),
  ]);
};

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

const getUserId = () => {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
};

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const fetchAds = async () => {
  try {
    const response = await axios.get(`${AD_API}/get-ads`);
    return response.data;
  } catch (err) {
    console.error("Error fetching ads:", err);
    return [];
  }
};

const handleIncrement = async (id, prop) => {
  try {
    await axios.get(
      `${AD_API}/handle-increment?id=${id}&prop=${prop}&userId=${getUserId()}`
    );
  } catch (err) {
    console.error("Error handling increment:", err);
  }
};

const createAdElement = (ad, type) => {
  const a = document.createElement("a");
  a.href = ad.link;
  a.id = `${type}_${ad._id}`;
  a.target = "_blank";

  const img = document.createElement("img");
  img.src = `${AD_API}/images/${ad.image}`;
  img.style.maxWidth = "100%";
  img.style.height = "auto";

  const text = document.createElement(type === "header" ? "h2" : "h1");
  text.textContent = ad.name;

  a.appendChild(img);
  a.appendChild(text);

  return a;
};

const showPopup = (popupElement) => {
  Swal.fire({
    html: popupElement.outerHTML,
    customClass: {
      popup: "transparent-popup",
    },
    allowOutsideClick: false,
    cancelButtonText: "Yopish",
    timer: 7000,
    showCancelButton: true,
    showConfirmButton: false,
  });
};

const initAds = async () => {
  await loadDependencies();

  const ads = await fetchAds();
  const header = ads.find((ad) => ad.location === "header");
  const popup = ads.find((ad) => ad.location === "popup");

  const adHeader = document.getElementById("ads");
  if (header) {
    const headerElement = createAdElement(header, "header");
    adHeader.appendChild(headerElement);
    await handleIncrement(header._id, "view");

    headerElement.addEventListener("click", () =>
      handleIncrement(header._id, "click")
    );
  } else {
    adHeader.remove();
  }

  if (popup) {
    const today = new Date().getDay().toString();
    const popupTimer = localStorage.getItem(POPUP_SHOWN_KEY);

    if (popupTimer !== today) {
      localStorage.setItem(POPUP_SHOWN_KEY, today);
      const popupElement = createAdElement(popup, "popup");
      showPopup(popupElement);
      await handleIncrement(popup._id, "view");

      popupElement.addEventListener("click", () =>
        handleIncrement(popup._id, "click")
      );
    }
  }
};

document.addEventListener("DOMContentLoaded", initAds);
