document.addEventListener('DOMContentLoaded', function (){



    var selectedTab = 0;

    mouseoverText(document.querySelector('#packetsTabButton'), document.querySelector('#packetsTabButton h'), 0);
    mouseoverText(document.querySelector('#historyTabButton'), document.querySelector('#historyTabButton h'), 1);
    mouseoverText(document.querySelector('#employeesTabButton'), document.querySelector('#employeesTabButton h'), 2);
    mouseoverIcon(document.querySelector('#packetsTabButton'), document.querySelector('#packetsTabButton img'), 0, "queue");
    mouseoverIcon(document.querySelector('#historyTabButton'), document.querySelector('#historyTabButton img'), 1, "history");
    mouseoverIcon(document.querySelector('#employeesTabButton'), document.querySelector('#employeesTabButton img'), 2, "employee");

    mouseoverText(document.querySelector('#searchButton'), document.querySelector('#searchButton'), 0);
    mouseoverText(document.querySelector('#saveSearchButton'), document.querySelector('#saveSearchButton'), 0);

    //Mouseover logic for text

    function mouseoverText(element, target, tab){
        element.addEventListener('mouseover', function(){
            target.style.color = "#2AD864";
        });
        element.addEventListener('mouseleave', function(){
            if(tab == selectedTab){
                target.style.color = "white";
            }
            else{
                target.style.color = "#767676";
            }
        });
    }

    //Mouseover logic for icons

    function mouseoverIcon(element, target, tab, partialImgName){
        element.addEventListener('mouseover', function(){
            target.src = "images/" + partialImgName + "IconMouseover.png";
        });
        element.addEventListener('mouseleave', function(){
            if(tab == selectedTab){
                target.src = "images/" + partialImgName + "IconSelected.png";
            }
            else{
                target.src = "images/" + partialImgName + "IconUnselected.png";
            }
        });
    }

});
