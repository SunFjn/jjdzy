package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_742_庆典基金.xlsx
 */
public class Struct_qdjj_742 {
    /**序号*/
    private int id;
    /**期数*/
    private int qishu;
    /**天数
	 * Windows 用户:
	 * 累计登录xx天可领奖*/
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
     */
    public int getQishu() {
        return qishu;
    }
    /**
     * 天数
	 * Windows 用户:
	 * 累计登录xx天可领奖
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
    public Struct_qdjj_742(int id,int qishu,int tianshu,String jiangli,int jiankong) {
        this.id = id;
        this.qishu = qishu;
        this.tianshu = tianshu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}