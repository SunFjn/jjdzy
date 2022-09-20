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
var ItemCity = (function (_super) {
    __extends(ItemCity, _super);
    function ItemCity() {
        var _this = _super.call(this) || this;
        _this.collectCount = 0;
        return _this;
    }
    ItemCity.createInstance = function () {
        return (fairygui.UIPackage.createObject("FengHuoLY", "ItemCity"));
    };
    ItemCity.prototype.constructFromXML = function (xml) {
        var sf = this;
        CommonManager.parseChildren(sf, sf);
        sf.t0 = sf.getTransition("t0");
        sf.barHp.max = 100;
        sf.groupPro.visible = false;
        sf.groupState.visible = false;
        _super.prototype.constructFromXML.call(this, xml);
    };
    ItemCity.prototype.initCFG = function (val) {
        var sf = this;
        sf.idx = val;
        var cfg = Config.fhly_254[val];
        sf.camp = cfg.gs;
        sf.type = cfg.type;
        sf.time = cfg.time;
        sf.barTime.max = cfg.time;
        sf.groupState.visible = false;
        sf.barTime._titleObject.visible = false;
        sf.lbName.text = ModelFengHuoLY.CITYNAME[sf.type];
        sf.lbName.color = ModelFengHuoLY.CITYNAMECOLOR[sf.type];
        IconUtil.setImg(sf.n6, Enum_Path.IMAGE_MODULES_URL + "fenghuolangyan/city" + sf.type + ".png");
    };
    ItemCity.prototype.updateVO = function (city) {
        if (!city)
            return;
        var sf = this;
        sf.vo = city;
        var m = GGlobal.modelFengHuoLY;
        sf.lbMember.text = city.hasTakeCount + "/" + city.cfg.num;
        sf.groupState.visible = city.state == 1;
        if (city.owerID > 0) {
            sf.groupHead.visible = true;
            sf.lbOwner.text = city.ower;
            sf.barHp.value = city.hp;
            sf.n17.url = ["", "ui://edvdots4ekf6u", "ui://edvdots4jv3kw1w", "ui://edvdots4byucw2d"][city.camp];
            sf.setArrowST();
            var pvo = m.getPlayer(city.owerID);
            if (!pvo)
                return;
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(city.head), sf.imgHead);
            ImageLoader.instance.loader(RoleUtil.getHeadRoleByCfg(city.headGrid), sf.n14);
        }
        else {
            sf.imgArrow.visible = false;
            sf.groupHead.visible = false;
        }
    };
    ItemCity.prototype.setArrowST = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var atCity = Model_player.isMineID(sf.vo.owerID) || (m.state == 1 && m.zhengshouID == sf.idx);
        sf.imgArrow.visible = atCity;
    };
    ItemCity.prototype.updateShow = function (now) {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        if (m.state == 1 && m.zhengshouID == sf.idx) {
            var val = ((now / 1000 - m.startCollectTime / 1000) >> 0);
            val = sf.time - Math.abs(val) % sf.time;
            sf.barTime.value = val;
            sf.groupPro.visible = true;
            sf.lbTime.text = val + "s";
            var tempCount = (Math.abs(val) / sf.time) >> 0;
            if (tempCount != 0 && Math.abs(val) % sf.time == 0 && tempCount != sf.collectCount) {
                GGlobal.modelFengHuoLY.CG_SCORE_3579();
                m.startCollectTime = now;
            }
            sf.collectCount = tempCount;
        }
        else {
            sf.stopCollect();
        }
        sf.setArrowST();
    };
    ItemCity.prototype.moveHD = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var st = GGlobal.modelFengHuoLY.state;
        var cityplayerVO = m.hero;
        if (m.getMyCity() == sf.idx || cityplayerVO.soakCity == sf.idx) {
            ViewCommonWarn.text("正在征收中");
            return;
        }
        if (m.getMyCity() > 0) {
            ViewAlert.show("若移动到其他地方视为\n<font color='#fe0000'>放弃</font>本城池守城者\n且<font color='#fe0000'>所有征收者</font>停止征收并返回基地", Handler.create(sf, sf.move), ViewAlert.OKANDCANCEL, "移动");
        }
        else if (st == 1) {
            ViewAlert.show("若移动到其他地方视为\n<font color='#fe0000'>放弃征收</font>", Handler.create(sf, sf.move), ViewAlert.OKANDCANCEL, "移动");
        }
        else {
            sf.move();
        }
    };
    ItemCity.prototype.move = function () {
        var m = GGlobal.modelFengHuoLY;
        if (m.state == 1 && m.zhengshouID == this.idx) {
            ViewCommonWarn.text("已在征收中");
            return;
        }
        m.state = 0;
        m.moveCityID = this.idx;
        m.CG_MOVE_3561(this.xx, this.yy);
    };
    ItemCity.prototype.checkHD = function () {
        GGlobal.modelFengHuoLY.CG_CHECK_3559(this.idx);
        GGlobal.layerMgr.open(UIConst.FHLY_INFO, this.idx);
    };
    Object.defineProperty(ItemCity.prototype, "xx", {
        get: function () {
            return this.n6.x + this.n6.width / 2 + this.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemCity.prototype, "yy", {
        get: function () {
            return this.n6.y + this.n6.height / 2 + this.y;
        },
        enumerable: true,
        configurable: true
    });
    ItemCity.prototype.registHD = function () {
        var sf = this;
        sf.n6.addClickListener(sf.moveHD, sf);
        sf.btnCheck.addClickListener(sf.checkHD, sf);
    };
    ItemCity.prototype.removeHD = function () {
        var sf = this;
        sf.n6.removeClickListener(sf.moveHD, sf);
        sf.btnCheck.removeClickListener(sf.checkHD, sf);
    };
    ItemCity.prototype.collectionHD = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var vo = m.getCity(this.idx);
        if (vo.hasTakeCount >= vo.maxTakeCount) {
            ViewCommonWarn.text("当前征收人数已满");
            return;
        }
        var st = GGlobal.modelFengHuoLY.state;
        if (st != 0) {
            ViewCommonWarn.text("当前状态不可征收");
        }
        else {
            var cfg = Config.fhly_254[sf.idx];
            sf.groupPro.visible = true;
            GGlobal.modelFengHuoLY.zhengshouID = sf.idx;
            if (sf.type == 3 || vo.camp == m.myCamp)
                sf.CG_Collect();
            else
                sf.CG_occupy();
        }
    };
    ItemCity.prototype.stopCollect = function () {
        var sf = this;
        sf.groupPro.visible = false;
        sf.collectCount = -1;
    };
    ItemCity.prototype.CG_occupy = function () {
        GGlobal.modelFengHuoLY.CG_OCCUPY_3565(this.idx);
    };
    ItemCity.prototype.CG_Collect = function () {
        GGlobal.modelFengHuoLY.CG_LEVY_3573(this.idx);
    };
    ItemCity.prototype.battleHD = function () {
        GGlobal.modelFengHuoLY.zhengshouID = this.idx;
        GGlobal.modelFengHuoLY.CG_OCCUPY_3565(this.idx);
    };
    ItemCity.prototype.interactive = function () {
        var sf = this;
        var m = GGlobal.modelFengHuoLY;
        var vo = sf.vo;
        if (vo.inBattle()) {
            ViewCommonWarn.text("城池正在被争夺中");
            return;
        }
        if (m.state == 1 && m.zhengshouID == sf.idx) {
            ViewCommonWarn.text("已在征收中");
            return;
        }
        if (sf.type == 3) {
            if (sf.camp == m.myCamp) {
                ViewAlert.show("是否开始征收", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
            }
            else {
                ViewCommonWarn.text("敌方卫城不可征收");
            }
        }
        else {
            if (vo.owerID == 0) {
                ViewAlert.show("是否占领该城池并征收？", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
            }
            else {
                if (vo.camp == m.myCamp) {
                    ViewAlert.show("该城池被本服玩家占领\n是否开始征收", Handler.create(sf, sf.collectionHD), ViewAlert.OKANDCANCEL, "征收");
                }
                else {
                    ViewAlert.show("是否攻打敌方占领城池\n攻占后可进行征收", Handler.create(sf, sf.battleHD), ViewAlert.OKANDCANCEL);
                }
            }
        }
    };
    ItemCity.prototype.resetView = function () {
        var sf = this;
        sf.groupState.visible = false;
    };
    ItemCity.URL = "ui://edvdots4srrs5";
    return ItemCity;
}(fairygui.GComponent));
__reflect(ItemCity.prototype, "ItemCity");
