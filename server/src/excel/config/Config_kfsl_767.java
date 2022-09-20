package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kfsl_767;
public class Config_kfsl_767 extends ConfigBase<Struct_kfsl_767> {
    private static Config_kfsl_767 ins = null;
    public static Config_kfsl_767 getIns(){
        if(ins==null){
            ins = new Config_kfsl_767();
        }
        return ins;
    }
    private Config_kfsl_767(){
        put(1,new Struct_kfsl_767(1,101));
        put(2,new Struct_kfsl_767(2,102));
        put(3,new Struct_kfsl_767(3,201));
        put(4,new Struct_kfsl_767(4,103));
        put(5,new Struct_kfsl_767(5,301));
        put(6,new Struct_kfsl_767(6,104));
        put(7,new Struct_kfsl_767(7,105));
        put(8,new Struct_kfsl_767(8,203));
        put(9,new Struct_kfsl_767(9,106));
        put(10,new Struct_kfsl_767(10,302));
        put(11,new Struct_kfsl_767(11,107));
        put(12,new Struct_kfsl_767(12,108));
        put(13,new Struct_kfsl_767(13,202));
        put(14,new Struct_kfsl_767(14,109));
        put(15,new Struct_kfsl_767(15,303));
        put(16,new Struct_kfsl_767(16,110));
        put(17,new Struct_kfsl_767(17,111));
        put(18,new Struct_kfsl_767(18,201));
        put(19,new Struct_kfsl_767(19,112));
        put(20,new Struct_kfsl_767(20,304));
        put(21,new Struct_kfsl_767(21,113));
        put(22,new Struct_kfsl_767(22,114));
        put(23,new Struct_kfsl_767(23,203));
        put(24,new Struct_kfsl_767(24,115));
        put(25,new Struct_kfsl_767(25,305));
        put(26,new Struct_kfsl_767(26,116));
        put(27,new Struct_kfsl_767(27,117));
        put(28,new Struct_kfsl_767(28,202));
        put(29,new Struct_kfsl_767(29,118));
        put(30,new Struct_kfsl_767(30,306));
        put(31,new Struct_kfsl_767(31,119));
        put(32,new Struct_kfsl_767(32,120));
        put(33,new Struct_kfsl_767(33,201));
        put(34,new Struct_kfsl_767(34,121));
        put(35,new Struct_kfsl_767(35,307));
        put(36,new Struct_kfsl_767(36,122));
        put(37,new Struct_kfsl_767(37,123));
        put(38,new Struct_kfsl_767(38,203));
        put(39,new Struct_kfsl_767(39,124));
        put(40,new Struct_kfsl_767(40,308));
        put(41,new Struct_kfsl_767(41,125));
        put(42,new Struct_kfsl_767(42,126));
        put(43,new Struct_kfsl_767(43,202));
        put(44,new Struct_kfsl_767(44,127));
        put(45,new Struct_kfsl_767(45,309));
        put(46,new Struct_kfsl_767(46,128));
        put(47,new Struct_kfsl_767(47,129));
        put(48,new Struct_kfsl_767(48,201));
        put(49,new Struct_kfsl_767(49,130));
        put(50,new Struct_kfsl_767(50,310));
    }
    public void reset(){
        ins = null;
    }
}