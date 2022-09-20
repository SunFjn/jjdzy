package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * D_225_单刀赴会段位表.xlsx
 */
public class Struct_ddfhdan_225 {
    /**段位*/
    private int dan;
    /**升级所需积分*/
    private int win;
    /**段位奖励*/
    private int[][] reward;
    /**
     * 段位
     */
    public int getDan() {
        return dan;
    }
    /**
     * 升级所需积分
     */
    public int getWin() {
        return win;
    }
    /**
     * 段位奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ddfhdan_225(int dan,int win,String reward) {
        this.dan = dan;
        this.win = win;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}