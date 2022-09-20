package excel.struct;
/**
 * X_763_新活动-消费摇骰-上限表.xlsx
 */
public class Struct_xfytsx_763 {
    /**期数*/
    private int qs;
    /**摇骰次数
	 * 消费元宝总共可获得的次数*/
    private int cs;
    /**消费元宝
	 * 获得1次次数需消费的元宝*/
    private int xf;
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 摇骰次数
	 * 消费元宝总共可获得的次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 消费元宝
	 * 获得1次次数需消费的元宝
     */
    public int getXf() {
        return xf;
    }
    public Struct_xfytsx_763(int qs,int cs,int xf) {
        this.qs = qs;
        this.cs = cs;
        this.xf = xf;
    }
}