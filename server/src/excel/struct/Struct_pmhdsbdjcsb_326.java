package excel.struct;
/**
 * P_326_排名活动上榜大奖次数表.xlsx
 */
public class Struct_pmhdsbdjcsb_326 {
    /**系统id
	 * 兼容系统和新活动*/
    private int xtid;
    /**上榜次数*/
    private int sb;
    /**大奖次数*/
    private int dj;
    /**
     * 系统id
	 * 兼容系统和新活动
     */
    public int getXtid() {
        return xtid;
    }
    /**
     * 上榜次数
     */
    public int getSb() {
        return sb;
    }
    /**
     * 大奖次数
     */
    public int getDj() {
        return dj;
    }
    public Struct_pmhdsbdjcsb_326(int xtid,int sb,int dj) {
        this.xtid = xtid;
        this.sb = sb;
        this.dj = dj;
    }
}