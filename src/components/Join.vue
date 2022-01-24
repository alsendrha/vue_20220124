<template>
    <div>
        <el-card shadow="always">
            <el-form :inline="true"  >
                <el-form-item  label="아이디" label-width="80px">
                    <el-input  size="mini" placeholder="아이디"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" round >중복확인</el-button> 
                </el-form-item>
            </el-form>
            
            

            <el-form :inline="true"  >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                    <el-input  size="mini" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" type="password" placeholder="암호확인"/>
                </el-form-item>
            </el-form>

            <el-form-item label="생일" label-width="80px" style="margin-top:-20px">
                <el-date-picker type="date" size="mini" placeholder="날짜선택">
                </el-date-picker>
            </el-form-item>

            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item  label="이메일" label-width="80px" >
                    <el-input  size="mini" placeholder="이메일"/>
                </el-form-item>
             
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select ref="email1" size="mini" clearable placeholder="Select">
                            <el-option  v-for="tmp in emailoption" :key="tmp" :label="tmp" :value="tmp">
                            </el-option>
                        </el-select>
                </el-form-item>
            </el-form>


            <el-button type="primary" size="mini" round style="margin-left:75px" >회원가입</el-button>
            <el-button type="primary" size="mini" round >홈으로</el-button>
            
            
        </el-card>

    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>