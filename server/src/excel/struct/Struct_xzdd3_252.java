package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_252_血战到底(8-28).xlsx
 */
public class Struct_xzdd3_252 {
    /**id
	 * XX：第一期ID
	 * 1XXX：第二期ID
	 * 2XXX：第三期ID
	 * 3XXX：第四期ID*/
    private int id;
    /**BOSS*/
    private int boss;
    /**BOSS掉落*/
    private String bd;
    /**通关推荐战力*/
    private int power;
    /**大奖奖励展示*/
    private int[][] reward1;
    /**大奖奖励展示2*/
    private int[][] reward2;
    /**通关是否广播
	 * 0：不广播
	 * 1：广播第1个大奖
	 * 2：广播第2个大奖
	 * 
	 * */
    private int guangbo;
    /**期数*/
    private int qs;
    /**
     * id
	 * XX：第一期ID
	 * 1XXX：第二期ID
	 * 2XXX：第三期ID
	 * 3XXX：第四期ID
     */
    public int getId() {
        return id;
    }
    /**
     * BOSS
     */
    public int getBoss() {
        return boss;
    }
    /**
     * BOSS掉落
     */
    public String getBd() {
        return bd;
    }
    /**
     * 通关推荐战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 大奖奖励展示
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 大奖奖励展示2
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 通关是否广播
	 * 0：不广播
	 * 1：广播第1个大奖
	 * 2：广播第2个大奖
	 * 
	 * 
     */
    public int getGuangbo() {
        return guangbo;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_xzdd3_252(int id,int boss,String bd,int power,String reward1,String reward2,int guangbo,int qs) {
        this.id = id;
        this.boss = boss;
        this.bd = bd;
        this.power = power;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.guangbo = guangbo;
        this.qs = qs;
    }
}