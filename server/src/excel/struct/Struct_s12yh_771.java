package excel.struct;
/**
 * X_771_新活动-双12商城优惠表.xlsx
 */
public class Struct_s12yh_771 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**额度
	 * 单位：元宝*/
    private int ed;
    /**减免
	 * 元宝*/
    private int jm;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 额度
	 * 单位：元宝
     */
    public int getEd() {
        return ed;
    }
    /**
     * 减免
	 * 元宝
     */
    public int getJm() {
        return jm;
    }
    public Struct_s12yh_771(int id,int qs,int ed,int jm) {
        this.id = id;
        this.qs = qs;
        this.ed = ed;
        this.jm = jm;
    }
}