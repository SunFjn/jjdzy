var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.initProductInof = function () {
        var self = GameConfig;
        switch (self.codeType) {
            case 2:
                var arg = window.loginArg;
                self.productKey = arg.productKey;
                self.productCode = arg.productCode;
                self.uid = arg.uid;
                self.username = arg.username;
                self.channelId = arg.channelId;
                self.pf = arg.pf;
                self.account = arg.account;
                HLSDK.init();
                break;
        }
        HLSDK.init();
    };
    /**
     * 是否是正式测试
    */
    GameConfig.realTest = 0;
    GameConfig.gameName = "逐鹿中原";
    GameConfig.uid = 0;
    GameConfig.pf = "fxzjsg01";
    /**H5，链接，安卓*/
    GameConfig.codeType = 2;
    GameConfig.productKey = '87969230';
    GameConfig.productCode = '33827237067467388509055845353587';
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
