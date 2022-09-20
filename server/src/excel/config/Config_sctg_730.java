package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sctg_730;
public class Config_sctg_730 extends ConfigBase<Struct_sctg_730> {
    private static Config_sctg_730 ins = null;
    public static Config_sctg_730 getIns(){
        if(ins==null){
            ins = new Config_sctg_730();
        }
        return ins;
    }
    private Config_sctg_730(){
        put(1,new Struct_sctg_730(1,1,10,0,"[[1,410001,100]]",13001));
        put(2,new Struct_sctg_730(2,1,10,1,"[[1,410001,200]]",13002));
        put(3,new Struct_sctg_730(3,1,10,12,"[[1,410001,400]]",13003));
        put(4,new Struct_sctg_730(4,1,20,0,"[[1,410002,5]]",13004));
        put(5,new Struct_sctg_730(5,1,20,1,"[[1,410002,10]]",13005));
        put(6,new Struct_sctg_730(6,1,20,12,"[[1,410002,20]]",13006));
        put(7,new Struct_sctg_730(7,1,60,0,"[[1,411001,5]]",13007));
        put(8,new Struct_sctg_730(8,1,60,1,"[[1,411001,10]]",13008));
        put(9,new Struct_sctg_730(9,1,60,12,"[[1,411001,20]]",13009));
        put(10,new Struct_sctg_730(10,1,100,0,"[[1,412001,1]]",13010));
        put(11,new Struct_sctg_730(11,1,100,1,"[[1,412001,2]]",13011));
        put(12,new Struct_sctg_730(12,1,100,12,"[[1,412001,4]]",13012));
        put(13,new Struct_sctg_730(13,1,200,0,"[[1,410023,2]]",13013));
        put(14,new Struct_sctg_730(14,1,200,1,"[[1,410023,4]]",13014));
        put(15,new Struct_sctg_730(15,1,200,12,"[[1,410023,6]]",13015));
        put(16,new Struct_sctg_730(16,2,10,0,"[[1,410001,100]]",13016));
        put(17,new Struct_sctg_730(17,2,10,1,"[[1,410001,200]]",13017));
        put(18,new Struct_sctg_730(18,2,10,12,"[[1,410001,400]]",13018));
        put(19,new Struct_sctg_730(19,2,20,0,"[[1,410002,5]]",13019));
        put(20,new Struct_sctg_730(20,2,20,1,"[[1,410002,10]]",13020));
        put(21,new Struct_sctg_730(21,2,20,12,"[[1,410002,20]]",13021));
        put(22,new Struct_sctg_730(22,2,60,0,"[[1,411003,5]]",13022));
        put(23,new Struct_sctg_730(23,2,60,1,"[[1,411003,10]]",13023));
        put(24,new Struct_sctg_730(24,2,60,12,"[[1,411003,20]]",13024));
        put(25,new Struct_sctg_730(25,2,100,0,"[[1,412005,1]]",13025));
        put(26,new Struct_sctg_730(26,2,100,1,"[[1,412005,2]]",13026));
        put(27,new Struct_sctg_730(27,2,100,12,"[[1,412005,4]]",13027));
        put(28,new Struct_sctg_730(28,2,200,0,"[[1,410023,2]]",13028));
        put(29,new Struct_sctg_730(29,2,200,1,"[[1,410023,4]]",13029));
        put(30,new Struct_sctg_730(30,2,200,12,"[[1,410023,6]]",13030));
        put(31,new Struct_sctg_730(31,3,10,0,"[[1,410001,100]]",13031));
        put(32,new Struct_sctg_730(32,3,10,1,"[[1,410001,200]]",13032));
        put(33,new Struct_sctg_730(33,3,10,12,"[[1,410001,400]]",13033));
        put(34,new Struct_sctg_730(34,3,20,0,"[[1,410002,5]]",13034));
        put(35,new Struct_sctg_730(35,3,20,1,"[[1,410002,10]]",13035));
        put(36,new Struct_sctg_730(36,3,20,12,"[[1,410002,20]]",13036));
        put(37,new Struct_sctg_730(37,3,60,0,"[[1,411008,5]]",13037));
        put(38,new Struct_sctg_730(38,3,60,1,"[[1,411008,10]]",13038));
        put(39,new Struct_sctg_730(39,3,60,12,"[[1,411008,20]]",13039));
        put(40,new Struct_sctg_730(40,3,100,0,"[[1,412013,1]]",13040));
        put(41,new Struct_sctg_730(41,3,100,1,"[[1,412013,2]]",13041));
        put(42,new Struct_sctg_730(42,3,100,12,"[[1,412013,4]]",13042));
        put(43,new Struct_sctg_730(43,3,200,0,"[[1,410023,2]]",13043));
        put(44,new Struct_sctg_730(44,3,200,1,"[[1,410023,4]]",13044));
        put(45,new Struct_sctg_730(45,3,200,12,"[[1,410023,6]]",13045));
        put(46,new Struct_sctg_730(46,4,10,0,"[[1,410001,100]]",13046));
        put(47,new Struct_sctg_730(47,4,10,1,"[[1,410001,200]]",13047));
        put(48,new Struct_sctg_730(48,4,10,12,"[[1,410001,400]]",13048));
        put(49,new Struct_sctg_730(49,4,20,0,"[[1,410002,5]]",13049));
        put(50,new Struct_sctg_730(50,4,20,1,"[[1,410002,10]]",13050));
        put(51,new Struct_sctg_730(51,4,20,12,"[[1,410002,20]]",13051));
        put(52,new Struct_sctg_730(52,4,60,0,"[[1,411007,5]]",13052));
        put(53,new Struct_sctg_730(53,4,60,1,"[[1,411007,10]]",13053));
        put(54,new Struct_sctg_730(54,4,60,12,"[[1,411007,20]]",13054));
        put(55,new Struct_sctg_730(55,4,100,0,"[[1,412009,1]]",13055));
        put(56,new Struct_sctg_730(56,4,100,1,"[[1,412009,2]]",13056));
        put(57,new Struct_sctg_730(57,4,100,12,"[[1,412009,4]]",13057));
        put(58,new Struct_sctg_730(58,4,200,0,"[[1,410023,2]]",13058));
        put(59,new Struct_sctg_730(59,4,200,1,"[[1,410023,4]]",13059));
        put(60,new Struct_sctg_730(60,4,200,12,"[[1,410023,6]]",13060));
        put(61,new Struct_sctg_730(61,5,10,0,"[[1,410001,100]]",13061));
        put(62,new Struct_sctg_730(62,5,10,1,"[[1,410001,200]]",13062));
        put(63,new Struct_sctg_730(63,5,10,12,"[[1,410001,400]]",13063));
        put(64,new Struct_sctg_730(64,5,20,0,"[[1,410002,5]]",13064));
        put(65,new Struct_sctg_730(65,5,20,1,"[[1,410002,10]]",13065));
        put(66,new Struct_sctg_730(66,5,20,12,"[[1,410002,20]]",13066));
        put(67,new Struct_sctg_730(67,5,60,0,"[[1,411005,5]]",13067));
        put(68,new Struct_sctg_730(68,5,60,1,"[[1,411005,10]]",13068));
        put(69,new Struct_sctg_730(69,5,60,12,"[[1,411005,20]]",13069));
        put(70,new Struct_sctg_730(70,5,100,0,"[[1,412011,1]]",13070));
        put(71,new Struct_sctg_730(71,5,100,1,"[[1,412011,2]]",13071));
        put(72,new Struct_sctg_730(72,5,100,12,"[[1,412011,4]]",13072));
        put(73,new Struct_sctg_730(73,5,200,0,"[[1,410023,2]]",13073));
        put(74,new Struct_sctg_730(74,5,200,1,"[[1,410023,4]]",13074));
        put(75,new Struct_sctg_730(75,5,200,12,"[[1,410023,6]]",13075));
        put(76,new Struct_sctg_730(76,6,10,0,"[[1,410001,100]]",13076));
        put(77,new Struct_sctg_730(77,6,10,1,"[[1,410001,200]]",13077));
        put(78,new Struct_sctg_730(78,6,10,12,"[[1,410001,400]]",13078));
        put(79,new Struct_sctg_730(79,6,20,0,"[[1,410002,5]]",13079));
        put(80,new Struct_sctg_730(80,6,20,1,"[[1,410002,10]]",13080));
        put(81,new Struct_sctg_730(81,6,20,12,"[[1,410002,20]]",13081));
        put(82,new Struct_sctg_730(82,6,60,0,"[[1,411002,5]]",13082));
        put(83,new Struct_sctg_730(83,6,60,1,"[[1,411002,10]]",13083));
        put(84,new Struct_sctg_730(84,6,60,12,"[[1,411002,20]]",13084));
        put(85,new Struct_sctg_730(85,6,100,0,"[[1,412003,1]]",13085));
        put(86,new Struct_sctg_730(86,6,100,1,"[[1,412003,2]]",13086));
        put(87,new Struct_sctg_730(87,6,100,12,"[[1,412003,4]]",13087));
        put(88,new Struct_sctg_730(88,6,200,0,"[[1,410023,2]]",13088));
        put(89,new Struct_sctg_730(89,6,200,1,"[[1,410023,4]]",13089));
        put(90,new Struct_sctg_730(90,6,200,12,"[[1,410023,6]]",13090));
        put(91,new Struct_sctg_730(91,7,10,0,"[[1,410001,100]]",13091));
        put(92,new Struct_sctg_730(92,7,10,1,"[[1,410001,200]]",13092));
        put(93,new Struct_sctg_730(93,7,10,12,"[[1,410001,400]]",13093));
        put(94,new Struct_sctg_730(94,7,20,0,"[[1,410002,5]]",13094));
        put(95,new Struct_sctg_730(95,7,20,1,"[[1,410002,10]]",13095));
        put(96,new Struct_sctg_730(96,7,20,12,"[[1,410002,20]]",13096));
        put(97,new Struct_sctg_730(97,7,60,0,"[[1,410004,5]]",13097));
        put(98,new Struct_sctg_730(98,7,60,1,"[[1,410004,10]]",13098));
        put(99,new Struct_sctg_730(99,7,60,12,"[[1,410004,20]]",13099));
        put(100,new Struct_sctg_730(100,7,100,0,"[[1,410010,2]]",13100));
        put(101,new Struct_sctg_730(101,7,100,1,"[[1,410010,4]]",13101));
        put(102,new Struct_sctg_730(102,7,100,12,"[[1,410010,6]]",13102));
        put(103,new Struct_sctg_730(103,7,200,0,"[[1,410023,2]]",13103));
        put(104,new Struct_sctg_730(104,7,200,1,"[[1,410023,4]]",13104));
        put(105,new Struct_sctg_730(105,7,200,12,"[[1,410023,6]]",13105));
    }
    public void reset(){
        ins = null;
    }
}