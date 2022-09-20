package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_781_线下每日累充返利道具.xlsx
 */
public class Struct_xxdrlc1_781 {
    /**序号*/
    private int id;
    /**额度
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
     * 额度
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
    public Struct_xxdrlc1_781(int id,int coin,String reward,int jiankong) {
        this.id = id;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}