package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * X_004_系统常数表.xlsx
 */
public class Struct_xtcs_004 {
    /**常数ID
	 * 4位数ID
	 * 新系统在旧系统的开始项+10或者20
	 * */
    private int ID;
    /**常数名
	 * Administrator:
	 * 达到上限后不可再获得驻守奖励，需领完奖励后才可驻守*/
    private String name;
    /**类型
	 * 1.数值
	 * (类型1就读常数段）
	 * 2.字符串
	 * （类型2就读其他）
	 * 3.直接读常数名*/
    private int type;
    /**常数值
	 * Administrator:
	 * 百分比，例如填90，则是90%*/
    private int num;
    /**其他
	 * jingyu:
	 * 秒*/
    private int[][] other;
    /**监控ID
	 * Windows 用户:
	 * 0：无监控
	 * xxx（具体数值）：监控ID*/
    private int jiankong;
    /**
     * 常数ID
	 * 4位数ID
	 * 新系统在旧系统的开始项+10或者20
	 * 
     */
    public int getID() {
        return ID;
    }
    /**
     * 常数名
	 * Administrator:
	 * 达到上限后不可再获得驻守奖励，需领完奖励后才可驻守
     */
    public String getName() {
        return name;
    }
    /**
     * 类型
	 * 1.数值
	 * (类型1就读常数段）
	 * 2.字符串
	 * （类型2就读其他）
	 * 3.直接读常数名
     */
    public int getType() {
        return type;
    }
    /**
     * 常数值
	 * Administrator:
	 * 百分比，例如填90，则是90%
     */
    public int getNum() {
        return num;
    }
    /**
     * 其他
	 * jingyu:
	 * 秒
     */
    public int[][] getOther() {
        return other;
    }
    /**
     * 监控ID
	 * Windows 用户:
	 * 0：无监控
	 * xxx（具体数值）：监控ID
     */
    public int getJiankong() {
        return jiankong;
    }
    public Struct_xtcs_004(int ID,String name,int type,int num,String other,int jiankong) {
        this.ID = ID;
        this.name = name;
        this.type = type;
        this.num = num;
        this.other = ExcelJsonUtils.toObj(other,int[][].class);
        this.jiankong = jiankong;
    }
}