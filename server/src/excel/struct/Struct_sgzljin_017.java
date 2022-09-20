package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_017-三国战令进阶表.xlsx
 */
public class Struct_sgzljin_017 {
    /**编号*/
    private int dengji;
    /**对应商品ID
	 * 对应充值商品ID*/
    private int shangpin;
    /**进阶奖励*/
    private int[][] jinjie;
    /**
     * 编号
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 对应商品ID
	 * 对应充值商品ID
     */
    public int getShangpin() {
        return shangpin;
    }
    /**
     * 进阶奖励
     */
    public int[][] getJinjie() {
        return jinjie;
    }
    public Struct_sgzljin_017(int dengji,int shangpin,String jinjie) {
        this.dengji = dengji;
        this.shangpin = shangpin;
        this.jinjie = ExcelJsonUtils.toObj(jinjie,int[][].class);
    }
}