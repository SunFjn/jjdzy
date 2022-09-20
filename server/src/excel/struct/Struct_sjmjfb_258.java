package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_258_升阶秘境副本表.xlsx
 */
public class Struct_sjmjfb_258 {
    /**id
	 * 1XXX：武将秘境
	 * 2XXX：战甲秘境
	 * 3XXX：宝物秘境
	 * 4XXX：天书秘境
	 * 5XXX：神剑秘境
	 * 6XXX：异宝秘境
	 * 7XXX：兵法秘境*/
    private int id;
    /**开启条件（对应系统升阶等级）*/
    private int open;
    /**BOSS*/
    private int boss;
    /**BOSS掉落*/
    private String reward1;
    /**首通奖励*/
    private int[][] reward2;
    /**协助奖励*/
    private String reward3;
    /**奖励预览*/
    private int[][] kf;
    /**秘境宝箱*/
    private int[][] reward4;
    /**开启价格*/
    private int[][] money;
    /**
     * id
	 * 1XXX：武将秘境
	 * 2XXX：战甲秘境
	 * 3XXX：宝物秘境
	 * 4XXX：天书秘境
	 * 5XXX：神剑秘境
	 * 6XXX：异宝秘境
	 * 7XXX：兵法秘境
     */
    public int getId() {
        return id;
    }
    /**
     * 开启条件（对应系统升阶等级）
     */
    public int getOpen() {
        return open;
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
    public String getReward1() {
        return reward1;
    }
    /**
     * 首通奖励
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 协助奖励
     */
    public String getReward3() {
        return reward3;
    }
    /**
     * 奖励预览
     */
    public int[][] getKf() {
        return kf;
    }
    /**
     * 秘境宝箱
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 开启价格
     */
    public int[][] getMoney() {
        return money;
    }
    public Struct_sjmjfb_258(int id,int open,int boss,String reward1,String reward2,String reward3,String kf,String reward4,String money) {
        this.id = id;
        this.open = open;
        this.boss = boss;
        this.reward1 = reward1;
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.reward3 = reward3;
        this.kf = ExcelJsonUtils.toObj(kf,int[][].class);
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.money = ExcelJsonUtils.toObj(money,int[][].class);
    }
}