package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Q_720_签到奖励.xlsx
 */
public class Struct_qiandao_720 {
    /**天数
	 * XX：第1期的第XX天
	 * 20XX：第2期的第XX天
	 * 30XX：第3期的第XX天
	 * 40XX：第4期的第XX天*/
    private int NUM;
    /**奖励*/
    private int[][] AWARD;
    /**期数*/
    private int qs;
    /**
     * 天数
	 * XX：第1期的第XX天
	 * 20XX：第2期的第XX天
	 * 30XX：第3期的第XX天
	 * 40XX：第4期的第XX天
     */
    public int getNUM() {
        return NUM;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    /**
     * 期数
     */
    public int getQs() {
        return qs;
    }
    public Struct_qiandao_720(int NUM,String AWARD,int qs) {
        this.NUM = NUM;
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.qs = qs;
    }
}