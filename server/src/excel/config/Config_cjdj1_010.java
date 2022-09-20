package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdj1_010;
public class Config_cjdj1_010 extends ConfigBase<Struct_cjdj1_010> {
    private static Config_cjdj1_010 ins = null;
    public static Config_cjdj1_010 getIns(){
        if(ins==null){
            ins = new Config_cjdj1_010();
        }
        return ins;
    }
    private Config_cjdj1_010(){
        put(1,new Struct_cjdj1_010(1,1,1,30,"[[1,400176,20]]",3001));
        put(2,new Struct_cjdj1_010(2,1,2,100,"[[1,410403,10]]",3002));
        put(3,new Struct_cjdj1_010(3,1,3,188,"[[1,440002,1]]",3003));
        put(4,new Struct_cjdj1_010(4,1,4,388,"[[1,402024,5]]",3004));
        put(5,new Struct_cjdj1_010(5,1,5,588,"[[1,440006,1]]",3005));
        put(6,new Struct_cjdj1_010(6,1,6,988,"[[1,401009,1]]",3006));
        put(7,new Struct_cjdj1_010(7,1,7,1688,"[[1,440007,1]]",3007));
        put(8,new Struct_cjdj1_010(8,1,8,2688,"[[1,401000,1]]",3008));
        put(9,new Struct_cjdj1_010(9,2,1,30,"[[1,400176,20]]",3009));
        put(10,new Struct_cjdj1_010(10,2,2,100,"[[1,410403,10]]",3010));
        put(11,new Struct_cjdj1_010(11,2,3,188,"[[1,440008,1]]",3011));
        put(12,new Struct_cjdj1_010(12,2,4,388,"[[1,402024,5]]",3012));
        put(13,new Struct_cjdj1_010(13,2,5,588,"[[1,440004,1]]",3013));
        put(14,new Struct_cjdj1_010(14,2,6,988,"[[1,401009,1]]",3014));
        put(15,new Struct_cjdj1_010(15,2,7,1688,"[[1,440010,1]]",3015));
        put(16,new Struct_cjdj1_010(16,2,8,2688,"[[1,401000,1]]",3016));
        put(31,new Struct_cjdj1_010(31,3,1,30,"[[1,400176,20]]",3017));
        put(32,new Struct_cjdj1_010(32,3,2,100,"[[1,410403,10]]",3018));
        put(33,new Struct_cjdj1_010(33,3,3,188,"[[1,440012,1]]",3019));
        put(34,new Struct_cjdj1_010(34,3,4,388,"[[1,402024,5]]",3020));
        put(35,new Struct_cjdj1_010(35,3,5,588,"[[1,440009,1]]",3021));
        put(36,new Struct_cjdj1_010(36,3,6,988,"[[1,401009,1]]",3022));
        put(37,new Struct_cjdj1_010(37,3,7,1688,"[[1,440014,1]]",3023));
        put(38,new Struct_cjdj1_010(38,3,8,2688,"[[1,401000,1]]",3024));
        put(39,new Struct_cjdj1_010(39,4,1,30,"[[1,400176,20]]",3025));
        put(40,new Struct_cjdj1_010(40,4,2,100,"[[1,410403,10]]",3026));
        put(41,new Struct_cjdj1_010(41,4,3,188,"[[1,440002,1]]",3027));
        put(42,new Struct_cjdj1_010(42,4,4,388,"[[1,402024,5]]",3028));
        put(43,new Struct_cjdj1_010(43,4,5,588,"[[1,440006,1]]",3029));
        put(44,new Struct_cjdj1_010(44,4,6,988,"[[1,401009,1]]",3030));
        put(45,new Struct_cjdj1_010(45,4,7,1688,"[[1,440007,1]]",3031));
        put(46,new Struct_cjdj1_010(46,4,8,2688,"[[1,401000,1]]",3032));
        put(47,new Struct_cjdj1_010(47,5,1,30,"[[1,400176,20]]",3033));
        put(48,new Struct_cjdj1_010(48,5,2,100,"[[1,410403,10]]",3034));
        put(49,new Struct_cjdj1_010(49,5,3,188,"[[1,440008,1]]",3035));
        put(50,new Struct_cjdj1_010(50,5,4,388,"[[1,402024,5]]",3036));
        put(51,new Struct_cjdj1_010(51,5,5,588,"[[1,440004,1]]",3037));
        put(52,new Struct_cjdj1_010(52,5,6,988,"[[1,401009,1]]",3038));
        put(53,new Struct_cjdj1_010(53,5,7,1688,"[[1,440013,1]]",3039));
        put(54,new Struct_cjdj1_010(54,5,8,2688,"[[1,401000,1]]",3040));
    }
    public void reset(){
        ins = null;
    }
}