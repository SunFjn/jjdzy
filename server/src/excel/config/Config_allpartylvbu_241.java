package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_allpartylvbu_241;
public class Config_allpartylvbu_241 extends ConfigBase<Struct_allpartylvbu_241> {
    private static Config_allpartylvbu_241 ins = null;
    public static Config_allpartylvbu_241 getIns(){
        if(ins==null){
            ins = new Config_allpartylvbu_241();
        }
        return ins;
    }
    private Config_allpartylvbu_241(){
        put(1,new Struct_allpartylvbu_241(1,1,"[[4,0,1000],[1,410003,1]]",1805,31001));
        put(2,new Struct_allpartylvbu_241(2,3,"[[4,0,1000],[1,410003,1]]",1805,31002));
        put(3,new Struct_allpartylvbu_241(3,5,"[[4,0,2000],[1,410003,1]]",1805,31003));
        put(4,new Struct_allpartylvbu_241(4,7,"[[4,0,2000],[1,410003,1]]",1805,31004));
        put(5,new Struct_allpartylvbu_241(5,9,"[[1,410006,1],[4,0,2500],[1,410003,2]]",1805,31005));
        put(6,new Struct_allpartylvbu_241(6,11,"[[4,0,3000],[1,410003,2]]",1805,31006));
        put(7,new Struct_allpartylvbu_241(7,13,"[[4,0,3500],[1,410003,3]]",1805,31007));
        put(8,new Struct_allpartylvbu_241(8,15,"[[1,410006,2],[4,0,4000],[1,410003,4]]",1805,31008));
        put(9,new Struct_allpartylvbu_241(9,18,"[[4,0,5000],[1,410003,4]]",1805,31009));
        put(10,new Struct_allpartylvbu_241(10,21,"[[1,410006,3],[4,0,9500],[1,410003,10]]",1805,31010));
    }
    public void reset(){
        ins = null;
    }
}