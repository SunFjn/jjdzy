package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgytjsgz_310;
public class Config_sgytjsgz_310 extends ConfigBase<Struct_sgytjsgz_310> {
    private static Config_sgytjsgz_310 ins = null;
    public static Config_sgytjsgz_310 getIns(){
        if(ins==null){
            ins = new Config_sgytjsgz_310();
        }
        return ins;
    }
    private Config_sgytjsgz_310(){
        put(1,new Struct_sgytjsgz_310(1,"魏王",34,100,100));
        put(2,new Struct_sgytjsgz_310(2,"魏相",37,60,60));
        put(3,new Struct_sgytjsgz_310(3,"魏国大将军",40,40,40));
        put(4,new Struct_sgytjsgz_310(4,"蜀王",35,100,100));
        put(5,new Struct_sgytjsgz_310(5,"蜀相",38,60,60));
        put(6,new Struct_sgytjsgz_310(6,"蜀国大将军",41,40,40));
        put(7,new Struct_sgytjsgz_310(7,"吴王",36,100,100));
        put(8,new Struct_sgytjsgz_310(8,"吴相",39,60,60));
        put(9,new Struct_sgytjsgz_310(9,"吴国大将军",42,40,40));
        put(10,new Struct_sgytjsgz_310(10,"御军统领",43,20,20));
        put(11,new Struct_sgytjsgz_310(11,"无官职",0,0,0));
    }
    public void reset(){
        ins = null;
    }
}