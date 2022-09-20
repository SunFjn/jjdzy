package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_730首充团购.xlsx
 */
public class Struct_sctg_730 {
    /**序号*/
    private int id;
    /**开服天数
	 * 
	 * 开服后每天配置的奖励不同*/
    private int tianshu;
    /**人数
	 * 
	 * 团购分类（按目标人数分类），具体人数*/
    private int renshu;
    /**金额
	 * 
	 * 0：没有充值条件
	 * 1：充值任意金额
	 * x（大于1的具体值）：充值指定金额*/
    private int jine;
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
     * 开服天数
	 * 
	 * 开服后每天配置的奖励不同
     */
    public int getTianshu() {
        return tianshu;
    }
    /**
     * 人数
	 * 
	 * 团购分类（按目标人数分类），具体人数
     */
    public int getRenshu() {
        return renshu;
    }
    /**
     * 金额
	 * 
	 * 0：没有充值条件
	 * 1：充值任意金额
	 * x（大于1的具体值）：充值指定金额
     */
    public int getJine() {
        return jine;
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
    public Struct_sctg_730(int id,int tianshu,int renshu,int jine,String jiangli,int jiankong) {
        this.id = id;
        this.tianshu = tianshu;
        this.renshu = renshu;
        this.jine = jine;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}