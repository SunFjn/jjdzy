package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_739_时装.xlsx
 */
public class Struct_sz_739 {
    /**编号
	 * 
	 * AXXX
	 * A:对应武将职业
	 * xxx：时装编号
	 * A:
	 * 1=赵云
	 * 2=诸葛亮
	 * 3=貂蝉
	 * 4=马超
	 * 5=陆逊
	 * 6=张飞
	 * 7=关羽
	 * 8=夏侯渊
	 * 9=孙姬
	 * 10=许褚
	 * 11=吕蒙
	 * 12=吕布
	 * 13=黄忠
	 * 14=张辽*/
    private int ID;
    /**名称
	 * 时装的名字*/
    private String mingcheng;
    /**模型ID*/
    private int moxing;
    /**时装激活
	 * [[类型，道具ID，数量]]*/
    private int[][] jihuo;
    /**激活属性*/
    private int[][] shuxing;
    /**基础战力*/
    private int jczhanli;
    /**升星属性*/
    private int[][] shengxing;
    /**升星战力*/
    private int sxzhanli;
    /**升星上限*/
    private int shangxian;
    /**
     * 编号
	 * 
	 * AXXX
	 * A:对应武将职业
	 * xxx：时装编号
	 * A:
	 * 1=赵云
	 * 2=诸葛亮
	 * 3=貂蝉
	 * 4=马超
	 * 5=陆逊
	 * 6=张飞
	 * 7=关羽
	 * 8=夏侯渊
	 * 9=孙姬
	 * 10=许褚
	 * 11=吕蒙
	 * 12=吕布
	 * 13=黄忠
	 * 14=张辽
     */
    public int getID() {
        return ID;
    }
    /**
     * 名称
	 * 时装的名字
     */
    public String getMingcheng() {
        return mingcheng;
    }
    /**
     * 模型ID
     */
    public int getMoxing() {
        return moxing;
    }
    /**
     * 时装激活
	 * [[类型，道具ID，数量]]
     */
    public int[][] getJihuo() {
        return jihuo;
    }
    /**
     * 激活属性
     */
    public int[][] getShuxing() {
        return shuxing;
    }
    /**
     * 基础战力
     */
    public int getJczhanli() {
        return jczhanli;
    }
    /**
     * 升星属性
     */
    public int[][] getShengxing() {
        return shengxing;
    }
    /**
     * 升星战力
     */
    public int getSxzhanli() {
        return sxzhanli;
    }
    /**
     * 升星上限
     */
    public int getShangxian() {
        return shangxian;
    }
    public Struct_sz_739(int ID,String mingcheng,int moxing,String jihuo,String shuxing,int jczhanli,String shengxing,int sxzhanli,int shangxian) {
        this.ID = ID;
        this.mingcheng = mingcheng;
        this.moxing = moxing;
        this.jihuo = ExcelJsonUtils.toObj(jihuo,int[][].class);
        this.shuxing = ExcelJsonUtils.toObj(shuxing,int[][].class);
        this.jczhanli = jczhanli;
        this.shengxing = ExcelJsonUtils.toObj(shengxing,int[][].class);
        this.sxzhanli = sxzhanli;
        this.shangxian = shangxian;
    }
}