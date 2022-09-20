package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * M_256_每日直购表2.xlsx
 */
public class Struct_mrzg2_256 {
    /**id*/
    private int id;
    /**期数*/
    private int qs;
    /**天数*/
    private int day;
    /**人民币*/
    private int rmb;
    /**奖励*/
    private int[][] reward;
    /**充值id*/
    private int cz;
    /**监控ID*/
    private int jiankong;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 天数
     */
    public int getDay() {
        return day;
    }
    /**
     * 人民币
     */
    public int getRmb() {
        return rmb;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 充值id
     */
    public int getCz() {
        return cz;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_mrzg2_256(int id,int qs,int day,int rmb,String reward,int cz,int jiankong) {
        this.id = id;
        this.qs = qs;
        this.day = day;
        this.rmb = rmb;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.cz = cz;
        this.jiankong = jiankong;
    }
}