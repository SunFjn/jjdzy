package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_754_新活动-曹操来袭.xlsx
 */
public class Struct_cclx_754 {
    /**编号*/
    private int id;
    /**boss*/
    private int[][] boss;
    /**秒伤百分比
	 * jingyu:
	 * 百分之X*/
    private int msbfb;
    /**秒伤固定值*/
    private int msgdz;
    /**奖励预览*/
    private int[][] jlyl;
    /**最后一击奖励*/
    private int[][] zhyj;
    /**验证时间*/
    private int sj;
    /**地图*/
    private int dt;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * boss
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 秒伤百分比
	 * jingyu:
	 * 百分之X
     */
    public int getMsbfb() {
        return msbfb;
    }
    /**
     * 秒伤固定值
     */
    public int getMsgdz() {
        return msgdz;
    }
    /**
     * 奖励预览
     */
    public int[][] getJlyl() {
        return jlyl;
    }
    /**
     * 最后一击奖励
     */
    public int[][] getZhyj() {
        return zhyj;
    }
    /**
     * 验证时间
     */
    public int getSj() {
        return sj;
    }
    /**
     * 地图
     */
    public int getDt() {
        return dt;
    }
    public Struct_cclx_754(int id,String boss,int msbfb,int msgdz,String jlyl,String zhyj,int sj,int dt) {
        this.id = id;
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.msbfb = msbfb;
        this.msgdz = msgdz;
        this.jlyl = ExcelJsonUtils.toObj(jlyl,int[][].class);
        this.zhyj = ExcelJsonUtils.toObj(zhyj,int[][].class);
        this.sj = sj;
        this.dt = dt;
    }
}