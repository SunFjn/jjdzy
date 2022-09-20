class AttributeUtil {
	public constructor() {
	}

	public static initEnemyAttr(role: SceneCharRole, cfg) {

		role.att = cfg.att;
		role.def = cfg.def;
		role.maxhp = role.curhp = Number(cfg.hp);
		role.ignoreBati = cfg.bati;
		for (let key in Enum_Attr.roleAttributes) {
			if (parseInt(key) != 102) {
				if (!role[Enum_Attr.roleAttributes[key]]) role[Enum_Attr.roleAttributes[key]] = 0;
			}
		}
		role.curShield = role.maxShield = cfg.hp * role.hpShield;
		role.pd = 0;//僵直抵抗强度
		role.breakMask = 0;//受击动作转换参数
		role.setPlayerName(cfg.name);
		role.str = cfg.power ? cfg.power : 1;//战力
		if (cfg.weapon) {
			role.setWeapon(cfg.mod);
		}
		role.setBody(cfg.mod);

		AttributeUtil.updateNamey(role);
	}

	public static updateNamey(role: SceneCharRole) {
		var cfg = Config.mod_200[role.getBody()];
		if (cfg && cfg.h) {
			role.setNameY(-cfg.h);
		}
	}

	public static initVoAttr(role: Vo_Player, cfg): void {
	}
}