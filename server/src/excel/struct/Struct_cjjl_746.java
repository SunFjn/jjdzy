package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_746_成就奖励.xlsx
 */
public class Struct_cjjl_746 {
    /**序号*/
    private int id;
    /**成就大师阶数*/
    private int js;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 成就大师阶数
     */
    public int getJs() {
        return js;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_cjjl_746(int id,int js,String jl) {
        this.id = id;
        this.js = js;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}