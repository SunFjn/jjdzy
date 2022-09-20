/**
 * mvp信息
 * @author: lujiahao 
 * @date: 2019-10-08 18:25:08 
 */
class VoMvpQxzl {
    public name = "";
    public score = 0;
    public head = 0;
    public headGrid = 0;

    constructor() {
    }

    //=========================================== API ==========================================
    public update(pName: string, pScore: number, pHead: number, pHeadGrid: number): boolean {
        let t = this;
        let t_change = false;
        if (t.name != pName) {
            t.name = pName;
            t_change = true;
        }
        if (t.score != pScore) {
            t.score = pScore;
            t_change = true;
        }
        if (t.head != pHead) {
            t.head = pHead;
            t_change = true;
        }
        if (t.headGrid != pHeadGrid) {
            t.headGrid = pHeadGrid;
            t_change = true;
        }
        return t_change;
    }
    //===================================== private method =====================================
    //======================================== handler =========================================
}