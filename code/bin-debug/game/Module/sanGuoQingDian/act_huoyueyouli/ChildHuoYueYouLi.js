var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**活跃有礼 */
var ChildHuoYueYouLi = (function (_super) {
    __extends(ChildHuoYueYouLi, _super);
    function ChildHuoYueYouLi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildHuoYueYouLi.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "Child_ActiveCourtesy"));
    };
    ChildHuoYueYouLi.setExtends = function () {
    };
    ChildHuoYueYouLi.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    ChildHuoYueYouLi.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    ChildHuoYueYouLi.prototype.onUpdate = function () {
        var s = this;
        var vo = s.vo;
        s.times = vo.getSurTime();
        s.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times > 0) {
            Timer.instance.listen(s.timeHandler, s, 1000);
        }
        else {
            Timer.instance.remove(s.timeHandler, s);
        }
        s.item0.setData((vo.qs - 1) * 3 + 1);
        s.item1.setData((vo.qs - 1) * 3 + 2);
        s.item2.setData((vo.qs - 1) * 3 + 3);
    };
    ChildHuoYueYouLi.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.timeLb.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    ChildHuoYueYouLi.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        self.timeLb.color = 0x00ff00;
        IconUtil.setImg(self.backIcon, "resource/image/sanGuoQD/5706.jpg");
        self.onUpdate();
        GGlobal.modelSGQD.huoYueYouLi &= 0;
        GGlobal.modelSGQD.notify(ModelSGQD.msg_notice); //点开关闭红点
    };
    ChildHuoYueYouLi.prototype.closePanel = function () {
        var s = this;
        Timer.instance.remove(s.timeHandler, s);
        IconUtil.setImg(s.backIcon, null);
        s.item0.clean();
        s.item1.clean();
        s.item2.clean();
    };
    ChildHuoYueYouLi.pkg = "sanGuoQingDian";
    ChildHuoYueYouLi.URL = "ui://kdt501v2tq2hp";
    return ChildHuoYueYouLi;
}(fairygui.GComponent));
__reflect(ChildHuoYueYouLi.prototype, "ChildHuoYueYouLi", ["IPanel"]);
