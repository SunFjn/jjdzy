package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_707_设置.xlsx
 */
public class Struct_shezhi_707 {
    /**序号
	 * 类型*1000+序号*/
    private int id;
    /**类型
	 * 1是头像
	 * 2是头像框
	 * */
    private int type;
    /**激活条件
	 * [x,y]
	 * x类型y值
	 * 1为VIP 2为道具激活
	 * 道具激活时，y为道具ID
	 * 3为激活武将激活，y为武将职业ID
	 * 4为激活侍女激活，y为侍女表的侍女ID*/
    private int[][] condition;
    /**
     * 序号
	 * 类型*1000+序号
     */
    public int getId() {
        return id;
    }
    /**
     * 类型
	 * 1是头像
	 * 2是头像框
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 激活条件
	 * [x,y]
	 * x类型y值
	 * 1为VIP 2为道具激活
	 * 道具激活时，y为道具ID
	 * 3为激活武将激活，y为武将职业ID
	 * 4为激活侍女激活，y为侍女表的侍女ID
     */
    public int[][] getCondition() {
        return condition;
    }
    public Struct_shezhi_707(int id,int type,String condition) {
        this.id = id;
        this.type = type;
        this.condition = ExcelJsonUtils.toObj(condition,int[][].class);
    }
}