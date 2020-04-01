setTimeout(function(){
    var textareas = document.getElementsByClassName('editor-watermark');
    //获取水印class
    var textareasTab = document.getElementsByClassName('remove-watermark');
    //获取按钮左边的会员提示class
    console.log(textareas)
    //⬇️判断如果水印的数量大于0则运行
  if(textareas.length>0){ 
        var para=document.createElement("button");
        //创建按钮
        var node=document.createTextNode("去水印");
        //添加”去水印“  
        para.appendChild(node);
        //在按钮里面添加文字
        console.log(para)
        para.style.paddingRight = '10px';
        //给按钮添加右边距

        //⬇️给按钮添加点击事件
        para.addEventListener('click',function(){  
            function remDel(num){
                Array.from(num).forEach(node=>{
                    node.parentNode.removeChild(node)
                })       
            }
            remDel(textareas)
            remDel(textareasTab)
    })
    console.log(para)
    var element=document.getElementsByClassName('eui-buttons-bar');
    if(element.length>0){
        console.log(element)
        element[2].appendChild(para); 
    }else{
        var elementTow=document.getElementsByClassName('editor-tools')
        console.log(elementTow)
        elementTow.appendChild(para);
    }
    
    
    
    }
    
},3000);  
