package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_262_八门金锁表.xlsx
 */
public class Struct_bmjs_262 {
    /**id*/
    private int id;
    /**奖励*/
    private int[][] reward;
    /**充值完成（元宝）*/
    private int cz;
    /**下一门*/
    private int next;
    /**广播道具*/
    private int[][] item;
    /**期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天*/
    private int qs;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 充值完成（元宝）
     */
    public int getCz() {
        return cz;
    }
    /**
     * 下一门
     */
    public int getNext() {
        return next;
    }
    /**
     * 广播道具
     */
    public int[][] getItem() {
        return item;
    }
    /**
     * 期数
	 * 1 8-14天
	 * 2 15-21天
	 * 3 22-28天
     */
    public int getQs() {
        return qs;
    }
    public Struct_bmjs_262(int id,String reward,int cz,int next,String item,int qs) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.cz = cz;
        this.next = next;
        this.item = ExcelJsonUtils.toObj(item,int[][].class);
        this.qs = qs;
    }
}