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
/**豪礼兑换 */
var ChildHLDuiHuan = (function (_super) {
    __extends(ChildHLDuiHuan, _super);
    function ChildHLDuiHuan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChildHLDuiHuan.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "ChildHLDuiHuan"));
    };
    ChildHLDuiHuan.setExtends = function () {
    };
    ChildHLDuiHuan.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = function (i, r) { r.setData(GGlobal.modelSGQD.getHLDatas()[i]); };
        self.list.numItems = GGlobal.modelSGQD.getHLDatas().length;
        self.list.setVirtual();
    };
    ChildHLDuiHuan.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    ChildHLDuiHuan.prototype.onUpdate = function () {
        var self = this;
        self.list.numItems = GGlobal.modelSGQD.getHLDatas().length;
        for (var i = 0, len = self.list._children.length; i < len; i++) {
            var child = self.list._children[i];
            child.updateState();
        }
        var voact = self.vo;
        var id = voact.qs + 4605;
        var infos = JSON.parse(Config.xtcs_004[id].other);
        var count1 = Model_Bag.getItemCount(infos[0][1]);
        var count2 = Model_Bag.getItemCount(infos[1][1]);
        IconUtil.setImg(self.icon1, Enum_Path.PIC_URL + infos[0][0] + ".png");
        IconUtil.setImg(self.icon2, Enum_Path.PIC_URL + infos[1][0] + ".png");
        self.txtCnt1.text = count1 + "";
        self.txtCnt2.text = count2 + "";
        self.times = voact.getSurTime();
        self.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    ChildHLDuiHuan.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_hldh, self.onUpdate, self);
        GGlobal.modelSGQD.CG4101();
        IconUtil.setImg(self.bg, "resource/image/sanGuoQD/" + UIConst.HaoLiDuiHuan + ".jpg");
    };
    ChildHLDuiHuan.prototype.closePanel = function () {
        var self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_hldh, self.onUpdate);
        Timer.instance.remove(self.timeHandler, self);
        IconUtil.setImg(self.bg, null);
        IconUtil.setImg(self.icon1, null);
        IconUtil.setImg(self.icon2, null);
    };
    ChildHLDuiHuan.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.txtLeftTime.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    ChildHLDuiHuan.pkg = "sanGuoQingDian";
    ChildHLDuiHuan.URL = "ui://kdt501v2tipm2";
    return ChildHLDuiHuan;
}(fairygui.GComponent));
__reflect(ChildHLDuiHuan.prototype, "ChildHLDuiHuan", ["IPanel"]);
