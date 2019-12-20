function loadAfterRefresh() {
    if (localStorage.getItem('siteList')){
        var siteList = JSON.parse(localStorage.getItem('siteList'));
        for (i=0;i<siteList.length;i++) {
            let item = document.createElement("li");
            item.innerHTML = siteList[i];
            //console.log(item);
            document.getElementById("urlList").appendChild(item);
        }

        var deleteLink = document.querySelectorAll('.delBtn');
        for (i=0;i<deleteLink.length;i++) {
            deleteLink[i].addEventListener('click', deleteSite);
        }
    }
}

// To save and reload
function update() {
    var siteList = [];
    var siteData = [];
    var arr = document.getElementById("urlList").getElementsByTagName("li");
    for (i=0;i<arr.length;i++) {
        siteList.push(arr[i].innerHTML);
    }
    localStorage.setItem('siteList', JSON.stringify(siteList));
    for (i=0;i<arr.length;i++) {
        siteData.push(arr[i].textContent);
    }
    localStorage.setItem('siteData', JSON.stringify(siteData));
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}

function addSite() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var txt = document.createTextNode(inputValue);
    li.appendChild(txt);
    var deleteBtn = document.createElement("BUTTON");
    deleteBtn.className = 'delBtn';
    deleteBtn.innerHTML = '<img>';
    deleteBtn.addEventListener('click', deleteSite);
    li.appendChild(deleteBtn);
    //console.log(li);
    document.getElementById("urlList").appendChild(li);
    document.getElementById("myInput").value = "";
}

// Delete single URL
function deleteSite() {
    var parent = this.parentElement;
    //console.log(parent);
    parent.remove();
    update();
}

// Remove all URLs
function clickRmv() {
    //console.log('rmv');
    localStorage.clear();
    location.reload();
}

function clickAdd() {
    if(validURL(document.getElementById("myInput").value)){
        addSite();
        update();
        var siteList = JSON.parse(localStorage.getItem('siteList'))
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load sites back up
    loadAfterRefresh();

    // Add URL
    // Hit enter key to add sites
    document.onkeydown=function() {
        if(window.event.keyCode=='13'){
            if(validURL(document.getElementById("myInput").value)){
                addSite();
                update();
            }
        }
    }

    var addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', function() {
        clickAdd();
    });

    var rmvBtn = document.getElementById('rmvBtn');
    rmvBtn.addEventListener('click', function() {
        clickRmv();
    });


});
