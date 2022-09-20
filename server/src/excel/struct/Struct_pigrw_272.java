package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_272_少主活动金猪送财任务表.xlsx
 */
public class Struct_pigrw_272 {
    /**任务id
	 * jingyu:
	 * 1XXX：全民BOSS
	 * 2XXX：七擒孟获
	 * 3XXX：单刀赴会
	 * 4XXX：三国战神
	 * 5XXX：南征北战
	 * 6XXX：消费
	 * 7XXX：乱世枭雄*/
    private int id;
    /**下一个任务*/
    private int next;
    /**参数*/
    private int cs;
    /**银猪奖励*/
    private int[][] reward;
    /**银猪元宝增值（百分比）*/
    private int zz;
    /**金猪奖励*/
    private int[][] reward1;
    /**金猪元宝增值（百分比）*/
    private int zz1;
    /**
     * 任务id
	 * jingyu:
	 * 1XXX：全民BOSS
	 * 2XXX：七擒孟获
	 * 3XXX：单刀赴会
	 * 4XXX：三国战神
	 * 5XXX：南征北战
	 * 6XXX：消费
	 * 7XXX：乱世枭雄
     */
    public int getId() {
        return id;
    }
    /**
     * 下一个任务
     */
    public int getNext() {
        return next;
    }
    /**
     * 参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 银猪奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 银猪元宝增值（百分比）
     */
    public int getZz() {
        return zz;
    }
    /**
     * 金猪奖励
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 金猪元宝增值（百分比）
     */
    public int getZz1() {
        return zz1;
    }
    public Struct_pigrw_272(int id,int next,int cs,String reward,int zz,String reward1,int zz1) {
        this.id = id;
        this.next = next;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.zz = zz;
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.zz1 = zz1;
    }
}