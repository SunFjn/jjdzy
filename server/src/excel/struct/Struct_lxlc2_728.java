package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_728连续累充2表-弃用.xlsx
 */
public class Struct_lxlc2_728 {
    /**序号*/
    private int id;
    /**期数
	 * x期
	 * x=1,2*/
    private int qishu;
    /**天数
	 * 累计充值的天数*/
    private int tianshu;
    /**奖励*/
    private int[][] jiangli;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
     */
    public int getId() {
        return id;
    }
    /**
     * 期数
	 * x期
	 * x=1,2
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 天数
	 * 累计充值的天数
     */
    public int getTianshu() {
        return tianshu;
    }
    /**
     * 奖励
     */
    public int[][] getJiangli() {
        return jiangli;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_lxlc2_728(int id,int qishu,int tianshu,String jiangli,int jiankong) {
        this.id = id;
        this.qishu = qishu;
        this.tianshu = tianshu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}