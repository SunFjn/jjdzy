package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * J_718_聚宝盆.xlsx
 */
public class Struct_jbp_718 {
    /**序号
	 * 类型*1000+序号
	 * 1为登录返利
	 * 2为闯关返利
	 * 3为等级返利
	 * 4为成长返利*/
    private int ID;
    /**条件
	 * 【条件，值】
	 * 1为天数
	 * 2为关卡数
	 * 3为等级
	 * 4为战力*/
    private int[] NEED;
    /**奖励*/
    private int[][] AWARD;
    /**监控ID*/
    private int jiankong;
    /**
     * 序号
	 * 类型*1000+序号
	 * 1为登录返利
	 * 2为闯关返利
	 * 3为等级返利
	 * 4为成长返利
     */
    public int getID() {
        return ID;
    }
    /**
     * 条件
	 * 【条件，值】
	 * 1为天数
	 * 2为关卡数
	 * 3为等级
	 * 4为战力
     */
    public int[] getNEED() {
        return NEED;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    /**
     * 监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_jbp_718(int ID,String NEED,String AWARD,int jiankong) {
        this.ID = ID;
        this.NEED = ExcelJsonUtils.toObj(NEED,int[].class);
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.jiankong = jiankong;
    }
}