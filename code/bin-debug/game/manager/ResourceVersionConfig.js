var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ResourceVersionConfig = (function () {
    function ResourceVersionConfig() {
    }
    ResourceVersionConfig.initialize = function () {
        var dic = this.urlDic;
    };
    ResourceVersionConfig.urlDic = {};
    return ResourceVersionConfig;
}());
__reflect(ResourceVersionConfig.prototype, "ResourceVersionConfig");
