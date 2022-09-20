package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_bmjs_262;
public class Config_bmjs_262 extends ConfigBase<Struct_bmjs_262> {
    private static Config_bmjs_262 ins = null;
    public static Config_bmjs_262 getIns(){
        if(ins==null){
            ins = new Config_bmjs_262();
        }
        return ins;
    }
    private Config_bmjs_262(){
        put(1,new Struct_bmjs_262(1,"[[1,441006,1],[1,400890,1],[1,412003,60]]",3000,2,"[[1,441006,1]]",1));
        put(2,new Struct_bmjs_262(2,"[[1,434003,1],[1,400890,1],[1,412011,70]]",10000,3,"[[1,434003,1]]",1));
        put(3,new Struct_bmjs_262(3,"[[1,440006,1],[1,400891,1],[1,412001,100]]",30000,4,"[[1,440006,1]]",1));
        put(4,new Struct_bmjs_262(4,"[[1,441008,1],[1,400891,1],[1,412003,100]]",50000,5,"[[1,441008,1]]",1));
        put(5,new Struct_bmjs_262(5,"[[1,430003,1],[1,400891,1],[1,412007,200]]",150000,6,"[[1,430003,1]]",1));
        put(6,new Struct_bmjs_262(6,"[[4,0,200000],[1,400892,1],[1,412011,250]]",300000,7,"[[4,0,200000]]",1));
        put(7,new Struct_bmjs_262(7,"[[1,431222,1],[1,400892,1],[1,412013,300]]",600000,8,"[[1,431222,1]]",1));
        put(8,new Struct_bmjs_262(8,"[[4,0,600000],[1,400892,2],[1,412009,300]]",1000000,0,"[[4,0,600000]]",1));
    }
    public void reset(){
        ins = null;
    }
}