function addInfrastructure() {
    let style = document.createElement("style");


    style.appendChild(document.createTextNode(`
    #mywidget {
        position: relative;
        animation: mywidget_ani 2s 1;
        border-radius: 8px;
        background: transparent;
    }

    #mywidget a {
        position: absolute;
        left: -75px;
        transition: 0.3s;
        padding: 15px 30px 15px 15px;
        text-decoration: none;
        color: white !important;
        border-radius: 8px;
        font: 20px "Microsoft YaHei", SimHei, helvetica, arial, verdana, tahoma, sans-serif;
        min-width: 80px;
        text-align: right;
        white-space: nowrap;
    }


    #mywidget a:hover {
        left: -8px;
    }

    #vparse {
        background-color: #f44336;
    }

    #myplaybutton {
        position: absolute;
        right: -8px;
        top: 14px;
        width: 0px;
        height: 0px;
        margin: 0px;
        border-width: 16px;
        border-style: solid;
        border-color: transparent transparent transparent white;
    }


    @keyframes mywidget_ani {
        0% {
            transform: rotate(0deg);
            left: 20px;
        }

        50% {
            transform: rotate(8deg);
            left: 500px;
        }

        100% {
            transform: rotate(-360deg);
            left: 0px;
        }
    }`));

    document.head.appendChild(style);
}

function tricks() {
    window.addEventListener('message', function(event) {
        if (~event.origin.indexOf('chinese-elements.com')) {
            var intervalId = window.setInterval(function() {
                $("#aside-nav").hide();
                window.clearInterval(intervalId)
            }, 1000 * 2);
        } else {
            return;
        }
    });
    const im = /chinese-elements.com/i;
    if (im.test(self.location.href)) {
        var intervalId = window.setInterval(function() {
            $("#aside-nav").hide();
            window.clearInterval(intervalId);
            try {
                var frame = document.getElementById("player");
                if (frame && frame.hasOwnProperty('contentWindow')) {
                    var iframeWindow = frame.contentWindow;
                    iframeWindow.postMessage("tricks", "*");
                }

            } catch (e) {
                console.log(e);
            }
        }, 1000 * 2);
    }
}

//-------------------------------------------------------------
let playurl = window.location.href;
let rArray = playurl.split('?');
let cWeb = rArray[0];
const vSite = /m1907.cn/i;
//-------------------------------------------------------------

// Little tricks
tricks();
if (vSite.test(cWeb)) {
    window["alert"] = function(e) {};
    return;
}
//------------------------------------------------------------

//add a button to current website.
const vWebsites = new Array();
vWebsites[0] = /huke88.com/i;
// vWebsites[1] = /iqiyi.com/i;
// vWebsites[2] = /le.com/i;
// vWebsites[3] = /qq.com/i;
// vWebsites[4] = /tudou.com/i;
// vWebsites[5] = /mgtv.com/i;
// vWebsites[6] = /sohu.com/i;
// vWebsites[7] = /1905.com/i;
// vWebsites[8] = /bilibili.com/i;
// vWebsites[9] = /pptv.com/i;
// vWebsites[10] = /yinyuetai.com/i;
// vWebsites[11] = /wasu.cn/i;
vWebsites.every((item) => {
    if (item.test(cWeb)) {
        addInfrastructure();
        var jumpButton = $(`
        <div id="mywidget" href='javascript:void(0)' target='_blank' style="z-index:9999; position:fixed;left:0px;top:280px;">
            <a href="#" id="vparse">❀视频播放<div id="myplaybutton"></div></a>
        </div>
        <iframe id="videO" width="1000" height="800" scrolling="yes" style="z-index:9999; position:fixed;left:10%;top:10%;"></iframe>
        `);

        $("body").prepend(jumpButton);

        // bind onclick event
        $("#mywidget").click(function() {
            var openUrl = window.location.href;

            // <iframe src="http://www.baidu.com" name="test" width="500" height="500" frameborder="1" align="left" scrolling="yes"></iframe>
            
            // window.open('http://www.huke886.xyz/hk.html');
            //alert(openUrl)
            
            //var pp = $(`<iframe name="test" id="videO" width="1000" height="800" frameborder="1" align="left" scrolling="yes" style="z-index:9999; position:fixed;left:10%;top:10%;"></iframe>`);
            
            //$('body').prepend(pp);
            //var baidu = document.getElementById("videO");
            //baidu.src = "http://www.baidu.com";
            //$("#videO").attr("src","http://www.baidu.com");
            //$("#videO").src("http://www.baidu.com")
            $('body').load("http://www.baidu.com", function () {
                //其他操作，可对载入的 handle.html 中元素进行操作
             });

        });
        return false;
    }
    return true;
});