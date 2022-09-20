package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_262_闯关有礼表.xlsx
 */
public class Struct_cgyl_262 {
    /**目标id*/
    private int id;
    /**目标大奖*/
    private int[][] reward;
    /**下个目标*/
    private int next;
    /**监控ID*/
    private int jiankong;
    /**
     * 目标id
     */
    public int getId() {
        return id;
    }
    /**
     * 目标大奖
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 下个目标
     */
    public int getNext() {
        return next;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_cgyl_262(int id,String reward,int next,int jiankong) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.next = next;
        this.jiankong = jiankong;
    }
}