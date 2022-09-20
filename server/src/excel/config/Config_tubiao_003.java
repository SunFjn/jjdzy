package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_tubiao_003;
public class Config_tubiao_003 extends ConfigBase<Struct_tubiao_003> {
    private static Config_tubiao_003 ins = null;
    public static Config_tubiao_003 getIns(){
        if(ins==null){
            ins = new Config_tubiao_003();
        }
        return ins;
    }
    private Config_tubiao_003(){
        put(1001,new Struct_tubiao_003(1001,1,2,1,0));
        put(1101,new Struct_tubiao_003(1101,1,3,1,0));
        put(1201,new Struct_tubiao_003(1201,1,4,1,0));
        put(1301,new Struct_tubiao_003(1301,1,5,1,0));
        put(1401,new Struct_tubiao_003(1401,1,6,1,0));
        put(3101,new Struct_tubiao_003(3101,1,1,1,0));
        put(4801,new Struct_tubiao_003(4801,2,1,1,0));
        put(5601,new Struct_tubiao_003(5601,2,2,1,0));
        put(4501,new Struct_tubiao_003(4501,2,3,1,0));
        put(4601,new Struct_tubiao_003(4601,2,4,1,0));
        put(4619,new Struct_tubiao_003(4619,2,5,1,0));
        put(5002,new Struct_tubiao_003(5002,2,6,1,0));
        put(5101,new Struct_tubiao_003(5101,2,8,1,0));
        put(6101,new Struct_tubiao_003(6101,2,13,1,0));
        put(6401,new Struct_tubiao_003(6401,2,12,1,0));
        put(6801,new Struct_tubiao_003(6801,2,14,1,0));
        put(4901,new Struct_tubiao_003(4901,2,15,1,1));
        put(4401,new Struct_tubiao_003(4401,2,16,1,1));
        put(7300,new Struct_tubiao_003(7300,2,11,1,0));
        put(7500,new Struct_tubiao_003(7500,2,10,1,0));
        put(7600,new Struct_tubiao_003(7600,2,9,1,0));
        put(7710,new Struct_tubiao_003(7710,2,17,1,0));
        put(7750,new Struct_tubiao_003(7750,2,18,1,0));
        put(7760,new Struct_tubiao_003(7760,2,19,1,0));
        put(4103,new Struct_tubiao_003(4103,3,5,1,0));
        put(5004,new Struct_tubiao_003(5004,3,4,1,1));
        put(5602,new Struct_tubiao_003(5602,3,1,1,1));
        put(4102,new Struct_tubiao_003(4102,3,6,1,0));
        put(4526,new Struct_tubiao_003(4526,3,2,1,1));
        put(5009,new Struct_tubiao_003(5009,3,2,1,1));
        put(5010,new Struct_tubiao_003(5010,3,3,1,1));
        put(6910,new Struct_tubiao_003(6910,3,7,1,0));
        put(4201,new Struct_tubiao_003(4201,6,3,1,0));
        put(5005,new Struct_tubiao_003(5005,6,4,1,0));
        put(5201,new Struct_tubiao_003(5201,6,6,1,0));
        put(5006,new Struct_tubiao_003(5006,6,1,1,1));
        put(4605,new Struct_tubiao_003(4605,6,2,1,0));
        put(5901,new Struct_tubiao_003(5901,6,5,1,0));
        put(5701,new Struct_tubiao_003(5701,6,7,1,0));
        put(6601,new Struct_tubiao_003(6601,6,8,1,1));
        put(7101,new Struct_tubiao_003(7101,6,9,1,0));
        put(7200,new Struct_tubiao_003(7200,6,10,1,0));
        put(4705,new Struct_tubiao_003(4705,6,11,1,0));
        put(8001,new Struct_tubiao_003(8001,6,14,1,0));
        put(8002,new Struct_tubiao_003(8002,6,15,1,0));
        put(8003,new Struct_tubiao_003(8003,6,14,1,0));
        put(8004,new Struct_tubiao_003(8004,6,15,1,0));
        put(2401,new Struct_tubiao_003(2401,7,1,1,0));
        put(2901,new Struct_tubiao_003(2901,7,2,1,0));
        put(6001,new Struct_tubiao_003(6001,7,3,1,0));
        put(2001,new Struct_tubiao_003(2001,7,4,1,0));
        put(6301,new Struct_tubiao_003(6301,7,5,1,0));
        put(7120,new Struct_tubiao_003(7120,7,6,1,0));
        put(7700,new Struct_tubiao_003(7700,7,7,1,0));
        put(7811,new Struct_tubiao_003(7811,7,8,1,0));
        put(5008,new Struct_tubiao_003(5008,8,1,1,0));
        put(3201,new Struct_tubiao_003(3201,8,2,1,0));
        put(3801,new Struct_tubiao_003(3801,8,3,1,0));
        put(3401,new Struct_tubiao_003(3401,8,4,1,0));
        put(7900,new Struct_tubiao_003(7900,8,5,1,0));
        put(7821,new Struct_tubiao_003(7821,8,7,1,0));
        put(7770,new Struct_tubiao_003(7770,9,1,1,0));
        put(4702,new Struct_tubiao_003(4702,10,1,1,0));
        put(8201,new Struct_tubiao_003(8201,2,1,1,1));
        put(8101,new Struct_tubiao_003(8101,2,1,1,1));
    }
    public void reset(){
        ins = null;
    }
}