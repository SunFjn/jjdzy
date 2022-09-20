package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_204_装备.xlsx
 */
public class Struct_zhuangbei_204 {
    /**装备id
	 * 装备为91开头id
	 * 神装位92开头id
	 * 将印为93开头id
	 * 
	 * 个位数id用作区分装备部位
	 * 0：武器
	 * 1：衣服
	 * 2：护腕
	 * 3：裤子
	 * 4：鞋子
	 * 5：帽子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 十位数id用作区分装备品质
	 * 123456：白绿蓝紫橙红
	 * 
	 * 百位数以上用作区分装备等级
	 * 000:0级
	 * 100：10级
	 * 200:20级*/
    private int id;
    /**名字*/
    private String n;
    /**阶数（7系统实际等级）*/
    private int jie;
    /**装备要求
	 * 
	 * [[A,B]]
	 * A=转数
	 * B=等级*/
    private int[][] lv;
    /**品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红
	 * 7、金*/
    private int q;
    /**装备部位
	 * 0：武器
	 * 1：衣服
	 * 2：护腕
	 * 3：裤子
	 * 4：鞋子
	 * 5：帽子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 10：神装武器
	 * 11：神装衣服
	 * 12：神装护腕
	 * 13：神装裤子
	 * 14：神装鞋子
	 * 15：神装帽子
	 * 16：神装项链
	 * 17：神装手镯
	 * 18：神装戒指
	 * 19：神装饰品
	 * 
	 * 21-29：将印
	 * 
	 * 30-33：转生装备（人魂，地魂，天魂，神魂）
	 * 
	 * 40-43：武将（头冠，战袍，战靴，护臂）
	 * 
	 * 50-53：战甲（肩甲，胸甲，腰甲，腿甲）
	 * 
	 * 60-63：神剑（剑柄，剑刃，剑鞘，剑穗）
	 * 
	 * 70-73：异宝（玄玉，碧玉，血玉，白玉）
	 * 
	 * 80-83：兵法（毛笔，玄墨，宣纸，砚台）
	 * 
	 * 90-93：宝物（金莲，冰魄，寒铁，炎石）
	 * 
	 * 100-103：天书（火印，水印，风印，土印）*/
    private int part;
    /**装备属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值*/
    private int[][] attr;
    /**熔炼奖励
	 * 
	 * 1：道具
	 * 2：装备
	 * 3：铜钱
	 * 4：元宝
	 * 5：等级
	 * 6：经验
	 * 8：熔炼值*/
    private int[][] reward;
    /**战力*/
    private int zhanli;
    /**
     * 装备id
	 * 装备为91开头id
	 * 神装位92开头id
	 * 将印为93开头id
	 * 
	 * 个位数id用作区分装备部位
	 * 0：武器
	 * 1：衣服
	 * 2：护腕
	 * 3：裤子
	 * 4：鞋子
	 * 5：帽子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 十位数id用作区分装备品质
	 * 123456：白绿蓝紫橙红
	 * 
	 * 百位数以上用作区分装备等级
	 * 000:0级
	 * 100：10级
	 * 200:20级
     */
    public int getId() {
        return id;
    }
    /**
     * 名字
     */
    public String getN() {
        return n;
    }
    /**
     * 阶数（7系统实际等级）
     */
    public int getJie() {
        return jie;
    }
    /**
     * 装备要求
	 * 
	 * [[A,B]]
	 * A=转数
	 * B=等级
     */
    public int[][] getLv() {
        return lv;
    }
    /**
     * 品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红
	 * 7、金
     */
    public int getQ() {
        return q;
    }
    /**
     * 装备部位
	 * 0：武器
	 * 1：衣服
	 * 2：护腕
	 * 3：裤子
	 * 4：鞋子
	 * 5：帽子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 10：神装武器
	 * 11：神装衣服
	 * 12：神装护腕
	 * 13：神装裤子
	 * 14：神装鞋子
	 * 15：神装帽子
	 * 16：神装项链
	 * 17：神装手镯
	 * 18：神装戒指
	 * 19：神装饰品
	 * 
	 * 21-29：将印
	 * 
	 * 30-33：转生装备（人魂，地魂，天魂，神魂）
	 * 
	 * 40-43：武将（头冠，战袍，战靴，护臂）
	 * 
	 * 50-53：战甲（肩甲，胸甲，腰甲，腿甲）
	 * 
	 * 60-63：神剑（剑柄，剑刃，剑鞘，剑穗）
	 * 
	 * 70-73：异宝（玄玉，碧玉，血玉，白玉）
	 * 
	 * 80-83：兵法（毛笔，玄墨，宣纸，砚台）
	 * 
	 * 90-93：宝物（金莲，冰魄，寒铁，炎石）
	 * 
	 * 100-103：天书（火印，水印，风印，土印）
     */
    public int getPart() {
        return part;
    }
    /**
     * 装备属性
	 * [[X1,X2]]
	 * x1:属性类型
	 * x2:属性值
     */
    public int[][] getAttr() {
        return attr;
    }
    /**
     * 熔炼奖励
	 * 
	 * 1：道具
	 * 2：装备
	 * 3：铜钱
	 * 4：元宝
	 * 5：等级
	 * 6：经验
	 * 8：熔炼值
     */
    public int[][] getReward() {
        return reward;
    }
    /**
     * 战力
     */
    public int getZhanli() {
        return zhanli;
    }
    public Struct_zhuangbei_204(int id,String n,int jie,String lv,int q,int part,String attr,String reward,int zhanli) {
        this.id = id;
        this.n = n;
        this.jie = jie;
        this.lv = ExcelJsonUtils.toObj(lv,int[][].class);
        this.q = q;
        this.part = part;
        this.attr = ExcelJsonUtils.toObj(attr,int[][].class);
        this.reward = ExcelJsonUtils.toObj(reward,int[][].class);
        this.zhanli = zhanli;
    }
}