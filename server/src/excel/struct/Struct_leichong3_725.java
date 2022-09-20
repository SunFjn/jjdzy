package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_725_累计充值（8-28）.xlsx
 */
public class Struct_leichong3_725 {
    /**序号*/
    private int id;
    /**额度
	 * jingyu:
	 * RMB*/
    private int coin;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
    /**期数*/
    private int qs;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 额度
	 * jingyu:
	 * RMB
     */
    public int getCoin() {
        return coin;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_leichong3_725(int id,int coin,String reward,int jiankong,int qs) {
        this.id = id;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
        this.qs = qs;
    }
}