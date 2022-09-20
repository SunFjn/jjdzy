package excel.struct;
/**
 * F_019_府邸金库.xlsx
 */
public class Struct_fdjk_019 {
    /**金库ID*/
    private int jk;
    /**收益上限(分钟)
	 * 单位：秒*/
    private int cishu;
    /**
     * 金库ID
     */
    public int getJk() {
        return jk;
    }
    /**
     * 收益上限(分钟)
	 * 单位：秒
     */
    public int getCishu() {
        return cishu;
    }
    public Struct_fdjk_019(int jk,int cishu) {
        this.jk = jk;
        this.cishu = cishu;
    }
}