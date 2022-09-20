class ViewHeroHead extends fairygui.GComponent {

    public lbName: fairygui.GRichTextField;
    public lbHp: fairygui.GRichTextField;
    public head: ViewHead;
    public passLb: fairygui.GRichTextField;
    public rewardGroup: fairygui.GGroup;
    public grid: ViewGrid;
    public static URL: string = "ui://7a366usaq5rfc";

    private static _instance: ViewHeroHead;
    public static createInstance(): ViewHeroHead {
        if (!ViewHeroHead._instance) ViewHeroHead._instance = <ViewHeroHead><any>(fairygui.UIPackage.createObject("zjyw", "ViewHeroHead"));
        return ViewHeroHead._instance;
    }

    public constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        var s = this;
        s.lbName = <fairygui.GRichTextField><any>(s.getChild("lbName"));
        s.lbHp = <fairygui.GRichTextField><any>(s.getChild("lbHp"));
        s.head = <ViewHead><any>(s.getChild("head"));
        s.rewardGroup = <fairygui.GGroup><any>(s.getChild("rewardGroup"));
        s.passLb = <fairygui.GRichTextField><any>(s.getChild("passLb"));
        s.grid = <ViewGrid><any>(s.getChild("grid"));
        s.grid.isShowEff = true;
        s.bloodCom = new fairygui.GComponent();
        s.addChild(s.bloodCom);
        s.bloodCom.setXY(218, 51);
        s.setChildIndex(s.bloodCom, 2);
        this.setXY((fairygui.GRoot.inst.width - this.width) >> 1, 280);
    }

    private bloodCom: fairygui.GComponent;
    public showBoss(id: number, isCombo: boolean, mhp?: number, imgkey: number = 0, yy: number = 280, namestr: string = null, rewardVo: IGridImpl = null, passStr: string = null): void {
        let s = this;
        s.y = yy;
        var hero = Config.hero_211[id];
        if (!hero) {
            return;
        }
        if (!imgkey) {
            imgkey = hero.head;
        }
        if (namestr) {
            s.lbName.text = namestr;
        } else {
            s.lbName.text = hero.name;
        }
        s.head.setdata(RoleUtil.getHeadImg(imgkey + ""), Model_player.voMine.level, null, null, true);
        if (mhp) {
            s.setMaxHp(mhp);
        } else {
            s.setMaxHp(Model_player.voMine.hp);
        }
        if (rewardVo) {
            s.grid.vo = rewardVo;
            s.rewardGroup.visible = true;
            s.passLb.text = passStr;
            s.grid.tipEnabled = true;
        } else {
            s.rewardGroup.visible = false;
        }
    }

    protected maxHp: number;
    public setMaxHp(value: number): void {
        this.maxHp = value;
        this.initBlood();
    }

    private maxLen = 303;
    private bloods: fairygui.GLoader[] = [];
    protected initBlood(): void {
        this.curHp = this.maxHp;
        this.lbHp.text = ((this.curHp / this.maxHp * 100) >> 0) + "%";
        var max = this.getMaxCount();

        for (var i = 0; i < this.bloods.length; i++) {
            this.bloodCom.removeChild(this.bloods[i]);
        }

        var img: fairygui.GLoader;
        for (i = 0; i < max; i++) {
            if (this.bloods.length > i) {
                img = this.bloods[i];
                egret.Tween.removeTweens(img);
            } else {
                img = new fairygui.GLoader();
                ImageLoader.instance.loader(Enum_Path.PIC_URL + "BM_BOXT" + (i + 1) + ".png", img);
                img.setSize(this.maxLen, 20);
                this.bloods.push(img);
            }
            img.fill = fairygui.LoaderFillType.ScaleFree;
            (img.content as egret.Bitmap).fillMode = egret.BitmapFillMode.CLIP;
            img.setSize(this.maxLen, 20);
            this.bloodCom.addChild(img);
            img.visible = true;
        }

        this.setChildIndex(this.lbHp, this.numChildren - 1);
    }

    protected getMaxCount() {
        var maxhp: number = this.maxHp;
        var count = Math.ceil(maxhp / 1000);//计算几条气血;
        if (count > 5) {
            count = 5;
        } else if (count <= 0) {
            count = 1;
        }
        return count;
    }

    protected curHp: number;
    protected updateHp(arg): void {
        var hp = arg;
        if (hp < 0) {
            hp = 0;
        }
        if (this.curHp == hp) {
            return hp;
        }
        this.curHp = hp;
        this.lbHp.text = ((this.curHp / this.maxHp * 100).toFixed(1)) + "%";
        var max = this.getMaxCount();
        var one = this.maxHp / max;//一条气血
        var cur = Math.ceil(hp / one);//剩余的血条

        var len = this.bloods.length;
        this.imgW = [];
        for (var i = 0; i < len; i++) {
            egret.Tween.removeTweens(this.bloods[i]);
            if (i < cur - 1) {
                this.imgW.push(this.maxLen);
            } else if (i == cur - 1) {
                if (hp % one == 0) {//当前气血条满血
                    this.imgW.push(this.maxLen);
                } else {
                    this.imgW.push(Math.floor(((hp % one) / one) * this.maxLen));
                }
            } else {
                this.imgW.push(0);
            }
        }
        this.tween();
    }

    public imgW;
    public tween(): void {
        var len = this.bloods.length;
        for (var i = len - 1; i >= 0; i--) {
            if (this.bloods[i].width != this.imgW[i]) {
                egret.Tween.get(this.bloods[i]).to({ width: this.imgW[i] }, 300).call(this.tween, this);
                break;
            }
        }
    }

    private _args;
    public onShown() {
        if (!this.parent) {
            GGlobal.layerMgr.UI_floorUI_1.addChild(ViewHeroHead.createInstance());
        }
        if (this._args) {
            this.showBoss(this._args[0], this._args[1], this._args[2], this._args[3], this._args[4], this._args[5], this._args[6], this._args[7]);
        }
        GGlobal.control.listen(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.updateHp, this);
    }

    public onHide() {
        this.removeFromParent();
        GGlobal.control.remove(Enum_MsgType.MSG_BOSS_HP_UPDATE, this.updateHp, this);
        this.grid.clean()
        this._args = null;
    }

    public static hide() {
        ViewHeroHead.createInstance().onHide();
    }

    public static show(id: number, isCombo: boolean, mhp?: number, headkey: number = 0, yy: number = 280, namestr: string = null, rewardVo: IGridImpl = null, passStr: string = null) {
        let view = ViewHeroHead.createInstance();
        view._args = [id, isCombo, mhp, headkey, yy, namestr, rewardVo, passStr];
        view.onShown();
    }
    public static update(hp: number) {
        const view = ViewHeroHead.createInstance();
        if(view) {
            view.updateHp(hp);
        }
    }
}