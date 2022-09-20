package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_329_新活动_主题消费表.xlsx
 */
public class Struct_ztxfb_329 {
    /**编号
	 * 10000*期数+任务id*1000+任务数
	 * */
    private int id;
    /**期数*/
    private int qs;
    /**任务类型
	 * 1.符文主题
	 * 2.兽魂主题
	 * 3.少主主题
	 * 4.异兽主题
	 * 5.奇策主题
	 * 6.坐骑主题
	 * 7.武将主题
	 * 8.神兵主题*/
    private int lx;
    /**元宝*/
    private int yb;
    /**任务奖励*/
    private int[][] jl;
    /**
     * 编号
	 * 10000*期数+任务id*1000+任务数
	 * 
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
     * 任务类型
	 * 1.符文主题
	 * 2.兽魂主题
	 * 3.少主主题
	 * 4.异兽主题
	 * 5.奇策主题
	 * 6.坐骑主题
	 * 7.武将主题
	 * 8.神兵主题
     */
    public int getLx() {
        return lx;
    }
    /**
     * 元宝
     */
    public int getYb() {
        return yb;
    }
    /**
     * 任务奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_ztxfb_329(int id,int qs,int lx,int yb,String jl) {
        this.id = id;
        this.qs = qs;
        this.lx = lx;
        this.yb = yb;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}