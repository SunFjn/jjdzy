package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xxdrlcyb_781;
public class Config_xxdrlcyb_781 extends ConfigBase<Struct_xxdrlcyb_781> {
    private static Config_xxdrlcyb_781 ins = null;
    public static Config_xxdrlcyb_781 getIns(){
        if(ins==null){
            ins = new Config_xxdrlcyb_781();
        }
        return ins;
    }
    private Config_xxdrlcyb_781(){
        put(1,new Struct_xxdrlcyb_781(1,100,499,100,12001));
        put(2,new Struct_xxdrlcyb_781(2,500,999,120,12002));
        put(3,new Struct_xxdrlcyb_781(3,1000,1999,150,12003));
        put(4,new Struct_xxdrlcyb_781(4,2000,4999,180,12004));
        put(5,new Struct_xxdrlcyb_781(5,5000,9999,200,12005));
        put(6,new Struct_xxdrlcyb_781(6,10000,19999,250,12006));
        put(7,new Struct_xxdrlcyb_781(7,20000,999999,300,12007));
    }
    public void reset(){
        ins = null;
    }
}