package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_255_组队副本表.xlsx
 */
public class Struct_zdfb_255 {
    /**副本id*/
    private int id;
    /**开启转数*/
    private int zs;
    /**名字*/
    private String n;
    /**boss*/
    private int boss;
    /**机器人*/
    private int[][] bot;
    /**正常奖励*/
    private String reward1;
    /**额外奖励*/
    private String reward2;
    /**
     * 副本id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启转数
     */
    public int getZs() {
        return zs;
    }
    /**
     * 名字
     */
    public String getN() {
        return n;
    }
    /**
     * boss
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 机器人
     */
    public int[][] getBot() {
        return bot;
    }
    /**
     * 正常奖励
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 额外奖励
     */
    public String getReward2() {
        return reward2;
    }
    public Struct_zdfb_255(int id,int zs,String n,int boss,String bot,String reward1,String reward2) {
        this.id = id;
        this.zs = zs;
        this.n = n;
        this.boss = boss;
        this.bot = ExcelJsonUtils.toObj(bot,int[][].class);
        this.reward1 = reward1;
        this.reward2 = reward2;
    }
}