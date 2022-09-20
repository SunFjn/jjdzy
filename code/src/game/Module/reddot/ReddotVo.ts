/**
 * @author: lujiahao 
 * @date: 2018-05-02 10:38:08 
 */
class ReddotVo {
    public key: string;
    public value: number = 0;

    /** 绑定的系统id（用于判断是否开启） */
    public systemId = 0;

    public parentVoList: ReddotVo[] = [];
    public childrenVoList: ReddotVo[] = [];

    private _disMap: { [hashCode: number]: ReddotDisObject } = {};

    private _isLock: boolean = false;
    private _tempValue: number = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public setValue(pValue: number, pForce: boolean = false) {
        if (this._isLock) {
            if (!pValue) //如果临时设置成负值则需要判断子红点状态
            {
                //检查子红点状态
                for (let v of this.childrenVoList) {
                    if (v.value)
                        return;
                }
            }
            this._tempValue = pValue;
            return;
        }

        if (this.value == pValue)
            return;

        if (pValue) {
            this.value = pValue;
            //设置父红点状态
            for (let v of this.parentVoList) {
                v.setValue(1);
            }
        }
        else {
            if (!pForce) //强制设置的话无需检查子红点
            {
                //检查子红点状态
                for (let v of this.childrenVoList) {
                    if (v.value)
                        return;
                }
            }
            this.value = pValue;

            //设置父红点状态
            for (let v of this.parentVoList) {
                v.setValue(0);
            }
        }
        this.showOrHideReddot();

        if (this.index == 0 && this.type > 0) {
            //尾数为0则发送系统id
            GGlobal.reddot.notify(this.type);
        }
        else {
            GGlobal.reddot.notify(this.key);
        }
    }

    private _type: number;
    public get type(): number {
        if (this._type === undefined) {
            this._type = ~~this.key.split("|")[0];
        }
        return this._type;
    }

    private _index: number;
    public get index(): number {
        if (this._index === undefined) {
            if (this.key.indexOf("|") > -1)
                this._index = ~~this.key.split("|")[1];
            else
                this._index = 0;
        }
        return this._index;
    }

    public setLock(pFlag: boolean) {
        if (this._isLock == pFlag)
            return;

        if (pFlag) //锁上
        {
            //TODO 需要保存当前的状态值
            this._tempValue = this.value;

            //隐藏当前红点
            this.setValue(0, true);

            this._isLock = pFlag;
        }
        else //解锁
        {
            this._isLock = pFlag;
            //TODO 需要恢复之前保存的状态值
            this.setValue(this._tempValue);
            this._tempValue = 0;
        }
    }

    public addDis(pDis: fairygui.GObject) {
        if (!pDis || !pDis.displayObject)
            return;
        let t_do = this._disMap[pDis.displayObject.hashCode];
        if (!t_do) {
            t_do = new ReddotDisObject();
            t_do.dis = pDis;
            this._disMap[pDis.displayObject.hashCode] = t_do;
        }

        //刚注册的显示对象需要检查红点是否已经显示了
        let t_flag =
            this.value
            && GGlobal.reddot.checkCondition(this.type, this.index)
            && ModuleManager.isOpen(this.systemId);
        if (t_flag)
            t_do.showOrHideRedot(true);
        else
            t_do.showOrHideRedot(false);
    }

    public removeDis(pDis: fairygui.GObject) {
        if (!pDis || !pDis.displayObject)
            return;
        let t_do = this._disMap[pDis.displayObject.hashCode];
        if (!t_do)
            return;

        delete this._disMap[pDis.displayObject.hashCode];
        t_do.destroy();
    }

    //===================================== private method =====================================
    private showOrHideReddot() {
        let t_flag = this.value > 0 ? true : false;
        let t_condition = GGlobal.reddot.checkCondition(this.type, this.index);
        let t_system = ModuleManager.isOpen(this.systemId);
        for (let k in this._disMap) {
            let t_do = this._disMap[k];
            if (t_do) {
                if (t_do.dis && t_do.dis.displayObject)
                    t_do.showOrHideRedot(t_flag && t_condition && t_system);
                else {
                    delete this._disMap[k];
                    t_do.destroy();
                }
            }
        }
    }

    //======================================== handler =========================================
}

class ReddotDisObject {
    public dis: fairygui.GObject = null;

    constructor() { }

    public showOrHideRedot(pFlag: boolean) {
        if (pFlag)
            this.dis.visible = true;
        else
            this.dis.visible = false;
    }

    public destroy() {
        this.showOrHideRedot(false);
        this.dis = null;
    }
}