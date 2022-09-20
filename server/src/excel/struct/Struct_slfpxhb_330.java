package excel.struct;
/**
 * X_330_新活动-幸运翻牌消耗表.xlsx
 */
public class Struct_slfpxhb_330 {
    /**序号*/
    private int id;
    /**翻牌类型
	 * 1：随机翻牌
	 * 2：必胜翻牌
	 * 3：十连胜*/
    private int lx;
    /**消耗元宝*/
    private int yb;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 翻牌类型
	 * 1：随机翻牌
	 * 2：必胜翻牌
	 * 3：十连胜
     */
    public int getLx() {
        return lx;
    }
    /**
     * 消耗元宝
     */
    public int getYb() {
        return yb;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_slfpxhb_330(int id,int lx,int yb,int qs) {
        this.id = id;
        this.lx = lx;
        this.yb = yb;
        this.qs = qs;
    }
}