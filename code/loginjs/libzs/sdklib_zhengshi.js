var whalePbSDK = {
    name: "鲸鱼游戏自研SDK--三国战纪（SGZJ）自研渠道 -使用鲸鱼游戏 SDK",
    copyright: "上海鲸团科技有限公司",
    version: "1.0",
    author: "平台技术部",
    userInfo: null,
    isInit: false,
    uid: '',
    productCode: 'd3850aafd8a770b525cb5fea04923170',
    productKey: 'bc262c256e7b5c166fa02b05d1a5f31c',
    gameCode: 'd3850aafd8a770b525cb5fea04923170',
    channelName: 'jysgzj01-apk',
    JYSDKUrl: "loginjs/libzs/libSDK.js",
    JYSDKInfo: "原生安卓组件版",
    debug: false,
    debugTools: "https://ressdk.sgzj.jyoup.cn/static/dist/vconsole.min.js",
    init: function (callback) {

        // 载入JYSDK的JS类库-- 完成才可进行下一步
        whalePbSDK.loadJSResource(whalePbSDK.JYSDKUrl, function () {
            // 初始化 
            JYSDK.init(whalePbSDK.productCode, whalePbSDK.productKey, whalePbSDK.gameCode, false, function (res) {
                if (res.status) {
                    JYSDK.getUserInfo(function (callbackData) {
                        if (callbackData.status) {
                            whalePbSDK.userInfo = callbackData.data;
                            whalePbSDK.uid = callbackData.data.uid;
                            whalePbSDK.isInit = true;
                            callback(true);
                            return;
                        }
                        callback(false);
                    });
                      whalePbSDK.isInit = true;
                            callback(true);
                    return;
                }
                callback(false);
            });
        });
        if (this.debug) {
            this.setDebug(true);
        }
    },
    setDebug: function (debug) {
        debug = debug == null ? false : true;
        if (debug) {
            try {
                this.loadJSResource(whalePbSDK.debugTools, function () {
                    var vConsole = new VConsole();
                });
            } catch (error) {
                console.log(error);
            }
        }
    },
    login: function (callback) {
        JYSDK.login(function (callbackData) {
            var message;
            if (callbackData.status) {
                message = '登录成功: uid=>' + callbackData.data.uid;
                callback(true);
            } else {
                message = '登录失败:' + callbackData.message;
                callback(false);
            }
        });
    },
    logout: function () {
        if (!whalePbSDK.isInit) {
            return console.log('初始化H5SDK失败');
        }
        JYSDK.logout(function (logoutObject) { console.log('msg:成功退出游戏'); })
    },
    getuser: function () {
        if (!whalePbSDK.isInit) {
            return console.log('初始化H5SDK失败');
        }
        whalePbSDK.userInfo.uid = whalePbSDK.uid + '-apk';
        whalePbSDK.userInfo.account = whalePbSDK.userInfo.uid;
        whalePbSDK.userInfo.platform = whalePbSDK.channelName;
        whalePbSDK.userInfo.ostype = whalePbSDK.getOsType();
        return whalePbSDK.userInfo;
    },
    pay: function (orderInfo, callback) {
        if (!whalePbSDK.isInit) {
            return console.log('初始化H5SDK失败');
        }

        var postInfo = new Object();
        postInfo.productCode = whalePbSDK.productCode;
        postInfo.uid = orderInfo.uid;
        postInfo.userRoleId = orderInfo.role_id;
        postInfo.userRoleName = orderInfo.role_name;
        postInfo.userRoleLevel = orderInfo.role_level;
        postInfo.serverName = orderInfo.server_name;
        postInfo.serverId = orderInfo.server_id;
        postInfo.cpOrderNo = orderInfo.cp_order_code;
        postInfo.amount = orderInfo.amount * 100;
        postInfo.subject = orderInfo.subject;
        postInfo.desc = orderInfo.desc;
        postInfo.callbackUrl = '';
        postInfo.extrasParams = orderInfo.extras_params;
        postInfo.goodsId = orderInfo.goods_id;
        postInfo.count = orderInfo.count;
        postInfo.quantifier = orderInfo.quantifier;

        postInfo.vipLevel = '';
        postInfo.userRoleBalance = '';
        postInfo.partyName = '';

        var orderInfoJson = JSON.stringify(postInfo);
        JYSDK.pay(orderInfoJson, function (payStatusObject) {
            callback(JSON.stringify(payStatusObject));
        });
    },
    roleupdate: function (roleInfo, callback) {
        if (!whalePbSDK.isInit) {
            return console.log('初始化H5SDK失败');
        }
        roleInfo.is_create_role = false;
        whalePbSDK.roleupload(roleInfo, callback);
    },
    roleupload: function (roleInfo, callback) {
        if (!whalePbSDK.isInit) {
            return console.log('初始化H5SDK失败');
        }
        var postInfo = new Object();
        postInfo.isCreateRole = roleInfo.is_create_role;
        postInfo.roleCreateTime = roleInfo.role_create_time;
        postInfo.uid = roleInfo.uid;
        postInfo.username = roleInfo.username;
        postInfo.serverId = roleInfo.server_id;
        postInfo.serverName = roleInfo.server_name;
        postInfo.userRoleName = roleInfo.role_name;
        postInfo.userRoleId = roleInfo.role_id;
        postInfo.userRoleBalance = roleInfo.role_balance;
        postInfo.vipLevel = roleInfo.vip_level;
        postInfo.userRoleLevel = roleInfo.role_level;
        postInfo.partyId = roleInfo.party_id;
        postInfo.partyName = roleInfo.party_name;
        postInfo.gameRoleGender = roleInfo.role_gender;
        postInfo.gameRolePower = roleInfo.role_power;
        postInfo.partyRoleId = roleInfo.party_role_id;
        postInfo.partyRoleName = roleInfo.party_role_name;
        postInfo.professionId = roleInfo.fession_id;
        postInfo.profession = roleInfo.fession;
        postInfo.friendlist = roleInfo.friendlist;
        var roleInfoJson = JSON.stringify(postInfo);
        JYSDK.uploadGameRoleInfo(roleInfoJson, function (response) {
            var ret = new Object();
            if (response.status) {
                ret.status = true;
            } else {
                ret.status = false;
                ret.message = response.message;
            }
            callback(ret);
        });
    },
    rolecreate: function (roleInfo, callback) {
        roleInfo.is_create_role = true;
        whalePbSDK.roleupload(roleInfo, callback);
    },
    loadJSResource: function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    isMobile: function () {
        return navigator.userAgent.match(/android|iphone|ipad|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i);
    },
    isIos: function () {
        return navigator.userAgent.match(/iphone|ipod|ios|ipad/i);
    },
    isAndroid: function () {
        return navigator.userAgent.match(/android/i);
    },
    isWeixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    },
    getOsType: function () {
        var ostype = 'other';
        if (whalePbSDK.isMobile()) {
            if (whalePbSDK.isIos()) {
                ostype = 'ios';
            } else if (whalePbSDK.isAndroid()) {
                ostype = 'android';
            }
        }
        return ostype;
    }
}