package excel.struct;
/**
 * S_289_神将修炼表.xlsx
 */
public class Struct_godheroxiulian_289 {
    /**修炼等级
	 * 等级=重数*100+等级*/
    private int lv;
    /**下一级*/
    private int next;
    /**消耗*/
    private int conmuse;
    /**提升天赋等级上限*/
    private int max;
    /**突破消耗同名卡X张*/
    private int tp;
    /**
     * 修炼等级
	 * 等级=重数*100+等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 下一级
     */
    public int getNext() {
        return next;
    }
    /**
     * 消耗
     */
    public int getConmuse() {
        return conmuse;
    }
    /**
     * 提升天赋等级上限
     */
    public int getMax() {
        return max;
    }
    /**
     * 突破消耗同名卡X张
     */
    public int getTp() {
        return tp;
    }
    public Struct_godheroxiulian_289(int lv,int next,int conmuse,int max,int tp) {
        this.lv = lv;
        this.next = next;
        this.conmuse = conmuse;
        this.max = max;
        this.tp = tp;
    }
}