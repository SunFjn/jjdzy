package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_725_累计充值2.xlsx
 */
public class Struct_leichong1_725 {
    /**序号*/
    private int id;
    /**期数*/
    private int qishu;
    /**额度
	 * jingyu:
	 * RMB*/
    private int coin;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
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
    public Struct_leichong1_725(int id,int qishu,int coin,String reward,int jiankong) {
        this.id = id;
        this.qishu = qishu;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}