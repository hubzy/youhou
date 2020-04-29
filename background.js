var server = 'http://www.huke886.xyz/app2.php';


$(function(){
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.jiexi){
      let t_id=sender.tab.id
      $.ajax({
        type: "POST",
        url: server,
        data: request.jiexi,
        success: function(result){
            // console.log(result);
            
            try {
              let _jiexiJson=JSON.parse(result)
              // console.log(_jiexiJson);
              _jiexiJson.type=request.jiexi.type
              chrome.tabs.sendMessage(t_id,{_jiexiJson:_jiexiJson }, function(response) {
                if(chrome.runtime.lastError){

                }
                
              })

              
              
            } catch (error) {
              chrome.storage.sync.remove("token")
              alert("开启已失效，请重新开启后再试")
            }
           /*  if(result.code){
                if(result.code == -1){
                    error(result.msg);
                    chrome.storage.sync.remove('token', function(items) {});
                    return;
                }
                success('解析成功！')
                if(result.type == 'mp4'){
                    playMp4(result.url, '#huke88-video');
                }else{
                    playM3u8(result.url, '#huke88-video');
                }
            }else{
                error(result.msg);
            } */
        }
    });
    }
  })
})