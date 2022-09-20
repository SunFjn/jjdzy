package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_734_新单日累充(8-28).xlsx
 */
public class Struct_drlc3_734 {
    /**序号*/
    private int id;
    /**天数
	 * jingyu:
	 * 第x天：开服第x天
	 * x：1,2,3,4,5,6,7
	 * */
    private int ts;
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
     * 天数
	 * jingyu:
	 * 第x天：开服第x天
	 * x：1,2,3,4,5,6,7
	 * 
     */
    public int getTs() {
        return ts;
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
    public Struct_drlc3_734(int id,int ts,int coin,String reward,int jiankong) {
        this.id = id;
        this.ts = ts;
        this.coin = coin;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}