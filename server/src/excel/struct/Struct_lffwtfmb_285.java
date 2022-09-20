package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_285_龙飞凤舞_天赋目标表.xlsx
 */
public class Struct_lffwtfmb_285 {
    /**id
	 * 1XX：装备升级
	 * 2XX：装备升品
	 * 3XX：天赋等级
	 * 4XX：天赋战力
	 * ID=期数*100+ID*/
    private int id;
    /**期数*/
    private int qs;
    /**参数1*/
    private int c1;
    /**参数2*/
    private int c2;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XX：装备升级
	 * 2XX：装备升品
	 * 3XX：天赋等级
	 * 4XX：天赋战力
	 * ID=期数*100+ID
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
     * 参数1
     */
    public int getC1() {
        return c1;
    }
    /**
     * 参数2
     */
    public int getC2() {
        return c2;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_lffwtfmb_285(int id,int qs,int c1,int c2,String reward) {
        this.id = id;
        this.qs = qs;
        this.c1 = c1;
        this.c2 = c2;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}