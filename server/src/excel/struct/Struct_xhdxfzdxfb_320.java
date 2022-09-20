package excel.struct;
/**
 * X_320_新活动-消费砸蛋消费表.xlsx
 */
public class Struct_xhdxfzdxfb_320 {
    /**序号*/
    private int id;
    /**次数*/
    private int cs;
    /**消耗元宝*/
    private int yb;
    /**奖励*/
    private String jl;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 次数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 消耗元宝
     */
    public int getYb() {
        return yb;
    }
    /**
     * 奖励
     */
    public String getJl() {
        return jl;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xhdxfzdxfb_320(int id,int cs,int yb,String jl,int qs) {
        this.id = id;
        this.cs = cs;
        this.yb = yb;
        this.jl = jl;
        this.qs = qs;
    }
}