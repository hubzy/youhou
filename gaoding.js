(function () {



    
    var diyCss = `
    .editor-watermark,
    .editor-remove-watermark,
    .remove-watermark,
    .icon-vip-diamond,
    .gdd-material-card__vip,
    .g-popover__container:nth-child(2)
    { display:none;}
`
    $(document).ready(function () {
        var style = document.createElement('style');
        style.innerHTML = diyCss;
        $('body').append(style);

    });
    setTimeout(function () {
        var divHtml = '<button type="button" id="svePdf"  class="eui-button eui-button--normal--clear eui-button__icon--only eui-button--middle">下载</button>'
        $('.eui-editor-tool-bar > .eui-buttons-bar').append(divHtml)

        $('#svePdf').click(function () {

    
            var diyPrtCss=  `@media print {
            @page {
            
            size: `+$('.editor-canvas').width()+`px `+$('.editor-canvas').height()+`px;
            margin: 0;
            }
        });`

            var prtStyle = document.createElement('style');
            prtStyle.innerHTML = diyPrtCss;
            $('body').append(prtStyle);


            $(".editor-canvas").print({
                globalStyles: true,//是否包含父文档的样式，默认为true
                mediaPrint: false,//是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
                stylesheet: null,//外部样式表的URL地址，默认为null
                noPrintSelector: ".no-print",//不想打印的元素的jQuery选择器，默认为".no-print"
                iframe: true,//是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
                append: null,//将内容添加到打印内容的后面
                prepend: null,//将内容添加到打印内容的前面，可以用来作为要打印内容
                deferred:
                    $.Deferred()//回调函数
            });
        })

    }, 1000)






})