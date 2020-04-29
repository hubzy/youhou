var server = 'http://www.huke886.xyz';
var serverG = 'https://raw.githubusercontent.com/hubzy/youhou/master/account.json';
$(function () {

	chrome.storage.sync.get({ token: '' }, function (items) {
		if (!items.token) {
			$('#design-popup-login').show();
			return;
		}

		if (items.token) {
			$('#business').show();
			$('#navigation').show();
			//添加链接

			$('#navigation a').eq(0).click(function (e) {
				e.preventDefault();
				openUrlNewTab('https://huke88.com');
			});

		}
	});



});



//开启
$('#design-login-btn').on('click', function () {
	$("#design-login-btn").html("开启中···");
	$("#design-login-btn").css("background-color","#c2c2c2");
	$.getJSON(serverG, function (data) {
		$.each(data, function (i, value) {
			$.ajax({
				type: "POST",
				url: server + "/login.php",
				data: {
					account: value.account,
					password: value.password,
					// password: value.account,
					type: 1
				},
				success: function (result) {
					console.log(result);
					if (!!result) {
						
						let token = 'PHPSESSID=' + result + ';chack=true';
						chrome.storage.sync.set({ token: token }, function () {
						layer.msg('上线');
						window.location.reload();
						
						
						})
						
					} else {
						$("#smg").html("跑路啦")
						$("#smg").css("color","red")
					}
				}
			});
		});
	})

});


$('.logout').click(function (e) {
	e.preventDefault();
	chrome.storage.sync.remove("token")
	$('#design-popup-login').show();
	$('#business').hide();
	$('#navigation').hide();
});

function openUrlNewTab(url) {
	chrome.tabs.create({ url: url });
}
