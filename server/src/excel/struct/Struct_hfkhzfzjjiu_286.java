package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * H_286_合服狂欢_张飞醉酒美酒表.xlsx
 */
public class Struct_hfkhzfzjjiu_286 {
    /**id*/
    private int id;
    /**增加醉意值*/
    private int zui;
    /**奖励*/
    private int[][] reward;
    /**每天元宝次数*/
    private int time;
    /**元宝消耗*/
    private int[][] conmuse;
    /**道具消耗*/
    private int[][] conmuse1;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 增加醉意值
     */
    public int getZui() {
        return zui;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 每天元宝次数
     */
    public int getTime() {
        return time;
    }
    /**
     * 元宝消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 道具消耗
     */
    public int[][] getConmuse1() {
        return conmuse1;
    }
    public Struct_hfkhzfzjjiu_286(int id,int zui,String reward,int time,String conmuse,String conmuse1) {
        this.id = id;
        this.zui = zui;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.time = time;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.conmuse1 = ExcelJsonUtils.toObj(conmuse1,int[][].class);
    }
}