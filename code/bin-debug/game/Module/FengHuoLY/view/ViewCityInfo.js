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
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var ViewCityInfo = (function (_super) {
    __extends(ViewCityInfo, _super);
    function ViewCityInfo() {
        var _this = _super.call(this) || this;
        _this.grids = [];
        _this.gridsLeft = [];
        _this.gridsRight = [];
        _this.nowOccupier = [];
        _this.childrenCreated();
        return _this;
    }
    ViewCityInfo.prototype.childrenCreated = function () {
        GGlobal.createPack("FengHuoLY");
        var sf = this;
        sf.view = fairygui.UIPackage.createObject("FengHuoLY", "ViewCityInfo").asCom;
        sf.contentPane = sf.view;
        CommonManager.parseChildren(sf.view, sf);
        sf.groupOwner.visible = false;
        sf.memberGroup.visible = false;
        sf.n36.callbackThisObj = sf;
        sf.n36.itemRenderer = sf.listRender;
        sf.barHp.max = 100;
        sf.grids = [sf.n14, sf.n15, sf.n16];
        sf.gridsLeft = [sf.n44, sf.n46];
        sf.gridsRight = [sf.n47, sf.n48];
        _super.prototype.childrenCreated.call(this);
    };
    ViewCityInfo.prototype.listRender = function (idx, obj) {
        var item = obj;
        item.setdate(this.nowOccupier[idx], this._vo.camp);
    };
    ViewCityInfo.prototype.initUI = function () {
        var sf = this;
        var id = Number(sf._args);
        var cfg = Config.fhly_254[id];
        IconUtil.setImg(sf.n10, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/city" + cfg.type + ".png");
        if (!sf.isInit)
            return;
        sf.lbCity.text = ModelFengHuoLY.CITYNAME[cfg.type];
        sf.lbCity.color = ModelFengHuoLY.CITYNAMECOLOR[cfg.type];
        sf.lbTime.text = "征收时长：" + cfg.time + "s";
        var type = cfg.type;
        var arr = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward));
        var vojifen = ConfigHelp.makeItem([1, 12, cfg.potion]);
        arr.push(vojifen);
        if (type == 3) {
            sf.c1.setSelectedIndex(0);
            for (var i = 0; i < 3; i++) {
                if (arr[i]) {
                    sf.grids[i].vo = arr[i];
                    sf.grids[i].showEff(true);
                    sf.grids[i].tipEnabled = true;
                    sf.grids[i].visible = true;
                }
                else {
                    sf.grids[i].visible = false;
                }
            }
        }
        else {
            sf.c1.setSelectedIndex(1);
            var arr1 = ConfigHelp.makeItemListArr(JSON.parse(cfg.reward1));
            var vojifen1 = ConfigHelp.makeItem([1, 12, cfg.potion1]);
            arr1.push(vojifen1);
            for (var i = 0; i < 2; i++) {
                sf.gridsLeft[i].vo = arr1[i];
                sf.gridsLeft[i].showEff(true);
                sf.gridsLeft[i].tipEnabled = true;
                sf.gridsRight[i].vo = arr[i];
                sf.gridsRight[i].showEff(true);
                sf.gridsRight[i].tipEnabled = true;
            }
        }
    };
    ViewCityInfo.prototype.updateUI = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var vo = m.getCity(m.checkID);
        sf._vo = vo;
        sf.lbMember.text = "当前征收人数：" + vo.hasTakeCount + "/" + vo.maxTakeCount;
        if (vo.owerID > 0) {
            sf.n22.text = "";
            sf.groupOwner.visible = true;
            sf.barHp.value = vo.hp;
            sf.lbPlayerName.text = vo.ower;
            sf.lbPower.text = "战力：" + vo.power;
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(vo.head), sf.imgHead);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(vo.headGrid), sf.imgHeadGird);
        }
        else {
            if (vo && vo.cfg.type == 3) {
                sf.n22.text = "不可占领";
                sf.n22.color = 0xfe0000;
            }
            else {
                sf.n22.text = "无人占领";
                sf.n22.color = 0xffffff;
            }
            sf.groupOwner.visible = false;
        }
    };
    ViewCityInfo.prototype.setOCcupier = function (data) {
        var sf = this;
        sf.nowOccupier = data;
        var len = data.length;
        sf.n36.numItems = len;
        len = len == 0 ? 1 : len;
        sf.n40.height = 30 * len;
    };
    ViewCityInfo.prototype.getOccupiers = function () {
        this.memberGroup.visible = !this.memberGroup.visible;
        GGlobal.modelFengHuoLY.CG_CHECK_3577(this._vo.id);
    };
    ViewCityInfo.prototype.onShown = function () {
        var sf = this;
        sf.initUI();
        sf.n34.addClickListener(sf.getOccupiers, sf);
        GGlobal.control.listen(Enum_MsgType.FHLY_CHECKCITY, sf.updateUI, sf);
        GGlobal.control.listen(Enum_MsgType.FHLY_CITY_PEOPLE, sf.setOCcupier, sf);
        IconUtil.setImg(sf.n21, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/quan.png");
    };
    ViewCityInfo.prototype.onHide = function () {
        var sf = this;
        for (var i = 0; i < 3; i++) {
            sf.grids[i].showEff(false);
        }
        for (var i = 0; i < 2; i++) {
            sf.gridsLeft[i].showEff(false);
            sf.gridsRight[i].showEff(false);
        }
        sf.memberGroup.visible = false;
        sf.n34.removeClickListener(sf.getOccupiers, sf);
        GGlobal.control.remove(Enum_MsgType.FHLY_CITY_PEOPLE, sf.setOCcupier, sf);
        GGlobal.control.remove(Enum_MsgType.FHLY_CHECKCITY, sf.updateUI, sf);
        GGlobal.layerMgr.close(UIConst.FHLY_INFO);
        IconUtil.setImg(sf.n10, null);
        IconUtil.setImg(sf.n21, null);
        sf.n36.numItems = 0;
    };
    ViewCityInfo.URL = "ui://edvdots4srrs9";
    return ViewCityInfo;
}(UIModalPanel));
__reflect(ViewCityInfo.prototype, "ViewCityInfo");
