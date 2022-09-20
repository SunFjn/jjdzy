package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_273_群雄逐鹿任务表.xlsx
 */
public class Struct_qxzlrw_273 {
    /**任务id
	 * 1XXX：每日任务
	 * 2XXX：每周任务*/
    private int id;
    /**下个任务*/
    private int next;
    /**任务类型
	 * 1.驻守城池
	 * 2.获得积分
	 * 3.领取体力
	 * 4.购买体力
	 * 5.获得积分（每周）*/
    private int type;
    /**任务参数*/
    private int cs;
    /**奖励*/
    private int[][] reward;
    /**
     * 任务id
	 * 1XXX：每日任务
	 * 2XXX：每周任务
     */
    public int getId() {
        return id;
    }
    /**
     * 下个任务
     */
    public int getNext() {
        return next;
    }
    /**
     * 任务类型
	 * 1.驻守城池
	 * 2.获得积分
	 * 3.领取体力
	 * 4.购买体力
	 * 5.获得积分（每周）
     */
    public int getType() {
        return type;
    }
    /**
     * 任务参数
     */
    public int getCs() {
        return cs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_qxzlrw_273(int id,int next,int type,int cs,String reward) {
        this.id = id;
        this.next = next;
        this.type = type;
        this.cs = cs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}