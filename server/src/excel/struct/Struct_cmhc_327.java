package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Y_327_运筹帷幄_出谋划策表.xlsx
 */
public class Struct_cmhc_327 {
    /**序号*/
    private int xh;
    /**期数*/
    private int qs;
    /**次数*/
    private int cs;
    /**奖励*/
    private int[][] jl;
    /**
     * 序号
     */
    public int getXh() {
        return xh;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 次数
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
    public Struct_cmhc_327(int xh,int qs,int cs,String jl) {
        this.xh = xh;
        this.qs = qs;
        this.cs = cs;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}