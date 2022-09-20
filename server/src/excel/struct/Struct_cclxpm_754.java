package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_754_新活动_曹操来袭排名奖励.xlsx
 */
public class Struct_cclxpm_754 {
    /**编号*/
    private int id;
    /**名次*/
    private int[][] mc;
    /**排名奖励*/
    private int[][] jl;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 名次
     */
    public int[][] getMc() {
        return mc;
    }
    /**
     * 排名奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_cclxpm_754(int id,String mc,String jl) {
        this.id = id;
        this.mc = ExcelJsonUtils.toObj(mc,int[][].class);
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}