// document.write("<link rel='stylesheet' href='/chat.css' type='text/css' />");

$(function () {

    let invite = '<div id="inviteWindow">\n' +
        '    <p>邀请窗口</p>\n' +
        '    <div style="border-top: 1px solid black;">\n' +
        '        <p>客服向你发出邀请！</p>\n' +
        '        <button>接受邀请</button>\n' +
        '        <button>拒绝邀请</button>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '</div>';



    let append = '<div class="wrap">\n' +
        '    <div class="iframe-container">\n' +
        '        <iframe height=60% width=22% src="http://127.0.0.1:8080/index/customer_chat/customer.html" frameborder=0 allowfullscreen></iframe>\n' +
        '    </div>\n' +
        '</div>';
    $('body').append(append);
    $('body').append(invite);

})