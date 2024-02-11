function randomLength() {
    const lengths = [600, 650, 625, 575, 700, 675];
    let randNum = Math.floor(Math.random() * lengths.length);
    return lengths[randNum];
}

function createButton(className, innerHTML) {
    let button = document.createElement("button");
    button.className = className;
    button.innerHTML = innerHTML;
    return button;
}

async function fetchData() {
    try {
        let response = await fetch(url + `?page=${pageNo}`, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch the data");
        }

        const data = await response.json();
        current_url = url + `?page=${pageNo}`;

        let parent = document.querySelector(".pic-ul-list");

        data.photos.forEach(photo => {
            let listitem = document.createElement("li");
            listitem.style.backgroundImage = `url()`;
            listitem.className = "pic-card-li";
            listitem.style.height = randomLength() + "px";

            
            let button1 = createButton("pic-upper-details-button1", '<i class="fa-regular fa-heart"></i>');
            let button2 = createButton("pic-upper-details-button", '<i class="fa-solid fa-copy"></i>');
            let button3 = createButton("pic-lower-details-button", `<i class="fa-solid fa-camera-retro"></i> ${photo.photographer}`);
            let button4 = createButton("download-button", "Download");

            
            listitem.appendChild(button1);
            listitem.appendChild(button2);
            listitem.appendChild(button3);
            listitem.appendChild(button4);

            parent.appendChild(listitem);
        });

    } catch (err) {
        console.log("Error", err.message);
    }
}

function searchfunction() {
    let searchQuery = document.querySelector("#search-text").value;
    pageNo = 1;
    const search_url_format = "";

    async function SearchData() {
        try {
            let response = await fetch(search_url_format, {
                headers: {
                    'Authorization': apiKey
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the data");
            }

            const data = await response.json();
            current_url = search_url_format;

            
            document.querySelector(".pic-ul-list").innerHTML = "";

            let parent = document.querySelector(".pic-ul-list");

            data.photos.forEach(photo => {
                let listitem = document.createElement("li");
                listitem.style.backgroundImage = `url(${photo.src.large2x})`;
                listitem.className = "pic-card-li";
                listitem.style.height = randomLength() + "px";

                
                let button1 = createButton("pic-upper-details-button1", '<i class="fa-regular fa-heart"></i>');
                let button2 = createButton("pic-upper-details-button", '<i class="fa-solid fa-copy"></i>');
                let button3 = createButton("pic-lower-details-button", `<i class="fa-solid fa-camera-retro"></i> ${photo.photographer}`);
                let button4 = createButton("download-button", "Download");

                
                listitem.appendChild(button1);
                listitem.appendChild(button2);
                listitem.appendChild(button3);
                listitem.appendChild(button4);

                parent.appendChild(listitem);
            });

        } catch (err) {
            console.log("Error", err.message);
        }
    }

    SearchData();
}

function loadmore() {
    pageNo++;
    console.log(pageNo);

    async function fetchMoreData() {
        try {
            let response = await fetch(url + `?page=${pageNo}`, {
                headers: {
                    'Authorization': apiKey
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch the data");
            }

            const data = await response.json();
            current_url = url + `?page=${pageNo}`;

            let parent = document.querySelector(".pic-ul-list");

            data.photos.forEach(photo => {
                let listitem = document.createElement("li");
                listitem.style.backgroundImage = `url(${photo.src.large2x})`;
                listitem.className = "pic-card-li";
                listitem.style.height = randomLength() + "px";

                
                let button1 = createButton("pic-upper-details-button1", '<i class="fa-regular fa-heart"></i>');
                let button2 = createButton("pic-upper-details-button", '<i class="fa-solid fa-copy"></i>');
                let button3 = createButton("pic-lower-details-button", `<i class="fa-solid fa-camera-retro"></i> ${photo.photographer}`);
                let button4 = createButton("download-button", "Download");

                
                listitem.appendChild(button1);
                listitem.appendChild(button2);
                listitem.appendChild(button3);
                listitem.appendChild(button4);

                parent.appendChild(listitem);
            });

        } catch (err) {
            console.log("Error", err.message);
        }
    }

    fetchMoreData();
}

document.addEventListener("scroll", () => {
    let totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    let liveScroll = window.scrollY;

    if (liveScroll === totalScroll) {
        loadmore();
    }
});


fetchData();

function downloadImg(imgUrl) {
    fetch(imgUrl)
    .then(res => res.blob())
    .then(blob => {
        let anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = new Date().getTime(); 
        anchor.click();
    })
    .catch(error => console.error('Error downloading image:', error));
}


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('download-button')) {
        let imgUrl = event.target.parentElement.style.backgroundImage.slice(5, -2);
        downloadImg(imgUrl);
    }
});
