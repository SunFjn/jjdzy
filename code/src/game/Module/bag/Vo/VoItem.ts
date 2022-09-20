class VoItem implements IGridImpl {
    public constructor() {
    }

    // public static ITEM = 1;
    // public static EQUIP = 2;
    // public static yinLiang = 3;
    // public static yuanBao = 4;
    // public static EXP = 6;
    // public static GONGXIAN = 11; //军团贡献
    // public static ZHIJING = 12; //军团资金
    // public static jifen = 14;	//积分
    // public static zhanGong = 15;//战功

    sid: number;
    id: number;
    icon: string;
    quality: number;
    count: number = 1;
    cfg: Idaoju_204;
    type: number;
    useType: number;
    name: string;
    gType: number;
    level: number;
    /**标识 1额外0默认*/
    extra: number;
    // tipEnable:boolean = true;
    showEffect: boolean = false;
    paixu: number;
    wayArr = [];
    public initLib(id: number): void {
        let a = this;
        a.cfg = Config.daoju_204[id];
        if (!a.cfg) return;
        a.id = a.cfg.id;
        a.icon = a.cfg.icon;
        a.quality = a.cfg.quality;
        a.name = a.cfg.name;
        a.type = a.cfg.leixing;
        a.useType = a.cfg.fangshi;
        a.level = a.cfg.level;
        a.paixu = a.cfg.paixu;
        if (a.cfg.get != "0") {
            a.wayArr = JSON.parse(a.cfg.get);
        }
        if (a.quality >= 5) {
            a.showEffect = true;
        }
    }

    get canUse(): boolean {
        if (this.useType != 0) {
            return true;
        }
        return false;
    }

    get qColor(): number {
        return Color.QUALITYCOLOR[this.quality];
    }

    public static create(id: number): VoItem {
        var vo: VoItem = new VoItem();
        vo.initLib(id);
        vo.gType = Enum_Attr.ITEM;
        return vo;
    }

    //是否是宝石
    public get isGem() {
        if (this.type == 4 || this.type == 5 || this.type == 6 || this.type == 7) {
            return true;
        }
        return false;
    }
    private _tz = -1;
    public get tz():number{
        if(this._tz == -1){
            if(this.cfg.tiaozhuan == '0'){
                this._tz = 0;
            }else{
                this._tz = Number(JSON.parse(this.cfg.tiaozhuan)[0][0]);
            }
            
        }
        return  this._tz
    }
    private _tzPas = -1
    public get tzPas():number{
        if(this._tzPas == -1){
            if(this.cfg.tiaozhuan == '0'){
                this._tzPas = 0;
            }else{
                this._tzPas = Number(JSON.parse(this.cfg.tiaozhuan)[0][1]);
            }
        }
        return  this._tzPas
    }
}