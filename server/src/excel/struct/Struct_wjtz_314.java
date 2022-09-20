package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * W_314_武将挑战表.xlsx
 */
public class Struct_wjtz_314 {
    /**id
	 * 1XXX：第1个boss
	 * 2XXX：第2个boss
	 * NXXX：第N个boss*/
    private int id;
    /**BOSS*/
    private int boss;
    /**开启天数
	 * 从开服第N天0点开启*/
    private int start;
    /**结束天数
	 * 从开服第N天晚上24点结束*/
    private int end;
    /**BOSS掉落*/
    private String bd;
    /**通关推荐战力*/
    private int power;
    /**关卡奖励及展示
	 * [A,B,C]
	 * A=类型
	 * B=ID
	 * C=数量
	 * */
    private int[][] reward;
    /**大奖奖励及展示
	 * [A,B,C]
	 * A=类型
	 * B=ID
	 * C=数量*/
    private int[][] reward1;
    /**通关是否广播
	 * 0：不广播
	 * 1：广播
	 * 
	 * 
	 * */
    private int guangbo;
    /**
     * id
	 * 1XXX：第1个boss
	 * 2XXX：第2个boss
	 * NXXX：第N个boss
     */
    public int getId() {
        return id;
    }
    /**
     * BOSS
     */
    public int getBoss() {
        return boss;
    }
    /**
     * 开启天数
	 * 从开服第N天0点开启
     */
    public int getStart() {
        return start;
    }
    /**
     * 结束天数
	 * 从开服第N天晚上24点结束
     */
    public int getEnd() {
        return end;
    }
    /**
     * BOSS掉落
     */
    public String getBd() {
        return bd;
    }
    /**
     * 通关推荐战力
     */
    public int getPower() {
        return power;
    }
    /**
     * 关卡奖励及展示
	 * [A,B,C]
	 * A=类型
	 * B=ID
	 * C=数量
	 * 
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 大奖奖励及展示
	 * [A,B,C]
	 * A=类型
	 * B=ID
	 * C=数量
     */
    public int[][] getReward1() {
        return reward1;
    }
    /**
     * 通关是否广播
	 * 0：不广播
	 * 1：广播
	 * 
	 * 
	 * 
     */
    public int getGuangbo() {
        return guangbo;
    }
    public Struct_wjtz_314(int id,int boss,int start,int end,String bd,int power,String reward,String reward1,int guangbo) {
        this.id = id;
        this.boss = boss;
        this.start = start;
        this.end = end;
        this.bd = bd;
        this.power = power;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.reward1 = ExcelJsonUtils.toObj(reward1,int[][].class);
        this.guangbo = guangbo;
    }
}