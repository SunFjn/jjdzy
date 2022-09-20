package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_734_新单日累充2.xlsx
 */
public class Struct_drlc2_734 {
    /**序号*/
    private int id;
    /**星期*/
    private int xq;
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
     * 星期
     */
    public int getXq() {
        return xq;
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
    public Struct_drlc2_734(int id,int xq,int coin,String reward,int jiankong) {
        this.id = id;
        this.xq = xq;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}