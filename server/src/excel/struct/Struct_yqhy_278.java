package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_278_分享-邀请好友表.xlsx
 */
public class Struct_yqhy_278 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**邀请人数*/
    private int time;
    /**奖励*/
    private int[][] reward;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 下个id
     */
    public int getNext() {
        return next;
    }
    /**
     * 邀请人数
     */
    public int getTime() {
        return time;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_yqhy_278(int id,int next,int time,String reward) {
        this.id = id;
        this.next = next;
        this.time = time;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}