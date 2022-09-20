package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_769_新活动-成就树奖励.xlsx
 */
public class Struct_cjsjl_769 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**层数
	 * 
	 * 成就树层数*/
    private int cs;
    /**奖励*/
    private int[][] jl;
    /**
     * id
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
     * 层数
	 * 
	 * 成就树层数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_cjsjl_769(int id,int qs,int cs,String jl) {
        this.id = id;
        this.qs = qs;
        this.cs = cs;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}