package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * C_702_称号.xlsx
 */
public class Struct_chenghao_702 {
    /**序号*/
    private int ID;
    /**名字*/
    private String name;
    /**类型
	 * jingyu:
	 * 0是永久称号
	 * 
	 * 具体数字代表限时时间，单位为秒
	 * */
    private int type;
    /**分类
	 * 1排行
	 * 2成就
	 * 3特殊
	 * 4势力*/
    private int belong;
    /**激活条件
	 * jingyu:
	 * [[类型，具体分类，目标]]
	 * 目标：具体的道具id或名次、等级等等
	 * 
	 * 类型：
	 * 0等级，
	 * 1战斗力，
	 * 2通关，
	 * 3消费元宝，
	 * 4击杀BOSS，
	 * 7势力，
	 * 8排行榜
	 * （
	 * 具体分类：
	 * 1=等级
	 * 2=战力
	 * 3=铜雀台
	 * 4=战神
	 * 5=装备
	 * 6=战甲
	 * 7=武将
	 * 8=图鉴
	 * 9=天书
	 * 10=神装
	 * 11=神剑
	 * 12=兵法
	 * 13=宝物
	 * ）
	 * 9.道具激活
	 * 10.王位之争名次
	 * (
	 * 具体分类：
	 * 1=魏国
	 * 2=蜀国
	 * 3=吴国
	 * ）
	 * 11.任命
	 * 12.累计登录
	 * 13.三国无双冠军
	 * 14.乱世枭雄
	 * 15.玲珑阁排名第一
	 * （
	 * 具体分类：
	 * 1=第一天
	 * 2=第二天
	 * ……
	 * ）*/
    private int[][] condtion;
    /**属性*/
    private int[][] attr;
    /**战斗力*/
    private int fight;
    /**邮件ID
	 * jingyu:
	 * 0代表不发送邮件
	 * [[x,y]]
	 * x=邮件ID
	 * y=道具附件ID*/
    private int[][] email;
    /**聊天是否显示
	 * jingyu:
	 * 0不显示
	 * 1 显示*/
    private int xianshi;
    /**
     * 序号
     */
    public int getID() {
        return ID;
    }
    /**
     * 名字
     */
    public String getName() {
        return name;
    }
    /**
     * 类型
	 * jingyu:
	 * 0是永久称号
	 * 
	 * 具体数字代表限时时间，单位为秒
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 分类
	 * 1排行
	 * 2成就
	 * 3特殊
	 * 4势力
     */
    public int getBelong() {
        return belong;
    }
    /**
     * 激活条件
	 * jingyu:
	 * [[类型，具体分类，目标]]
	 * 目标：具体的道具id或名次、等级等等
	 * 
	 * 类型：
	 * 0等级，
	 * 1战斗力，
	 * 2通关，
	 * 3消费元宝，
	 * 4击杀BOSS，
	 * 7势力，
	 * 8排行榜
	 * （
	 * 具体分类：
	 * 1=等级
	 * 2=战力
	 * 3=铜雀台
	 * 4=战神
	 * 5=装备
	 * 6=战甲
	 * 7=武将
	 * 8=图鉴
	 * 9=天书
	 * 10=神装
	 * 11=神剑
	 * 12=兵法
	 * 13=宝物
	 * ）
	 * 9.道具激活
	 * 10.王位之争名次
	 * (
	 * 具体分类：
	 * 1=魏国
	 * 2=蜀国
	 * 3=吴国
	 * ）
	 * 11.任命
	 * 12.累计登录
	 * 13.三国无双冠军
	 * 14.乱世枭雄
	 * 15.玲珑阁排名第一
	 * （
	 * 具体分类：
	 * 1=第一天
	 * 2=第二天
	 * ……
	 * ）
     */
    public int[][] getCondtion() {
        return condtion;
    }
    /**
     * 属性
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 战斗力
     */
    public int getFight() {
        return fight;
    }
    /**
     * 邮件ID
	 * jingyu:
	 * 0代表不发送邮件
	 * [[x,y]]
	 * x=邮件ID
	 * y=道具附件ID
     */
    public int[][] getEmail() {
        return email;
    }
    /**
     * 聊天是否显示
	 * jingyu:
	 * 0不显示
	 * 1 显示
     */
    public int getXianshi() {
        return xianshi;
    }
    public Struct_chenghao_702(int ID,String name,int type,int belong,String condtion,String attr,int fight,String email,int xianshi) {
        this.ID = ID;
        this.name = name;
        this.type = type;
        this.belong = belong;
        this.condtion = ExcelJsonUtils.toObj(condtion,int[][].class);
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.fight = fight;
        this.email = ExcelJsonUtils.toObj(email,int[][].class);
        this.xianshi = xianshi;
    }
}