package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_332-新活动-三国战令奖励表.xlsx
 */
public class Struct_sgzljl_332 {
    /**序号*/
    private int id;
    /**战令等级*/
    private int dengji;
    /**下级所需经验
	 * 升级到下级所需要的总经验*/
    private int shengji;
    /**普通奖励*/
    private int[][] putong;
    /**进阶奖励*/
    private int[][] jinjie;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 战令等级
     */
    public int getDengji() {
        return dengji;
    }
    /**
     * 下级所需经验
	 * 升级到下级所需要的总经验
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
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_sgzljl_332(int id,int dengji,int shengji,String putong,String jinjie,int qs) {
        this.id = id;
        this.dengji = dengji;
        this.shengji = shengji;
        this.putong = ExcelJsonUtils.toObj(putong,int[][].class);
        this.jinjie = ExcelJsonUtils.toObj(jinjie,int[][].class);
        this.qs = qs;
    }
}