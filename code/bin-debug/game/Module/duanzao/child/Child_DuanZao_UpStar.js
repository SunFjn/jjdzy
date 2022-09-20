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
var Child_DuanZao_UpStar = (function (_super) {
    __extends(Child_DuanZao_UpStar, _super);
    function Child_DuanZao_UpStar() {
        return _super.call(this) || this;
    }
    Child_DuanZao_UpStar.createInstance = function () {
        return (fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_UpStar"));
    };
    Child_DuanZao_UpStar.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_DuanZao_UpStar.prototype.openPanel = function (pData) {
        this.setVo(pData);
        this.grid.gridSource = ViewGrid.ROLE;
    };
    Child_DuanZao_UpStar.prototype.closePanel = function (pData) {
        this.clean();
    };
    Child_DuanZao_UpStar.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        a.upStar.addClickListener(a.upStarHandle, a);
        a.suitBt.addClickListener(a.suitHandle, a);
        a.perBt.addClickListener(a.perHandle, a);
    };
    Child_DuanZao_UpStar.prototype.perHandle = function () {
        var a = this;
        if (a.perBt.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_UPSTAR_PERFECT(this.vo.type);
        }
        else {
            if (Config.dzstar_209[a.vo.starLv].consume != "0") {
                View_CaiLiao_GetPanel.show(VoItem.create(410014));
            }
            else {
                ViewCommonWarn.text("已满星");
            }
        }
    };
    Child_DuanZao_UpStar.prototype.suitHandle = function () {
        GGlobal.layerMgr.open(UIConst.DUANZAO_STAR_SUIT);
    };
    Child_DuanZao_UpStar.prototype.upStarHandle = function () {
        var a = this;
        if (a.upStar.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_UPGRADESTAR(a.vo.type);
        }
        else {
            if (Config.dzstar_209[a.vo.starLv].consume == "0") {
                ViewCommonWarn.text("已满星");
            }
            else {
                var costArr = JSON.parse(Config.dzstar_209[a.vo.starLv].consume);
                var itemVo = VoItem.create(costArr[0][1]);
                View_CaiLiao_GetPanel.show(itemVo);
            }
        }
    };
    Child_DuanZao_UpStar.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        a.grid.vo = vo;
        if (vo) {
            a.grid.tipEnabled = true;
            a.starLb.text = ConfigHelp.getStarFontStr(vo.starLv);
            a.suitLb.text = Model_DuanZao.suitArr[2] + "阶";
            a.nameLb.text = Model_Equip.getPartName(vo.type);
            var per = Config.VIP_710[Model_player.voMine.viplv + 1].STAR;
            if (per > 0) {
                a.sucRate.text = "升星成功率    " + (Math.floor(Config.dzstar_209[vo.starLv].cg / 1000)) + "%    " +
                    HtmlUtil.fontNoSize("VIP" + Model_player.voMine.viplv + "   +" + per + "%", Color.getColorStr(2));
            }
            else {
                a.sucRate.text = "升星成功率    " + (Math.floor(Config.dzstar_209[vo.starLv].cg / 1000)) + "%";
            }
            a.curLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv].addition / 1000) + "%";
            if (Config.dzstar_209[vo.starLv + 1]) {
                a.nextLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv + 1].addition / 1000) + "%";
                var costArr = JSON.parse(Config.dzstar_209[vo.starLv].consume);
                var count = Model_Bag.getItemCount(costArr[0][1]);
                var itemVo = VoItem.create(costArr[0][1]);
                if (count >= costArr[0][2]) {
                    a.costItem.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(count) + "/" + costArr[0][2], Color.getColorStr(2)));
                }
                else {
                    a.costItem.setCount(HtmlUtil.fontNoSize(ConfigHelp.numToStr(count) + "/" + costArr[0][2], Color.getColorStr(6)));
                }
                a.costItem.setImgUrl(itemVo.icon);
                a.upStar.checkNotice = count >= costArr[0][2];
                var nextCfg = Config.dzstarsuit_209[Model_DuanZao.suitArr[2] + 1];
                if (nextCfg) {
                    a.suitBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
                }
                else {
                    a.suitBt.checkNotice = false;
                }
                var costArr1 = JSON.parse(Config.dzstar_209[vo.starLv].consume1);
                var itemVo1 = VoItem.create(costArr1[0][1]);
                a.costItem1.setImgUrl(itemVo1.icon);
                var count1 = Model_Bag.getItemCount(costArr1[0][1]);
                a.costItem1.setLb(count1, costArr1[0][2]);
                if (count1 >= costArr1[0][2]) {
                    a.perBt.checkNotice = true;
                }
                else {
                    a.perBt.checkNotice = false;
                }
            }
            else {
                a.costItem.setCount(HtmlUtil.fontNoSize("已满星", Color.getColorStr(1)));
                a.costItem1.setCount(HtmlUtil.fontNoSize("已满星", Color.getColorStr(1)));
                a.costItem.setImgUrl();
                a.costItem1.setImgUrl();
                a.upStar.checkNotice = false;
                a.perBt.checkNotice = false;
                a.nextLb.text = "装备基本属性 \n+" + (Config.dzstar_209[vo.starLv].addition / 1000) + "%";
                var nextCfg = Config.dzstarsuit_209[Model_DuanZao.suitArr[2] + 1];
                if (nextCfg) {
                    a.suitBt.checkNotice = Model_DuanZao.starMinLv >= nextCfg.yaoqiu;
                }
                else {
                    a.suitBt.checkNotice = false;
                }
            }
        }
    };
    Child_DuanZao_UpStar.prototype.clean = function () {
        ConfigHelp.cleanGridEff(this.grid);
    };
    //>>>>end
    Child_DuanZao_UpStar.URL = "ui://pofv8989z1r83";
    return Child_DuanZao_UpStar;
}(fairygui.GComponent));
__reflect(Child_DuanZao_UpStar.prototype, "Child_DuanZao_UpStar");
