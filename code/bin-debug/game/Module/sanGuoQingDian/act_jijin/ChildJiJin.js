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
/**基金 */
var ChildJiJin = (function (_super) {
    __extends(ChildJiJin, _super);
    function ChildJiJin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._kfDay = -1;
        return _this;
    }
    ChildJiJin.createInstance = function () {
        return (fairygui.UIPackage.createObject("sanGuoQingDian", "ChildJiJin"));
    };
    ChildJiJin.setExtends = function () {
    };
    ChildJiJin.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var self = this;
        CommonManager.parseChildren(self, self);
        self.list.itemRenderer = function (i, r) { r.setData(self.datas[i]); };
        self.list.callbackThisObj = self;
        self.btnHand.addClickListener(self.onHand, self);
        self.btnHand.checkNotice = false;
        self.btnHand.text = Config.shop_011[41].explain;
    };
    ChildJiJin.prototype.initView = function (pParent) {
        var self = this;
        self._viewParent = pParent;
        self.addRelation(self._viewParent, fairygui.RelationType.Size);
    };
    ChildJiJin.prototype.onHand = function () {
        var cfgId = 41;
        var cfg = Config.shop_011[cfgId]; //用统一的商品表去兼容不一样的系统和平台
        ModelChongZhi.recharge(cfg.rmb, cfg.Index, cfg.name);
        GGlobal.modelchongzhi.CG_CHONGZHI_135(cfgId, null, false);
    };
    ChildJiJin.prototype.initList = function () {
        var lib = Config.qdjj_742;
        this.datas = [];
        var voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.JiJin);
        for (var key in lib) {
            var cfg = lib[key];
            if (cfg.qishu == voact.qs) {
                this.datas.push(cfg);
            }
        }
        this.list.numItems = this.datas.length;
    };
    ChildJiJin.prototype.onUpdate = function () {
        var self = this;
        self.datas.sort(function (a, b) {
            var stateA = GGlobal.modelSGQD.jiJinInfo.states[a.id];
            var stateB = GGlobal.modelSGQD.jiJinInfo.states[b.id];
            var indexA = stateA == 1 ? 3 : (stateA == 0 ? 2 : 1);
            var indexB = stateB == 1 ? 3 : (stateB == 0 ? 2 : 1);
            return indexB - indexA;
        });
        self.list.numItems = this.datas.length;
        var info = GGlobal.modelSGQD.jiJinInfo;
        var states = info.states;
        for (var i = 0; i < self.list._children.length; i++) {
            var child = self.list._children[i];
            var id = child.getData().id;
            child.setState(states[id]);
        }
        if (GGlobal.modelSGQD.jiJinInfo.state == 0) {
            self.btnHand.visible = true;
        }
        else {
            self.btnHand.visible = false;
        }
        // ActTimeCtrl.getInst().setInfo({ txt: this.txtLeftTm, groupId: UIConst.SANGUOQD, actId: UIConst.JiJin });
        var vo = self.vo;
        self.times = vo.getSurTime();
        self.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(self.times);
        if (self.times > 0) {
            Timer.instance.listen(self.timeHandler, self, 1000);
        }
        else {
            Timer.instance.remove(self.timeHandler, self);
        }
    };
    ChildJiJin.prototype.upImage = function () {
        var voact = GGlobal.modelActivity.get(UIConst.SANGUOQD, UIConst.JiJin);
        IconUtil.setImg(this.bg, "resource/image/sanGuoQD/" + UIConst.JiJin + "" + voact.qs + ".jpg");
    };
    ChildJiJin.prototype.openPanel = function (pData) {
        var self = this;
        self.vo = pData;
        if (Model_GlobalMsg.kaifuDay != self._kfDay) {
            self._kfDay = Model_GlobalMsg.kaifuDay;
            self.initList();
        }
        GGlobal.modelSGQD.listen(ModelSGQD.msg_datas_jijin, self.onUpdate, self);
        GGlobal.modelSGQD.CG4081();
        self.upImage();
    };
    ChildJiJin.prototype.closePanel = function () {
        var self = this;
        GGlobal.modelSGQD.remove(ModelSGQD.msg_datas_jijin, self.onUpdate, self);
        IconUtil.setImg(self.bg, null);
        Timer.instance.remove(self.timeHandler, self);
    };
    ChildJiJin.prototype.timeHandler = function () {
        var s = this;
        s.times--;
        s.txtLeftTm.text = "活动剩余时间：" + DateUtil.getMSBySecond4(s.times);
        if (s.times <= 0) {
            Timer.instance.remove(s.timeHandler, s);
        }
    };
    ChildJiJin.pkg = "sanGuoQingDian";
    ChildJiJin.URL = "ui://kdt501v2tipmm";
    return ChildJiJin;
}(fairygui.GComponent));
__reflect(ChildJiJin.prototype, "ChildJiJin", ["IPanel"]);
