package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 废弃_724_单笔充值.xlsx
 */
public class Struct_dbcz_724 {
    /**序号*/
    private int xh;
    /**期数*/
    private int qs;
    /**金额
	 * jingyu:
	 * RMB*/
    private int je;
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
     * 金额
	 * jingyu:
	 * RMB
     */
    public int getJe() {
        return je;
    }
    /**
     * 奖励
     */
    public int[][] getJl() {
        return jl;
    }
    public Struct_dbcz_724(int xh,int qs,int je,String jl) {
        this.xh = xh;
        this.qs = qs;
        this.je = je;
        this.jl = ExcelJsonUtils.toObj(jl,int[][].class);
    }
}