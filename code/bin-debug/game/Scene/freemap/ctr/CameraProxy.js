var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CameraProxy = (function () {
    function CameraProxy() {
        this.focusx = 300;
        this.focusy = 300;
        this.currentx = -Number.MAX_VALUE;
        this.currenty = -Number.MAX_VALUE;
    }
    CameraProxy.prototype.update = function (delta) {
    };
    /**
     * 重置镜头转换为默认值
     */
    CameraProxy.prototype.reset = function () {
    };
    /**
     * 將鏡頭轉換至0
     */
    CameraProxy.prototype.zero = function () {
    };
    return CameraProxy;
}());
__reflect(CameraProxy.prototype, "CameraProxy");
