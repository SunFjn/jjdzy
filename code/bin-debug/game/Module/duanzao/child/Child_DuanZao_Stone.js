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
var Child_DuanZao_Stone = (function (_super) {
    __extends(Child_DuanZao_Stone, _super);
    function Child_DuanZao_Stone() {
        var _this = _super.call(this) || this;
        //>>>>end
        _this.gemBtArr = [];
        _this.gemNameStr = ["青木宝石", "碧水宝石", "朱焰宝石", "紫雷宝石"];
        return _this;
    }
    Child_DuanZao_Stone.createInstance = function () {
        return (fairygui.UIPackage.createObject("DuanZao", "Child_DuanZao_Stone"));
    };
    Child_DuanZao_Stone.prototype.initView = function (pParent) {
        this._viewParent = pParent;
        this.addRelation(this._viewParent, fairygui.RelationType.Size);
    };
    Child_DuanZao_Stone.prototype.openPanel = function (pData) {
        this.setVo(pData);
        this.grid.gridSource = ViewGrid.ROLE;
    };
    Child_DuanZao_Stone.prototype.closePanel = function (pData) {
        this.clean();
    };
    Child_DuanZao_Stone.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        var a = this;
        CommonManager.parseChildren(a, a);
        a.grid.isShowEff = true;
        for (var i = 0; i < 4; i++) {
            var gemBt = (a.getChild("stoneBt" + i));
            gemBt.data = i;
            a.gemBtArr.push(gemBt);
            gemBt.addClickListener(a.stoneHandle, a);
        }
        a.keyBt.addClickListener(a.keyHandle, a);
        a.suitBt.addClickListener(a.suitHandle, a);
        a.getBt.addClickListener(a.OnGet, a);
    };
    Child_DuanZao_Stone.prototype.OnGet = function (evt) {
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        View_CaiLiao_GetPanel.show(VoItem.create(422000));
    };
    Child_DuanZao_Stone.prototype.suitHandle = function () {
        GGlobal.layerMgr.open(UIConst.DUANZAO_STONE_SUIT);
    };
    Child_DuanZao_Stone.prototype.keyHandle = function () {
        if (!this.vo)
            return;
        if (this.keyBt.checkNotice) {
            GGlobal.modelDuanZao.CG_DUANZAO_STONEID_KEYXQ(this.vo.type);
        }
        else {
            View_CaiLiao_GetPanel.show(VoItem.create(422000));
        }
    };
    Child_DuanZao_Stone.prototype.stoneHandle = function (event) {
        GGlobal.layerMgr.open(UIConst.DUANZAO_STONE_BAG, { equipVo: this.grid.vo, stonePart: event.target.data, stoneId: this.vo.bs[event.target.data] });
    };
    Child_DuanZao_Stone.prototype.setVo = function (vo) {
        var a = this;
        a.vo = vo;
        if (vo) {
            Model_Bag.gemList.sort(a.sortFunc);
            a.grid.vo = vo;
            a.grid.tipEnabled = true;
            a.suitLb.text = Model_DuanZao.suitArr[1] + "阶";
            a.nameLb.text = Model_Equip.getPartName(vo.type);
            var len = a.gemBtArr.length;
            for (var i = 0; i < len; i++) {
                a.gemBtArr[i].updateShow(vo.bs[i]);
                a.gemBtArr[i].setCheckNotice(Model_DuanZao.gemShowNotice(vo.bs[i], i));
                if (vo.bs[i] > 0) {
                }
                else {
                    a.gemBtArr[i].showText(a.gemNameStr[i]);
                }
            }
            a.keyBt.checkNotice = Model_DuanZao.checkKeyBtNotice();
            var nextCfg = Config.dzgemsuit_209[Model_DuanZao.suitArr[1] + 1];
            if (nextCfg) {
                a.suitBt.checkNotice = Model_DuanZao.gemLv >= nextCfg.lv;
            }
            else {
                a.suitBt.checkNotice = false;
            }
        }
        else {
            a.grid.vo = null;
        }
    };
    Child_DuanZao_Stone.prototype.sortFunc = function (a, b) {
        return a.paixu - b.paixu;
    };
    Child_DuanZao_Stone.prototype.clean = function () {
        var a = this;
        var len = a.gemBtArr.length;
        for (var i = 0; i < len; i++) {
            a.gemBtArr[i].updateShow(0);
        }
        ConfigHelp.cleanGridEff(a.grid);
    };
    Child_DuanZao_Stone.URL = "ui://pofv8989z1r82";
    return Child_DuanZao_Stone;
}(fairygui.GComponent));
__reflect(Child_DuanZao_Stone.prototype, "Child_DuanZao_Stone", ["IPanel"]);
