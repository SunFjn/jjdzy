package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_753_新活动_三国宝藏-额外奖励.xlsx
 */
public class Struct_ewjl_753 {
    /**编号*/
    private int id;
    /**期数
	 * 活动期数*/
    private int qs;
    /**轮数
	 * 第x轮寻宝*/
    private int ls;
    /**开启数量
	 * 宝箱开启数量*/
    private int kqsl;
    /**奖励*/
    private int[][] jl;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 活动期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 轮数
	 * 第x轮寻宝
     */
    public int getLs() {
        return ls;
    }
    /**
     * 开启数量
	 * 宝箱开启数量
     */
    public int getKqsl() {
        return kqsl;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_ewjl_753(int id,int qs,int ls,int kqsl,String jl) {
        this.id = id;
        this.qs = qs;
        this.ls = ls;
        this.kqsl = kqsl;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}