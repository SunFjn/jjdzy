package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_775_新活动-做元宵.xlsx
 */
public class Struct_zyx_775 {
    /**期数*/
    private int qs;
    /**制作材料
	 * Administrator:
	 * 注意所有类型的元宵要配成一样的*/
    private int[][] cl;
    /**奖励*/
    private int[][] jl;
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 制作材料
	 * Administrator:
	 * 注意所有类型的元宵要配成一样的
     */
    public int[][] getCl() {
        return cl;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_zyx_775(int qs,String cl,String jl) {
        this.qs = qs;
        this.cl = ExcelJsonUtils.toObj(cl,int[][].class);
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}