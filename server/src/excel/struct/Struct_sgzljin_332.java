package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_332-新活动-三国战令进阶表.xlsx
 */
public class Struct_sgzljin_332 {
    /**编号*/
    private int dengji;
    /**对应商品ID
	 * 对应充值商品ID*/
    private int shangpin;
    /**进阶奖励*/
    private int[][] jinjie;
    /**期数*/
    private int qs;
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
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_sgzljin_332(int dengji,int shangpin,String jinjie,int qs) {
        this.dengji = dengji;
        this.shangpin = shangpin;
        this.jinjie = ExcelJsonUtils.toObj(jinjie,int[][].class);
        this.qs = qs;
    }
}