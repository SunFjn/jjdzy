package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_223_七擒孟获目标表.xlsx
 */
public class Struct_sevenmb_223 {
    /**目标id
	 * jingyu:
	 * AXX
	 * A=bossid
	 * XX=目标序号*/
    private int boss;
    /**达标伤害1*/
    private long damage1;
    /**奖励1*/
    private int[][] reward1;
    /**达标伤害2*/
    private long damage2;
    /**奖励2*/
    private int[][] reward2;
    /**达标伤害3*/
    private long damage3;
    /**奖励3*/
    private int[][] reward3;
    /**达标伤害4*/
    private long damage4;
    /**奖励4*/
    private int[][] reward4;
    /**达标伤害5*/
    private long damage5;
    /**奖励5*/
    private int[][] reward5;
    /**
     * 目标id
	 * jingyu:
	 * AXX
	 * A=bossid
	 * XX=目标序号
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 达标伤害1
     */
    public long getDamage1() {
        return damage1;
    }
    /**
     * 奖励1
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 达标伤害2
     */
    public long getDamage2() {
        return damage2;
    }
    /**
     * 奖励2
     */
    public int[][] getReward2() {
        return reward2;
    }
    /**
     * 达标伤害3
     */
    public long getDamage3() {
        return damage3;
    }
    /**
     * 奖励3
     */
    public int[][] getReward3() {
        return reward3;
    }
    /**
     * 达标伤害4
     */
    public long getDamage4() {
        return damage4;
    }
    /**
     * 奖励4
     */
    public int[][] getReward4() {
        return reward4;
    }
    /**
     * 达标伤害5
     */
    public long getDamage5() {
        return damage5;
    }
    /**
     * 奖励5
     */
    public int[][] getReward5() {
        return reward5;
    }
    public Struct_sevenmb_223(int boss,long damage1,String reward1,long damage2,String reward2,long damage3,String reward3,long damage4,String reward4,long damage5,String reward5) {
        this.boss = boss;
        this.damage1 = damage1;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.damage2 = damage2;
        this.reward2 = ExcelJsonUtils.toObj(reward2,int[][].class);
        this.damage3 = damage3;
        this.reward3 = ExcelJsonUtils.toObj(reward3,int[][].class);
        this.damage4 = damage4;
        this.reward4 = ExcelJsonUtils.toObj(reward4,int[][].class);
        this.damage5 = damage5;
        this.reward5 = ExcelJsonUtils.toObj(reward5,int[][].class);
    }
}