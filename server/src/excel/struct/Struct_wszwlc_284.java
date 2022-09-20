package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W-284-万兽之王-累计充值表.xlsx
 */
public class Struct_wszwlc_284 {
    /**索引id*/
    private int id;
    /**期数
	 * 1，万兽之王
	 * 2，龙飞凤舞
	 * 3，运筹帷幄*/
    private int qishu;
    /**累计充值rmb*/
    private int lj;
    /**奖励*/
    private int[][] reward;
    /**
     * 索引id
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * 1，万兽之王
	 * 2，龙飞凤舞
	 * 3，运筹帷幄
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 累计充值rmb
     */
    public int getLj() {
        return lj;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wszwlc_284(int id,int qishu,int lj,String reward) {
        this.id = id;
        this.qishu = qishu;
        this.lj = lj;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}