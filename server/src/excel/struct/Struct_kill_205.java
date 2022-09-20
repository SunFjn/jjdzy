package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * G_205_关卡千人斩表.xlsx
 */
public class Struct_kill_205 {
    /**编号*/
    private int bh;
    /**杀敌数量*/
    private int num;
    /**奖励*/
    private int[][] reward;
    /**开启条件
	 * 
	 * 需要通关关数*/
    private int tj;
    /**
     * 编号
     */
    public int getBh() {
        return bh;
    }
    /**
     * 杀敌数量
     */
    public int getNum() {
        return num;
    }
    /**
     * 奖励
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 开启条件
	 * 
	 * 需要通关关数
     */
    public int getTj() {
        return tj;
    }
    public Struct_kill_205(int bh,int num,String reward,int tj) {
        this.bh = bh;
        this.num = num;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.tj = tj;
    }
}