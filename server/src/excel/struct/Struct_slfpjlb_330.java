package excel.struct;
/**
 * X_330_新活动-幸运翻牌胜利表.xlsx
 */
public class Struct_slfpjlb_330 {
    /**期数*/
    private int qs;
    /**失败奖励
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private String sb;
    /**胜利奖励*/
    private String sl;
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 失败奖励
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * 
     */
    public String getSb() {
        return sb;
    }
    /**
     * 胜利奖励
     */
    public String getSl() {
        return sl;
    }
    public Struct_slfpjlb_330(int qs,String sb,String sl) {
        this.qs = qs;
        this.sb = sb;
        this.sl = sl;
    }
}