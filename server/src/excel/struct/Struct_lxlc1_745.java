package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * L_745新连续累充1表.xlsx
 */
public class Struct_lxlc1_745 {
    /**序号*/
    private int id;
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
    public Struct_lxlc1_745(int id,int tianshu,String jiangli,int jiankong) {
        this.id = id;
        this.tianshu = tianshu;
        this.jiangli = ExcelJsonUtils.toObj(jiangli,int[][].class);
        this.jiankong = jiankong;
    }
}