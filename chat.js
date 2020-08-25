// document.write("<link rel='stylesheet' href='/chat.css' type='text/css' />");

$(function () {
    let invite = '<div id="inviteWindow" style="display: none;">\n' +
        '    <p>邀请窗口</p>\n' +
        '    <div style="border-top: 1px solid black;">\n' +
        '        <p>客服向你发出邀请！</p>\n' +
        '        <button id="accpt_chat_invite">接受邀请</button>\n' +
        '        <button id="decline_fast_invite">拒绝邀请</button>\n' +
        '    </div>\n' +
        '    </div>\n' +
        '</div>';

    var http = '';
    if(server === 'local') http = 'http://127.0.0.1:8080/';
    else if(server === 'dev') http = 'http://120.77.216.162:8080/';
    else if(server === 'pro') http = 'http://127.0.0.1:8080/';
    else console.log('环境文件缺失');

    let append = '<div class="wrap" id="mf_chat_frame" style="display: none;">\n' +
        '    <div class="iframe-container">\n' +
        '        <iframe height=60% width=22% src='+ http +'index/customer_chat/customer.html frameborder=0 allowfullscreen></iframe>\n' +
        '    </div>\n' +
        '</div>';

    $('body').append(append);
    $('body').append(invite);

    frame1 = window.frames[0];

    $(document).on('click', '#accpt_chat_invite', function () {
        $('#mf_chat_frame').css('display','block');
        $('#inviteWindow').hide();
        frame1.postMessage('accept_fast_invite','*');
    });

    $(document).on('click', '#decline_fast_invite', function () {
        $('#inviteWindow').hide();
        frame1.postMessage('decline_fast_invite','*');
    });

    window.addEventListener('message',function(e){
        console.log(e.data);
        if(e.data == 'fast_invite') {
            $('#inviteWindow').css('display','block');
        } else if(e.data == 'force_invite') {
            $('#mf_chat_frame').css('display','block');
        }
        // if(e.data !== '' || e.data !== null || e.data !== false)
        //     simpleAjax(http + 'index/customerChat/addTrack',
        //         {'token':e.data,'track':window.location.href,'start_time':Math.floor(Date.now() / 1000)});
    },false);

    window.onload = function () {
        // frame1 = window.frames[0];
        // frame1.postMessage(window.location.protocol + '//' + window.location.host, '*');
        frame1.postMessage('clientUrl:' + window.location.href, '*');
    };

    function simpleAjax(url,data,ifAsync = true) {
        var result;
        $.ajax({
            url: url,
            type: 'POST',
            async:ifAsync,
            data:data,
            dataType:"json",
            success: function (responseStr){
                result = responseStr;
            },
            error: function () {
                //todo : maybe give user a hint? or this error log should send to the flume or whatever
                addBannerMsg('同步消息异常','blue');
                return false;
            }
        });
        return result;
    }
});