package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * B_261_八阵图鉴定表.xlsx
 */
public class Struct_bztjd_261 {
    /**id*/
    private int id;
    /**单抽消耗*/
    private int[][] conmuse;
    /**10连消耗*/
    private int[][] conmuse1;
    /**普通奖池*/
    private String reward;
    /**高级奖池*/
    private String reward1;
    /**每日次数*/
    private int time;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 单抽消耗
     */
    public int[][] getConmuse() {
        return conmuse;
    }
    /**
     * 10连消耗
     */
    public int[][] getConmuse1() {
        return conmuse1;
    }
    /**
     * 普通奖池
     */
    public String getReward() {
        return reward;
    }
    /**
     * 高级奖池
     */
    public String getReward1() {
        return reward1;
    }
    /**
     * 每日次数
     */
    public int getTime() {
        return time;
    }
    public Struct_bztjd_261(int id,String conmuse,String conmuse1,String reward,String reward1,int time) {
        this.id = id;
        this.conmuse = ExcelJsonUtils.toObj(conmuse,int[][].class);
        this.conmuse1 = ExcelJsonUtils.toObj(conmuse1,int[][].class);
        this.reward = reward;
        this.reward1 = reward1;
        this.time = time;
    }
}