package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * 废弃_727_单日累充..xlsx
 */
public class Struct_drleichong_727 {
    /**序号*/
    private int id;
    /**额度
	 * jingyu:
	 * RMB*/
    private int coin;
    /**期数*/
    private int qs;
    /**奖励*/
    private int[][] reward;
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
     * 期数
     */
    public int getQs() {
        return qs;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_drleichong_727(int id,int coin,int qs,String reward) {
        this.id = id;
        this.coin = coin;
        this.qs = qs;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}