package excel.struct;
/**
 * D_201_地图.xlsx
 */
public class Struct_map_200 {
    /**地图ID
	 * 备注:
	 * 3XXXXX：场景id
	 *  31XXXX：主界面关卡场景
	 *  32XXXX：关卡BOSS场景
	 *  330XXX：个人BOSS
	 *  331XXX：全民BOSS
	 *  34XXXX：PVP
	 *  350XXX：铜雀台
	 *  351XXX：一骑当千
	 *  360XXX：跨服BOSS
	 *  361XXX：魔神吕布
	 *  362XXX：过关斩将*/
    private int id;
    /**地图资源ID(source)*/
    private int s;
    /**后端地图类型
	 * jingyu:
	 * 0.不是后端跳转地图
	 * 1.是后端场景地图
	 * 5.问鼎天下地图
	 * 6.BOSS战场地图（本服）
	 * 7.BOSS战场地图（跨服）
	 * 8.三国一统地图类型
	 * 10.三英战吕布地图
	 * 11.宴会地图
	 * 12.家园地图*/
    private int severtype;
    /**
     * 地图ID
	 * 备注:
	 * 3XXXXX：场景id
	 *  31XXXX：主界面关卡场景
	 *  32XXXX：关卡BOSS场景
	 *  330XXX：个人BOSS
	 *  331XXX：全民BOSS
	 *  34XXXX：PVP
	 *  350XXX：铜雀台
	 *  351XXX：一骑当千
	 *  360XXX：跨服BOSS
	 *  361XXX：魔神吕布
	 *  362XXX：过关斩将
     */
    public int getId() {
        return id;
    }
    /**
     * 地图资源ID(source)
     */
    public int getS() {
        return s;
    }
    /**
     * 后端地图类型
	 * jingyu:
	 * 0.不是后端跳转地图
	 * 1.是后端场景地图
	 * 5.问鼎天下地图
	 * 6.BOSS战场地图（本服）
	 * 7.BOSS战场地图（跨服）
	 * 8.三国一统地图类型
	 * 10.三英战吕布地图
	 * 11.宴会地图
	 * 12.家园地图
     */
    public int getSevertype() {
        return severtype;
    }
    public Struct_map_200(int id,int s,int severtype) {
        this.id = id;
        this.s = s;
        this.severtype = severtype;
    }
}