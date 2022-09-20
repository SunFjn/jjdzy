package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_010_超级点将2.xlsx
 */
public class Struct_cjdj1_010 {
    /**序号*/
    private int xuhao;
    /**期数*/
    private int qishu;
    /**抽奖次数*/
    private int cishu;
    /**RMB*/
    private int yuanbao;
    /**奖励*/
    private int[][] reward;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getXuhao() {
        return xuhao;
    }
    /**
     * 期数
     */
    public int getQishu() {
        return qishu;
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
    public Struct_cjdj1_010(int xuhao,int qishu,int cishu,int yuanbao,String reward,int jiankong) {
        this.xuhao = xuhao;
        this.qishu = qishu;
        this.cishu = cishu;
        this.yuanbao = yuanbao;
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.jiankong = jiankong;
    }
}