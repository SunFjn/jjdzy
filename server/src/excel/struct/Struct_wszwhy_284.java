package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W-284-万兽之王-每日活跃表.xlsx
 */
public class Struct_wszwhy_284 {
    /**id
	 * 1XXX：全民BOSS
	 * 2XXX：单刀赴会
	 * 3XXX：三国战神
	 * 4XXX：南征北战
	 * 上述ID+期数*10000*/
    private int id;
    /**期数
	 * 1，万兽之王
	 * 2，龙飞凤舞
	 * 3，运筹帷幄*/
    private int qishu;
    /**任务类型
	 * 1.全民boss、
	 * 2.单刀赴会
	 * 3.三国战神
	 * 4.南征北战
	 * */
    private int leixing;
    /**参数*/
    private int c;
    /**奖励*/
    private int[][] reward;
    /**
     * id
	 * 1XXX：全民BOSS
	 * 2XXX：单刀赴会
	 * 3XXX：三国战神
	 * 4XXX：南征北战
	 * 上述ID+期数*10000
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
     * 任务类型
	 * 1.全民boss、
	 * 2.单刀赴会
	 * 3.三国战神
	 * 4.南征北战
	 * 
     */
    public int getLeixing() {
        return leixing;
    }
    /**
     * 参数
     */
    public int getC() {
        return c;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    public Struct_wszwhy_284(int id,int qishu,int leixing,int c,String reward) {
        this.id = id;
        this.qishu = qishu;
        this.leixing = leixing;
        this.c = c;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
    }
}