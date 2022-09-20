package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_333_新活动-宝藏拼图奖励表.xlsx
 */
public class Struct_bzptjlb_333 {
    /**序号*/
    private int id;
    /**宝箱
	 * 从上到下，从左到右排序
	 * 
	 * */
    private int bx;
    /**任务id
	 * id读宝藏拼图任务表的id
	 * */
    private int[][] rw;
    /**奖励*/
    private int[][] jl;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 宝箱
	 * 从上到下，从左到右排序
	 * 
	 * 
     */
    public int getBx() {
        return bx;
    }
    /**
     * 任务id
	 * id读宝藏拼图任务表的id
	 * 
     */
    public int[][] getRw() {
        return rw;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_bzptjlb_333(int id,int bx,String rw,String jl,int qs) {
        this.id = id;
        this.bx = bx;
        this.rw = ExcelJsonUtils.toObj(rw,int[][].class);
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
        this.qs = qs;
    }
}