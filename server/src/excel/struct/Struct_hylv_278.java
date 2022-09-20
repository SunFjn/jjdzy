package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * F_278_分享-好友等级表.xlsx
 */
public class Struct_hylv_278 {
    /**id*/
    private int id;
    /**下个id*/
    private int next;
    /**等级*/
    private int lv;
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
     * 等级
     */
    public int getLv() {
        return lv;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_hylv_278(int id,int next,int lv,String reward) {
        this.id = id;
        this.next = next;
        this.lv = lv;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}