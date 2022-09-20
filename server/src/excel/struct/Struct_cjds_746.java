package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_746_成就大师.xlsx
 */
public class Struct_cjds_746 {
    /**成就大师id*/
    private int id;
    /**成就点*/
    private int cjd;
    /**属性*/
    private int[][] sx;
    /**战力*/
    private int zl;
    /**成就奖励*/
    private int[][] jl;
    /**
     * 成就大师id
     */
    public int getId() {
        return id;
    }
    /**
     * 成就点
     */
    public int getCjd() {
        return cjd;
    }
    /**
     * 属性
     */
    public int[][] getSx() {
        return sx;
    }
    /**
     * 战力
     */
    public int getZl() {
        return zl;
    }
    /**
     * 成就奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_cjds_746(int id,int cjd,String sx,int zl,String jl) {
        this.id = id;
        this.cjd = cjd;
        this.sx = ExcelJsonUtils.toObj(sx,int[][].class);
        this.zl = zl;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}