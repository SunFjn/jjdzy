package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_fhlypotion_254;
public class Config_fhlypotion_254 extends ConfigBase<Struct_fhlypotion_254> {
    private static Config_fhlypotion_254 ins = null;
    public static Config_fhlypotion_254 getIns(){
        if(ins==null){
            ins = new Config_fhlypotion_254();
        }
        return ins;
    }
    private Config_fhlypotion_254(){
        put(1,new Struct_fhlypotion_254(1,20,"[[4,0,250],[1,410040,200],[1,410001,200]]"));
        put(2,new Struct_fhlypotion_254(2,40,"[[4,0,250],[1,410040,200],[1,410001,200]]"));
        put(3,new Struct_fhlypotion_254(3,80,"[[4,0,250],[1,410040,200],[1,410001,200]]"));
        put(4,new Struct_fhlypotion_254(4,120,"[[4,0,250],[1,410040,200],[1,410001,400]]"));
        put(5,new Struct_fhlypotion_254(5,160,"[[4,0,250],[1,410040,200],[1,410001,400]]"));
        put(6,new Struct_fhlypotion_254(6,200,"[[4,0,250],[1,410040,200],[1,410001,400]]"));
        put(7,new Struct_fhlypotion_254(7,300,"[[4,0,500],[1,410040,400],[1,410001,600]]"));
        put(8,new Struct_fhlypotion_254(8,400,"[[4,0,500],[1,410040,400],[1,410001,600]]"));
        put(9,new Struct_fhlypotion_254(9,500,"[[4,0,500],[1,410040,400],[1,410001,600]]"));
        put(10,new Struct_fhlypotion_254(10,600,"[[4,0,500],[1,410040,400],[1,410001,800]]"));
        put(11,new Struct_fhlypotion_254(11,700,"[[4,0,500],[1,410040,400],[1,410001,800]]"));
        put(12,new Struct_fhlypotion_254(12,800,"[[4,0,500],[1,410040,400],[1,410001,800]]"));
        put(13,new Struct_fhlypotion_254(13,1000,"[[4,0,1000],[1,410040,900],[1,410001,1000]]"));
        put(14,new Struct_fhlypotion_254(14,1200,"[[4,0,1000],[1,410040,900],[1,410001,1000]]"));
        put(15,new Struct_fhlypotion_254(15,1400,"[[4,0,1750],[1,410040,1300],[1,410001,1200]]"));
        put(16,new Struct_fhlypotion_254(16,1600,"[[4,0,1750],[1,410040,1300],[1,410001,1400]]"));
        put(17,new Struct_fhlypotion_254(17,1800,"[[4,0,2250],[1,410040,1700],[1,410001,1600]]"));
        put(18,new Struct_fhlypotion_254(18,2000,"[[4,0,2750],[1,410040,2200],[1,410001,2100]]"));
    }
    public void reset(){
        ins = null;
    }
}