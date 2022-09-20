package excel.struct;
/**
 * X_772_新活动-累计返利.xlsx
 */
public class Struct_ljfl_772 {
    /**序号*/
    private int xh;
    /**期数*/
    private int qs;
    /**商品id
	 * 对应充值表*/
    private int id;
    /**对应返利道具*/
    private int dj;
    /**返利上限
	 * 百分比*/
    private int sx;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 商品id
	 * 对应充值表
     */
    public int getId() {
        return id;
    }
    /**
     * 对应返利道具
     */
    public int getDj() {
        return dj;
    }
    /**
     * 返利上限
	 * 百分比
     */
    public int getSx() {
        return sx;
    }
    public Struct_ljfl_772(int xh,int qs,int id,int dj,int sx) {
        this.xh = xh;
        this.qs = qs;
        this.id = id;
        this.dj = dj;
        this.sx = sx;
    }
}