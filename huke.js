chrome.storage.sync.get({token: ''}, function(items) {
    if(!items.token){
        error('请先开启插件');
    }else{
        success('准备就绪');
    }
});

// $('#huke88-video').unbind('click');
$('#download-case-js').unbind('click');
$('#see-other-content').unbind('click');
$('.vip-info').remove();
$('.layui-layim-min').remove();
$('#loginModal').hide().css({'left':'-9999px','top':'-9999px'});
$('#reply-tip').remove();
$('#VideoFreeLimitContainer').remove();
setTimeout(() => {
    if($('#loginModal').length)
        $('#loginModal').remove();
},2000);
var server = 'http://www.huke886.xyz/app2.php';
let _json

$('body').on('click','#huke88-video',function(){
    // console.log('click');
    if($('#loginModal').length)
        $('#loginModal').remove();
    
    if($(this).find('#dplayer').length){
        return false
    }
    chrome.storage.sync.get({token: ''}, function(items) {
        if (!items.token) {
            error('请先开启插件');
            $('#design-popup-login').show();
            return;
        }else{
			
			
            if(!!_json  && !!_json.video_url_tx){
				
				if(!!_json.notime){
					
					success('还剩：'+_json.notime+'秒')
					
				}else{
					success(_json.notime)
                playMp4(_json.video_url_tx, '#huke88-video');
				}
                
            }
            else{
				
				
				
				
                success('正在编译...')

                let arr=location.href.match(/[a-z]\/(.*)\.html/)[1].split('/')
                let id=arr[arr.length-1]
                // console.log(id);
                let jiexi={
                    id:id,
                    n : 1,
                    cookie : items.token,
                    type:'look'
                }
                chrome.runtime.sendMessage({jiexi:jiexi }, function(response) {
                    if(chrome.runtime.lastError){

                    }
                })
            }
            
        }
    });
    // $('#huke88-video').unbind('click');
    return false;
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request._jiexiJson){
        // console.log(request._jiexiJson);
        _json=request._jiexiJson
        if($('#loginModal').length)
            $('#loginModal').remove();
        
        if(_json.type =='look'){
          
		   if(!!_json.notime){
			    success('还剩：'+_json.notime+'秒')
		   }else{
			 success('编译成功！')
            playMp4(_json.video_url_tx, '#huke88-video');
		   }
		  
        }
        else{
            if(_json.type == 'down_B'){
                if(_json.download_urlB){
                    success('编译成功！')
                    _json.download_urlB=decodeURIComponent(_json.download_urlB)
                    window.open(_json.download_urlB);
                }
                else{
                    error('此视频未提供本课素材');
                }
                
            }
            else{
                if(_json.download_urlY){
                    success('解析成功！')
                    _json.download_urlY=decodeURIComponent(_json.download_urlY)
                    window.open(_json.download_urlY);
                }
                else{
                    error('此视频未提供源文件，无法下载');
                }
            }
        }
        
        /* if(result.type == 'mp4'){
            playMp4(result.url, '#huke88-video');
        }else{
            playM3u8(result.url, '#huke88-video');
        } */
    }
})

//回看
$('body').on('click',"#playBackVideo",function(){
    if($('#loginModal').length)
        $('#loginModal').remove();
    if($(this).find('#dplayer').length){
        return false
    }
    chrome.storage.sync.get({token: ''}, function(items) {
        if (!items.token) {
            error('请先开启插件');
            $('#design-popup-login').show();
            return;
        }else{
            success('正在解析...')
            let arr=location.href.match(/[a-z]\/(.*)\.html/)[1].split('/')
            let id=arr[arr.length-1]
            // console.log(id);
            let jiexi={
                id:id,
                n : 1,
                cookie : items.token,
            }
            chrome.runtime.sendMessage({jiexi:jiexi }, function(response) {
                if(chrome.runtime.lastError){

                }
            })
            /* $.ajax({
                type: "POST",
                url: server,
                data: {
                    type : 'play',
                    token : items.token,
                    url : window.location.href,
                },
                success: function(result){
                    if(result.code){
                        if(result.code == -1){
                            error(result.msg);
                            chrome.storage.sync.remove('token', function(items) {});
                            return;
                        }
                        success('解析成功！')
                        if(result.type == 'mp4'){
                            playMp4(result.url, '.video-container');
                        }else{
                            playM3u8(result.url, '.video-container');
                        }
                    }else{
                        error(result.msg);
                    }
                }
            }); */
        }
    });
    return false;
});

//回看素材下载
$('body').on('click',".downBtn,#download-case-js,#download-source-js",function(){
    let that=$(this)
    if($('#loginModal').length)
        $('#loginModal').remove();
    chrome.storage.sync.get({token: ''}, function(items) {
        if (!items.token) {
            error('请先开启插件');
            $('#design-popup-login').show();
            return;
        }else{
            // success('正在解析下载链接...')
            let type='down_Y'
            if(that.hasClass('d-ywj')){
                type='down_B'
            }

           
            console.log(type);
            
            if(!!_json  && (!!_json.download_urlB ||  !!_json.download_urlY)){
                
                
                // window.location.href = _json.download_urlB;
                if(type == 'down_B'){
                    if(_json.download_urlB){
                        success('编译成功！');
                        _json.download_urlB=decodeURIComponent(_json.download_urlB)
                        window.open(_json.download_urlB);
                    }
                    else{
                        error('此视频未提供本课素材，无法下载');
                    }
                }
                else{
                    if(_json.download_urlY){
                        success('编译成功！');
                        _json.download_urlY=decodeURIComponent(_json.download_urlY)
                        window.open(_json.download_urlY);
                    }
                    else{
                        error('此视频未提供源文件，无法下载');
                    }
                }
                
            }
            else{
                let arr=location.href.match(/[a-z]\/(.*)\.html/)[1].split('/')
                let id=arr[arr.length-1]
                // console.log(id);
                let jiexi={
                    id:id,
                    n : 1,
                    cookie : items.token,
                    type:type
                }
                chrome.runtime.sendMessage({jiexi:jiexi }, function(response) {
                    if(chrome.runtime.lastError){

                    }
                })
            }
            /* $.ajax({
                type: "POST",
                url: server,
                data: {
                    type : 'sc',
                    token : items.token,
                    url : window.location.href,
                },
                success: function(result){
                    if(result.code){
                        if(result.code == -1){
                            error(result.msg);
                            chrome.storage.sync.remove('token', function(items) {});
                            return;
                        }
                        success('解析成功！');
                        window.location.href = result.url;
                    }else{
                        error(result.msg);
                    }
                }
            }); */
        }
    });
    return false;
});

function playMp4(url, obj) {
    $(obj).html('<div id="dplayer"></div>');
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true,
        video: {
            url: url,
        }
    });
}

function playM3u8(m3u8, obj) {
    $(obj).html('<div id="dplayer"></div>');
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true,
        video: {
            url: m3u8,
            type: 'hls'
        }
    });
}


function playSoundMp4(url, obj) {
    $(obj).css('height', '258px');
    $(obj).after('<div id="dplayer" style="width: 100%;height: 258px;"></div>');
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true,
        video: {
            url: url,
        }
    });
}

function playSoundM3u8(m3u8, obj) {
    $(obj).css('height', '258px');
    $(obj).after('<div id="dplayer" style="width: 100%;height: 258px"></div>');
    const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        autoplay: true,
        video: {
            url: m3u8,
            type: 'hls'
        }
    });
}