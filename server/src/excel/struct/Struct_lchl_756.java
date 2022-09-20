package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_756_万兽之王-连充豪礼.xlsx
 */
public class Struct_lchl_756 {
    /**序号*/
    private int id;
    /**期数*/
    private int qs;
    /**充值金额
	 * 单位：RMB*/
    private int rmb;
    /**天数
	 * 累计充值的天数*/
    private int tianshu;
    /**奖励*/
    private int[][] jiangli;
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
     * 充值金额
	 * 单位：RMB
     */
    public int getRmb() {
        return rmb;
    }
    /**
     * 天数
	 * 累计充值的天数
     */
    public int getTianshu() {
        return tianshu;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    public Struct_lchl_756(int id,int qs,int rmb,int tianshu,String jiangli) {
        this.id = id;
        this.qs = qs;
        this.rmb = rmb;
        this.tianshu = tianshu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
    }
}