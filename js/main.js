let nasaRepository = (function () {
  let nasaList = [];
  let apiUrl =
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=qLtIvdha3bGO0wOj6I6aKVWVvcHeiwgYQV7ARGQf";
  let loader = document.querySelector(".loading");
  let add = (e) => {
    // checking if the data is in object form or not
    if (typeof e === "object") {
      nasaList.push(e);
    } else {
      return;
    }
  };

  let getAll = () => {
    return nasaList;
  };

  let addListItem = (p) => {
    let nasa_list = document.querySelector(".nasa_list");
    let listItem = document.createElement("li");

    let nasaImgName = document.createElement("h1");
    nasaImgName.innerText = p.name;
    nasaImgName.classList.add("imageTitle");

    let nasaImage = document.createElement("img");
    nasaImage.classList.add("nasa_img");
    nasaImage.src = p.detailsUrl;

    let nasaDate = document.createElement("p");
    nasaDate.classList.add("date");
    nasaDate.innerText = p.date;

    let likeBtn = document.createElement("button");
    likeBtn.classList.add("like_btn");
    // likeBtn.innerText = "Like";

    listItem.appendChild(nasaImgName);
    listItem.appendChild(nasaImage);
    listItem.appendChild(nasaDate);
    listItem.appendChild(likeBtn);
    nasa_list.appendChild(listItem);

    likeBtn.addEventListener("click", function () {
      likeBtn.classList.toggle("animate");
    });
  };

  let loadList = () => {
    showLoading();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoading();
        json.photos.forEach(function (item) {
          let nasaItem = {
            name: item.camera.full_name,
            detailsUrl: item.img_src,
            date: item.earth_date,
          };
          add(nasaItem);
        });
      })
      .catch(function (e) {
        hideLoading();
        console.error(e);
      });
  };

  let showLoading = () => {
    loader.classList.remove("hide");
  };
  let hideLoading = () => {
    loader.classList.add("hide");
  };

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };
})();

nasaRepository.loadList().then(function () {
  // Now the data is loaded!
  nasaRepository.getAll().forEach(function (n) {
    nasaRepository.addListItem(n);
  });
});
