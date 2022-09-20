package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_xxzb_233;
public class Config_xxzb_233 extends ConfigBase<Struct_xxzb_233> {
    private static Config_xxzb_233 ins = null;
    public static Config_xxzb_233 getIns(){
        if(ins==null){
            ins = new Config_xxzb_233();
        }
        return ins;
    }
    private Config_xxzb_233(){
        put(11,new Struct_xxzb_233(11,"[[1,410081,50],[1,410018,3000],[10,0,1000],[1,460045,1]]"));
        put(12,new Struct_xxzb_233(12,"[[1,410081,40],[1,410018,2000],[10,0,1000]]"));
        put(13,new Struct_xxzb_233(13,"[[1,410081,30],[1,410018,2000],[10,0,800]]"));
        put(14,new Struct_xxzb_233(14,"[[1,410081,20],[1,410018,1500],[10,0,500]]"));
        put(15,new Struct_xxzb_233(15,"[[1,410081,10],[1,410018,1500],[10,0,200]]"));
        put(21,new Struct_xxzb_233(21,"[[1,410081,50],[1,410018,4000],[10,0,2000],[1,460045,1]]"));
        put(22,new Struct_xxzb_233(22,"[[1,410081,40],[1,410018,3000],[10,0,2000]]"));
        put(23,new Struct_xxzb_233(23,"[[1,410081,30],[1,410018,3000],[10,0,1500]]"));
        put(24,new Struct_xxzb_233(24,"[[1,410081,20],[1,410018,2000],[10,0,1000]]"));
        put(25,new Struct_xxzb_233(25,"[[1,410081,10],[1,410018,2000],[10,0,500]]"));
        put(31,new Struct_xxzb_233(31,"[[1,410081,50],[1,410018,5000],[10,0,3000],[1,460045,1]]"));
        put(32,new Struct_xxzb_233(32,"[[1,410081,40],[1,410018,4000],[10,0,3000]]"));
        put(33,new Struct_xxzb_233(33,"[[1,410081,30],[1,410018,4000],[10,0,2000]]"));
        put(34,new Struct_xxzb_233(34,"[[1,410081,20],[1,410018,2500],[10,0,1500]]"));
        put(35,new Struct_xxzb_233(35,"[[1,410081,10],[1,410018,2500],[10,0,1000]]"));
        put(41,new Struct_xxzb_233(41,"[[1,410081,50],[1,410018,6000],[10,0,4000],[1,460045,1]]"));
        put(42,new Struct_xxzb_233(42,"[[1,410081,40],[1,410018,4500],[10,0,4000]]"));
        put(43,new Struct_xxzb_233(43,"[[1,410081,30],[1,410018,4500],[10,0,3000]]"));
        put(44,new Struct_xxzb_233(44,"[[1,410081,20],[1,410018,3000],[10,0,2000]]"));
        put(45,new Struct_xxzb_233(45,"[[1,410081,10],[1,410018,3000],[10,0,1500]]"));
        put(51,new Struct_xxzb_233(51,"[[1,410081,50],[1,410018,8000],[10,0,5000],[1,460045,1]]"));
        put(52,new Struct_xxzb_233(52,"[[1,410081,40],[1,410018,6000],[10,0,5000]]"));
        put(53,new Struct_xxzb_233(53,"[[1,410081,30],[1,410018,6000],[10,0,4000]]"));
        put(54,new Struct_xxzb_233(54,"[[1,410081,20],[1,410018,4000],[10,0,3000]]"));
        put(55,new Struct_xxzb_233(55,"[[1,410081,10],[1,410018,4000],[10,0,2000]]"));
    }
    public void reset(){
        ins = null;
    }
}