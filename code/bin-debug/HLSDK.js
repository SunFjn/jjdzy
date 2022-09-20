var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HLSDK = (function () {
    function HLSDK() {
    }
    HLSDK.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    HLSDK.prototype.setKeepScreenOn = function () {
    };
    HLSDK.prototype.ShareApp = function () {
    };
    //退出游戏:
    HLSDK.prototype.exitApp = function () {
    };
    //监听微信右上角分享按钮
    HLSDK.prototype.shareCallBack = function () {
    };
    HLSDK.prototype.shareHandle = function () {
    };
    //获取用户信息（授权）:  
    HLSDK.prototype.getUserInfo = function () {
    };
    //数据上报（注册）:打点时间：选服完成，到达创角页
    HLSDK.prototype.RegisterReport = function () {
    };
    //充值 && 支付:
    HLSDK.payOrder = function (payParams) {
        var orderInfoJson = JSON.stringify(payParams);
        if (HLSDK.whalePbSDK)
            QuickSDK.pay(orderInfoJson, function (payStatusObject) {
                console.log('Qucik SDK GameDemo:下单通知' + JSON.stringify(payStatusObject));
            });
    };
    //数据上报（创建角色）:打点时间：创角完成，到达游戏页
    HLSDK.prototype.ReportData = function (roleData) {
    };
    //客服系统:
    HLSDK.prototype.Customer = function () {
    };
    HLSDK.prototype.offline = function () {
    };
    HLSDK.prototype.setNetWorkState = function () {
    };
    HLSDK.prototype.getNetWorkState = function () {
    };
    HLSDK.prototype.onShow = function () {
    };
    HLSDK.prototype.onHide = function () {
    };
    HLSDK.prototype.blackPlayerWarning = function () {
    };
    Object.defineProperty(HLSDK, "whalePbSDK", {
        //鲸鱼自研SDK 以及联运SDK
        get: function () {
            if (true)
                return null;
            return window.QuickSDK;
        },
        enumerable: true,
        configurable: true
    });
    /**选择服务器上报 */
    HLSDK.roleserver = function () {
    };
    /**进入游戏上报 */
    HLSDK.rolelogin = function () {
    };
    HLSDK.roleupdate = function (v) {
        if (v === void 0) { v = false; }
        var loginArg = GGlobal.loginArg;
        var voMine = Model_player.voMine;
        var roleInfo = new Object();
        roleInfo.isCreateRole = v;
        roleInfo.roleCreateTime = (new Date()).valueOf();
        roleInfo.uid = GameConfig.uid;
        roleInfo.username = GameConfig.username;
        roleInfo.serverId = GGlobal.zone;
        roleInfo.serverName = GGlobal.zoneName;
        if (!v) {
            roleInfo.userRoleName = voMine.name;
            roleInfo.userRoleId = voMine.id;
            roleInfo.userRoleBalance = voMine.yuanbao;
            roleInfo.vipLevel = voMine.viplv;
            roleInfo.userRoleLevel = voMine.level;
            roleInfo.gameRolePower = voMine.str;
        }
        else {
            roleInfo.userRoleName = ModelLogin.roleName;
            roleInfo.userRoleId = ModelLogin.roleID;
            roleInfo.userRoleBalance = 0;
            roleInfo.vipLevel = 0;
            roleInfo.userRoleLevel = 1;
            roleInfo.gameRolePower = 1;
        }
        roleInfo.partyId = 1;
        roleInfo.partyName = '无帮派';
        roleInfo.gameRoleGender = '男';
        roleInfo.partyRoleId = 1;
        roleInfo.partyRoleName = '会长';
        roleInfo.professionId = '1';
        roleInfo.profession = '武士';
        roleInfo.friendlist = '';
        var roleInfoJson = JSON.stringify(roleInfo);
        if (HLSDK.whalePbSDK)
            QuickSDK.uploadGameRoleInfo(roleInfoJson, function (response) {
            });
    };
    HLSDK.init = function () {
        if (HLSDK.whalePbSDK) {
            QuickSDK.setLogoutNotification(function (logoutObject) {
                window.location.reload();
                console.log('Game:玩家点击注销帐号');
            });
            QuickSDK.setSwitchAccountNotification(function (callbackData) {
                window.location.reload();
                console.log('Game:切换账号');
            });
        }
    };
    HLSDK.logout = function () {
        if (HLSDK.whalePbSDK)
            QuickSDK.logout(function (logoutObject) {
                console.log('Game:成功退出游戏');
            });
    };
    return HLSDK;
}());
__reflect(HLSDK.prototype, "HLSDK");
