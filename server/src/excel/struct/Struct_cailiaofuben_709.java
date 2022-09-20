package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_709_材料副本.xlsx
 */
public class Struct_cailiaofuben_709 {
    /**序号
	 * 类型*1000+序号
	 * 1.铜钱
	 * 2.武将
	 * 3.战甲
	 * 4.宝物
	 * 5.天书
	 * 6.宝石
	 * 7.升星
	 * 8：异宝
	 * 9：神剑
	 * 10：兵法*/
    private int ID;
    /**副本开启条件
	 * 
	 * 作者:
	 * [[1,x],[2,y],[3,z]]
	 * 1:达到关卡
	 * 2:转生
	 * 3:等级
	 * y=转生ID（对应转生表）
	 * */
    private int[][] startcondition;
    /**怪物配置
	 * [Z,X,Y]
	 * x怪物ID y数量 z为第波数 */
    private int[][] monster;
    /**BOSS配置
	 * [bossid，数量]*/
    private int[][] boss;
    /**增加额度*/
    private int[][] ADD;
    /**奖励*/
    private int[][] AWARD;
    /**地图ID
	 * 对应地图表ID*/
    private int scene;
    /**任务类型*/
    private int type;
    /**开服天数开启
	 * Windows 用户:
	 * 
	 * 0表示无限制
	 * 1-999表示开服第X天开启
	 *   比如：8 就是说在开服第8天时开启
	 * */
    private int day;
    /**
     * 序号
	 * 类型*1000+序号
	 * 1.铜钱
	 * 2.武将
	 * 3.战甲
	 * 4.宝物
	 * 5.天书
	 * 6.宝石
	 * 7.升星
	 * 8：异宝
	 * 9：神剑
	 * 10：兵法
     */
    public int getID() {
        return ID;
    }
    /**
     * 副本开启条件
	 * 
	 * 作者:
	 * [[1,x],[2,y],[3,z]]
	 * 1:达到关卡
	 * 2:转生
	 * 3:等级
	 * y=转生ID（对应转生表）
	 * 
     */
    public int[][] getStartcondition() {
        return startcondition;
    }
    /**
     * 怪物配置
	 * [Z,X,Y]
	 * x怪物ID y数量 z为第波数 
     */
    public int[][] getMonster() {
        return monster;
    }
    /**
     * BOSS配置
	 * [bossid，数量]
     */
    public int[][] getBoss() {
        return boss;
    }
    /**
     * 增加额度
     */
    public int[][] getADD() {
        return ADD;
    }
    /**
     * 奖励
     */
    public int[][] getAWARD() {
        return AWARD;
    }
    /**
     * 地图ID
	 * 对应地图表ID
     */
    public int getScene() {
        return scene;
    }
    /**
     * 任务类型
     */
    public int getType() {
        return type;
    }
    /**
     * 开服天数开启
	 * Windows 用户:
	 * 
	 * 0表示无限制
	 * 1-999表示开服第X天开启
	 *   比如：8 就是说在开服第8天时开启
	 * 
     */
    public int getDay() {
        return day;
    }
    public Struct_cailiaofuben_709(int ID,String startcondition,String monster,String boss,String ADD,String AWARD,int scene,int type,int day) {
        this.ID = ID;
        this.startcondition = ExcelJsonUtils.toObj(startcondition,int[][].class);
        this.monster = ExcelJsonUtils.toObj(monster,int[][].class);
        this.boss = ExcelJsonUtils.toObj(boss,int[][].class);
        this.ADD = ExcelJsonUtils.toObj(ADD,int[][].class);
        this.AWARD = ExcelJsonUtils.toObj(AWARD,int[][].class);
        this.scene = scene;
        this.type = type;
        this.day = day;
    }
}