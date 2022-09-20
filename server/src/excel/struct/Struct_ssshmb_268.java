package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S-268-圣兽降临-圣兽目标表.xlsx
 */
public class Struct_ssshmb_268 {
    /**id
	 * 1XXX：兽魂印记
	 * 2XXX：兽魂觉醒
	 * 3XXX：星宿升阶
	 * 4XXX：圣兽战力*/
    private int id;
    /**参数1*/
    private int c1;
    /**参数2*/
    private int c2;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XXX：兽魂印记
	 * 2XXX：兽魂觉醒
	 * 3XXX：星宿升阶
	 * 4XXX：圣兽战力
     */
    public int getId() {
        return id;
    }
    /**
     * 参数1
     */
    public int getC1() {
        return c1;
    }
    /**
     * 参数2
     */
    public int getC2() {
        return c2;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_ssshmb_268(int id,int c1,int c2,String reward) {
        this.id = id;
        this.c1 = c1;
        this.c2 = c2;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}