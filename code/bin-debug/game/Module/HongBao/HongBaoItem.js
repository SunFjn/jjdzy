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
var HongBaoItem = (function (_super) {
    __extends(HongBaoItem, _super);
    function HongBaoItem() {
        return _super.call(this) || this;
    }
    HongBaoItem.createInstance = function () {
        return (fairygui.UIPackage.createObject("HongBao", "HongBaoItem"));
    };
    HongBaoItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
    };
    HongBaoItem.prototype.setVo = function (vo) {
        var self = this;
        self.vo = vo;
        self.canGetGroup.visible = vo.robNum == 0 && vo.drawNum < Model_HongBao.max;
        self.hasGetGroup.visible = vo.drawNum >= Model_HongBao.max || vo.robNum > 0;
        self.viewHead.setdata(vo.headId, -1, "", 0, false, vo.frameId, 0);
        self.lbName.text = vo.name;
        if (vo.robNum == 0 && vo.drawNum < Model_HongBao.max) {
            self.hbNameLb.text = vo.hbName;
            self.residueLab.text = ConfigHelp.reTxt("剩余个数：{0}/{1}", Model_HongBao.max - vo.drawNum, Model_HongBao.max);
        }
        else {
            self.qiangguang.visible = vo.drawNum >= Model_HongBao.max && vo.robNum <= 0;
            self.qiangdao.visible = vo.robNum > 0;
            self.lbRob.text = vo.robNum + "";
        }
        self.btnGet.addClickListener(self.OnGet, self);
        self.labCheck.addClickListener(self.OnLook, self);
    };
    HongBaoItem.prototype.OnLook = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.HONGBAO_RECORD, this.vo);
    };
    HongBaoItem.prototype.OnGet = function () {
        GGlobal.modelHB.CG_RedBoxAct_getBox_11765(this.vo.id);
    };
    HongBaoItem.prototype.clean = function () {
        var self = this;
        self.btnGet.removeClickListener(self.OnGet, self);
        self.labCheck.removeClickListener(self.OnLook, self);
    };
    HongBaoItem.URL = "ui://s01exr8xqz021";
    return HongBaoItem;
}(fairygui.GComponent));
__reflect(HongBaoItem.prototype, "HongBaoItem");
