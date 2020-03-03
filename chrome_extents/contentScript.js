window.onload = function () {
    setTimeout(()=>{       
        chrome.runtime.sendMessage({},function(res){
            if(res['pbid']){
                for (const key in res['pbid']) {
                    console.log(res['pbid'][key]);
                    document.getElementById(res['pbid'][key]).style.display = "none";
                }
            }
            if(res['pbclass']){
                for (const key in res['pbclass']) {
                    console.log(res['pbclass'][key]);
                    let classDom= document.getElementsByClassName(res['pbclass'][key]);
                    for (const cls_key in classDom) {
                        classDom[cls_key].style.display = "none";
                    }
                }
            }
        });
    },3000);
    
}

