package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_294_镇守四方商城表.xlsx
 */
public class Struct_zssfstore_294 {
    /**id*/
    private int id;
    /**奖励道具*/
    private int[][] reward;
    /**消耗道具*/
    private int[][] consume;
    /**限购次数*/
    private int time;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 奖励道具
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 消耗道具
     */
    public int[][] getConsume() {
        return consume;
    }
    /**
     * 限购次数
     */
    public int getTime() {
        return time;
    }
    public Struct_zssfstore_294(int id,String reward,String consume,int time) {
        this.id = id;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.consume = ExcelJsonUtils.toObj(consume,int[][].class);
        this.time = time;
    }
}