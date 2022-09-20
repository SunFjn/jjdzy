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
/**
 * 天降红包item
 */
var TJHBItem = (function (_super) {
    __extends(TJHBItem, _super);
    function TJHBItem() {
        return _super.call(this) || this;
    }
    TJHBItem.createInstance = function () {
        "";
        return (fairygui.UIPackage.createObject("ActCom_TJHB", "TJHBItem"));
    };
    TJHBItem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var s = this;
        CommonManager.parseChildren(s, s);
        s.labCheck.text = HtmlUtil.createLink("查看大家手气", true);
    };
    TJHBItem.prototype.setVo = function (vo, isPlayEff) {
        if (isPlayEff === void 0) { isPlayEff = false; }
        var self = this;
        self._vo = vo;
        if (!vo)
            return;
        if (isPlayEff) {
            if (!self._mc) {
                self._mc = EffectMgr.addEff("uieff/10094", self.displayListContainer, self.width / 2 - 8, self.height / 2 - 38, 500, 500, false);
                self._mc.refThis = self;
                self._mc.refKey = "_mc";
            }
            Timer.instance.callLater(self.runAfterMc, 500, self);
        }
        else {
            if (Timer.instance.has(self.runAfterMc, self))
                Timer.instance.remove(self.runAfterMc, self);
            if (self._mc) {
                EffectMgr.instance.removeEff(self._mc);
            }
            self.changeData();
        }
    };
    TJHBItem.prototype.runAfterMc = function () {
        var self = this;
        self.changeData();
        var cfg;
        if (self._vo.isSystemHB == 0) {
            cfg = Config.tjhb_296[self._vo.hbType];
        }
        else {
            cfg = Config.tjhbsys_296[self._vo.hbType];
        }
        if (cfg) {
            var rewardArr = ConfigHelp.makeItemListArr(cfg.hb);
            for (var i = 0; i < rewardArr.length; i++) {
                var v = rewardArr[i];
                v.count = self._vo.robNum;
            }
            GGlobal.layerMgr.open(UIConst.REWARD_SHOW1, rewardArr);
        }
        Model_ActComTJHB.id = 0;
    };
    /**
     * 改变数据
     */
    TJHBItem.prototype.changeData = function () {
        var self = this;
        if (self._vo.isSystemHB == 0) {
            self.c1.selectedIndex = 1;
            self.lbName.text = self._vo.name;
            self.viewHead.setdata(self._vo.headId, -1, "", 0, false, self._vo.frameId, 0);
        }
        else {
            self.c1.selectedIndex = 0;
            var cfg = Config.tjhbsys_296[self._vo.hbType];
            self.timeLab.text = "(" + cfg.time + ")";
        }
        self.canGetGroup.visible = false;
        self.hasGetGroup.visible = false;
        if (self._vo.hbStatus == 1) {
            self.canGetGroup.visible = true;
            self.btnGet.checkNotice = true;
            self.btnGet.addClickListener(self.onGet, self);
            var cfg = void 0;
            if (self._vo.isSystemHB == 0) {
                cfg = Config.tjhb_296[self._vo.hbType];
            }
            else {
                cfg = Config.tjhbsys_296[self._vo.hbType];
            }
            var id = Number(ConfigHelp.SplitStr(cfg.hb)[0][0]);
            var v = VoItem.create(id);
            var num = Number(ConfigHelp.SplitStr(cfg.hb)[0][2]);
            IconUtil.setImg(self.iconYuanBao, Enum_Path.ICON70_URL + v.icon + ".png");
            self.totalLab.text = num + "";
            self.residueLab.text = "剩余个数：" + self._vo.hbNum + "/" + cfg.sl;
        }
        else {
            self.hasGetGroup.visible = true;
            self.labCheck.addEventListener(egret.TextEvent.LINK, self.onTFClick, self);
            if (self._vo.hbStatus == 2) {
                self.qiangdao.visible = true;
                self.lbRob.text = self._vo.robNum + "";
                self.qiangguang.visible = false;
            }
            else {
                self.qiangdao.visible = false;
                self.qiangguang.visible = true;
            }
        }
    };
    /**
     * 领红包
     */
    TJHBItem.prototype.onGet = function (e) {
        var self = this;
        if (!self._vo)
            return;
        if (TimeUitl.cool("TJHBRefresh", 1000)) {
            GGlobal.model_TJHB.CG_GET(self._vo.hbId);
        }
    };
    TJHBItem.prototype.onTFClick = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        GGlobal.layerMgr.open(UIConst.TJHB_RECORD, { vo: this._vo });
    };
    TJHBItem.URL = "ui://fm0lrzcttl0c1";
    return TJHBItem;
}(fairygui.GComponent));
__reflect(TJHBItem.prototype, "TJHBItem");
