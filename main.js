let selectedUserId = null;

let users = new XMLHttpRequest();
users.open("GET", "https://jsonplaceholder.typicode.com/users");
users.send();

users.onload = function () {
    if (this.status === 200 && this.readyState === 4) {
        let jsUsers = JSON.parse(this.responseText);

        let left = document.querySelector(".left");

        for (let i = 0; i < jsUsers.length; i++) {
            let inLeft = document.createElement("div");
            let myHead = document.createElement("h4");
            let myP = document.createElement("p");

            myHead.innerHTML = jsUsers[i].name;
            myP.innerHTML = jsUsers[i].email;

            myHead.style.cssText = "margin:0";
            myP.style.cssText = "margin:0;font-size:14px";
            inLeft.style.cssText = "padding:10px 24px;background-color:#eee;border-radius:40px;margin-bottom:20px;cursor:pointer";

            inLeft.append(myHead, myP);
            left.append(inLeft);

            inLeft.addEventListener("click", function () {
                let allLeft = left.querySelectorAll("div");
                allLeft.forEach(e => {
                    e.classList.remove("active");
                });
                inLeft.classList.add("active");

                selectedUserId = jsUsers[i].id;

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                fetchPosts(selectedUserId);
            });
        }
    }
}

function fetchPosts(userId) {
    let right = document.querySelector(".right");
    right.innerHTML = "";

    let posts = new XMLHttpRequest();
    posts.open("GET", `https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    posts.send();

    posts.onload = function () {
        if (this.status === 200 && this.readyState === 4) {
            let jsPosts = JSON.parse(this.responseText);

            for (let i = 0; i < jsPosts.length; i++) {
                let inRight = document.createElement("div");
                let myHead = document.createElement("h3");
                let myP = document.createElement("p");

                myHead.style.cssText = "padding-bottom:15px;border-bottom:1px solid #bfbcbc;margin-bottom:14px";
                inRight.style.cssText = "background-color:white;padding:12px 20px; margin-bottom:20px";

                if (jsPosts[i] === jsPosts[jsPosts.length - 1]) {
                    inRight.style.margin = "0";
                }
                myHead.innerHTML = jsPosts[i].title;
                myP.innerHTML = jsPosts[i].body;
                inRight.append(myHead, myP);

                right.append(inRight);
            }
        }
    }
}

