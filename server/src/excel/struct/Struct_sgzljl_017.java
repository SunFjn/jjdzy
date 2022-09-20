package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_017-三国战令奖励表.xlsx
 */
public class Struct_sgzljl_017 {
    /**战令等级*/
    private int dengji;
    /**下级所需经验
	 * 升级到下级所需要的额外经验，非总经验（已废弃，修改为总经验，2019.10.09*/
    private int shengji;
    /**普通奖励*/
    private int[][] putong;
    /**进阶奖励*/
    private int[][] jinjie;
    /**
     * 战令等级
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 下级所需经验
	 * 升级到下级所需要的额外经验，非总经验（已废弃，修改为总经验，2019.10.09
     */
    public int getShengji() {
        return shengji;
    }
    /**
     * 普通奖励
     */
    public int[][] getPutong() {
        return putong;
    }
    /**
     * 进阶奖励
     */
    public int[][] getJinjie() {
        return jinjie;
    }
    public Struct_sgzljl_017(int dengji,int shengji,String putong,String jinjie) {
        this.dengji = dengji;
        this.shengji = shengji;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
        this.jinjie = ExcelJsonUtils.toObj(jinjie,int[][].class);
    }
}