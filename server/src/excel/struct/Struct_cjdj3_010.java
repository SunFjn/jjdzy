package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_010_超级点将(8-28).xlsx
 */
public class Struct_cjdj3_010 {
    /**序号
	 * X和XX：第一期ID
	 * 1XXX：第二期ID
	 * 2XXX：第三期ID
	 * 3XXX：第四期ID*/
    private int xuhao;
    /**抽奖次数*/
    private int cishu;
    /**RMB*/
    private int yuanbao;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
    /**期数*/
    private int qs;
    /**
     * 序号
	 * X和XX：第一期ID
	 * 1XXX：第二期ID
	 * 2XXX：第三期ID
	 * 3XXX：第四期ID
     */
    public int getXuhao() {
        return xuhao;
    }
    /**
     * 抽奖次数
     */
    public int getCishu() {
        return cishu;
    }
    /**
     * RMB
     */
    public int getYuanbao() {
        return yuanbao;
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
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_cjdj3_010(int xuhao,int cishu,int yuanbao,String reward,int jiankong,int qs) {
        this.xuhao = xuhao;
        this.cishu = cishu;
        this.yuanbao = yuanbao;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
        this.qs = qs;
    }
}